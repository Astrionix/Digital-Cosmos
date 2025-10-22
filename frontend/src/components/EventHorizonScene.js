import React, { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import gsap from 'gsap';
import { EventHorizonContext } from '../context/EventHorizonContext';

const chromaticAberrationShader = {
  uniforms: {
    tDiffuse: { value: null },
    offset: { value: new THREE.Vector2(0.002, 0.002) }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 offset;
    varying vec2 vUv;
    void main() {
      vec2 rUv = vUv + offset;
      vec2 gUv = vUv;
      vec2 bUv = vUv - offset;
      float r = texture2D(tDiffuse, rUv).r;
      float g = texture2D(tDiffuse, gUv).g;
      float b = texture2D(tDiffuse, bUv).b;
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
};

const nebulaShader = {
  uniforms: {
    time: { value: 0 },
    intensity: { value: 1 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float time;
    uniform float intensity;
    varying vec2 vUv;
    float rnd(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }
    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 5; i++) {
        value += amplitude * rnd(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    void main() {
      vec2 uv = vUv * 2.0 - 1.0;
      float glow = fbm(uv * 2.0 + time * 0.035);
      float t = smoothstep(0.15, 1.0, glow * intensity);
      vec3 color = mix(vec3(0.02, 0.04, 0.1), vec3(0.4, 0.2, 1.0), t);
      gl_FragColor = vec4(color, 1.0);
    }
  `
};

const EventHorizonScene = ({ audioElementId, children }) => {
  const containerRef = useRef(null);
  const animationRef = useRef(0);
  const analyserRef = useRef(null);
  const audioContextRef = useRef(null);
  const audioStrengthRef = useRef(0);
  const galaxyMaterialRef = useRef(null);
  const nebulaMaterialRef = useRef(null);
  const planetGroupRef = useRef(null);
  const composerRef = useRef(null);
  const clockRef = useRef(new THREE.Clock());
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const cursorRef = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x01030a);

    const camera = new THREE.PerspectiveCamera(58, container.clientWidth / container.clientHeight, 0.1, 120);
    camera.position.set(0, 2.2, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controlsRef.current = controls;

    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyCount = 4200;
    const positions = new Float32Array(galaxyCount * 3);
    const colors = new Float32Array(galaxyCount * 3);
    const sizes = new Float32Array(galaxyCount);
    const color = new THREE.Color();

    for (let i = 0; i < galaxyCount; i++) {
      const radius = Math.random() * 5.5;
      const armOffset = radius * 1.4 + Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 2.2;
      positions[i * 3] = Math.cos(armOffset) * radius;
      positions[i * 3 + 1] = y * 0.5;
      positions[i * 3 + 2] = Math.sin(armOffset) * radius;
      color.setHSL(0.58 + Math.random() * 0.12, 0.75, 0.6 + Math.random() * 0.25);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
      sizes[i] = Math.random() * 4 + 1.5;
    }

    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const galaxyMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        audioStrength: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform float audioStrength;
        void main() {
          vColor = color;
          vec3 pos = position;
          float pulse = sin(time * 0.6 + length(position)) * 0.5 + 0.5;
          pos *= 1.0 + audioStrength * 0.55 * pulse;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = (size + audioStrength * 14.0) * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float dist = length(gl_PointCoord - 0.5);
          if (dist > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, dist);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
      vertexColors: true
    });
    galaxyMaterialRef.current = galaxyMaterial;
    const galaxyPoints = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxyPoints);

    const planetGroup = new THREE.Group();
    planetGroupRef.current = planetGroup;
    const planetGeometry = new THREE.SphereGeometry(0.42, 48, 48);
    const planetMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x4c7dff, emissive: 0x1f3cff, metalness: 0.45, roughness: 0.28 }),
      new THREE.MeshStandardMaterial({ color: 0xff66c4, emissive: 0x5a0d67, metalness: 0.5, roughness: 0.2 }),
      new THREE.MeshStandardMaterial({ color: 0x66ffd8, emissive: 0x0a7351, metalness: 0.3, roughness: 0.25 })
    ];

    planetMaterials.forEach((mat, index) => {
      const distance = 1.8 + index * 1.35;
      const mesh = new THREE.Mesh(planetGeometry, mat);
      mesh.position.set(distance, (Math.random() - 0.5) * 1.3, -distance * 0.7);
      mesh.userData = {
        baseScale: 1 + index * 0.18,
        orbitSpeed: 0.22 + index * 0.06
      };
      mesh.scale.setScalar(mesh.userData.baseScale);
      planetGroup.add(mesh);
    });
    scene.add(planetGroup);

    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(nebulaShader.uniforms),
      vertexShader: nebulaShader.vertexShader,
      fragmentShader: nebulaShader.fragmentShader,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false
    });
    nebulaMaterialRef.current = nebulaMaterial;
    const nebulaMesh = new THREE.Mesh(new THREE.PlaneGeometry(24, 14, 1, 1), nebulaMaterial);
    nebulaMesh.position.set(0, 0, -6);
    scene.add(nebulaMesh);

    const ambient = new THREE.AmbientLight(0x224455, 0.7);
    scene.add(ambient);
    const point = new THREE.PointLight(0x88ccff, 1.6, 40);
    point.position.set(0, 2.6, 5.5);
    scene.add(point);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(container.clientWidth, container.clientHeight), 1.25, 0.18, 0.85);
    composer.addPass(bloomPass);
    const chromaPass = new ShaderPass(chromaticAberrationShader);
    chromaPass.uniforms.offset.value = new THREE.Vector2(0.002, 0.002);
    composer.addPass(chromaPass);
    composerRef.current = composer;

    const audioElement = audioElementId ? document.getElementById(audioElementId) : null;
    const audioContextClass = window.AudioContext || window.webkitAudioContext;
    let unlock;
    if (audioElement && audioContextClass) {
      let audioMeta = audioElement.__eventHorizonAudio;
      if (!audioMeta) {
        const context = new audioContextClass();
        const source = context.createMediaElementSource(audioElement);
        const analyser = context.createAnalyser();
        analyser.fftSize = 512;
        source.connect(analyser);
        analyser.connect(context.destination);
        audioMeta = { context, analyser };
        audioElement.__eventHorizonAudio = audioMeta;

        unlock = () => {
          if (context.state === 'suspended') context.resume();
        };

        window.addEventListener('click', unlock, { once: true });
        window.addEventListener('keydown', unlock, { once: true });
      }

      audioContextRef.current = audioMeta.context;
      analyserRef.current = audioMeta.analyser;
    }

    const audioSamples = new Uint8Array(256);

    gsap.fromTo(camera.position, { z: 12, y: 5 }, { z: 7.5, y: 2.2, duration: 3.2, ease: 'power2.out' });
    gsap.fromTo(container, { opacity: 0 }, { opacity: 1, duration: 2, ease: 'sine.out' });

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      composer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * -2 + 1;
      cursorRef.current.set(x, y);
    };
    window.addEventListener('pointermove', handlePointerMove);

    const animate = () => {
      const delta = clockRef.current.getDelta();
      const elapsed = clockRef.current.elapsedTime;
      controls.update();

      const cursor = cursorRef.current;
      if (cameraRef.current) {
        gsap.to(cameraRef.current.rotation, {
          x: cursor.y * 0.1,
          y: cursor.x * 0.15,
          duration: 0.6,
          overwrite: 'auto'
        });
      }

      let audioStrength = 0;
      if (analyserRef.current) {
        analyserRef.current.getByteFrequencyData(audioSamples);
        audioStrength = audioSamples.reduce((sum, value) => sum + value, 0) / (audioSamples.length * 255);
      }
      audioStrengthRef.current = audioStrength;

      if (galaxyMaterialRef.current) {
        galaxyMaterialRef.current.uniforms.time.value = elapsed;
        galaxyMaterialRef.current.uniforms.audioStrength.value = audioStrength * 2.6;
      }
      if (nebulaMaterialRef.current) {
        nebulaMaterialRef.current.uniforms.time.value = elapsed;
        nebulaMaterialRef.current.uniforms.intensity.value = 0.9 + audioStrength * 2.4;
      }
      if (planetGroupRef.current) {
        planetGroupRef.current.children.forEach((planet, index) => {
          const base = planet.userData?.baseScale || 1;
          const orbitSpeed = planet.userData?.orbitSpeed || 0.2;
          const pulse = 1 + Math.sin(elapsed * 2.1 + index) * 0.12 + audioStrength * 0.55;
          planet.scale.setScalar(base * pulse);
          planet.rotation.y += 0.4 * delta;
          planet.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), orbitSpeed * delta * (0.6 + audioStrength));
        });
      }
      composer.render();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      nebulaMaterial.dispose();
      planetGeometry.dispose();
      composer.dispose();
      planetGroup.children.forEach(mesh => mesh.material.dispose());
    };
  }, [audioElementId]);

  const contextValue = useMemo(() => ({
    cameraRef,
    controlsRef,
    audioStrengthRef
  }), []);

  return (
    <EventHorizonContext.Provider value={contextValue}>
      <div className="relative w-full min-h-screen">
        <div
          ref={containerRef}
          className="pointer-events-none absolute inset-0"
        />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </EventHorizonContext.Provider>
  );
};

export default EventHorizonScene;
