import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const UniverseBackground = () => {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);
  const [nebulaClouds, setNebulaClouds] = useState([]);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate random stars for different layers
    const generateStars = () => {
      const starLayers = [];
      // Three layers of stars for parallax effect
      for (let layer = 0; layer < 3; layer++) {
        const layerStars = [];
        const starCount = layer === 0 ? 150 : layer === 1 ? 100 : 50; // Different densities
        
        for (let i = 0; i < starCount; i++) {
          layerStars.push({
            id: `star-${layer}-${i}`,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * (layer === 2 ? 3 : layer === 1 ? 2 : 1.5) + 0.5,
            opacity: Math.random() * 0.8 + 0.2,
            twinkleDelay: Math.random() * 5,
            twinkleDuration: 2 + Math.random() * 3,
          });
        }
        starLayers.push(layerStars);
      }
      return starLayers;
    };

    // Generate shooting stars
    const generateShootingStars = () => {
      const shootingStarArray = [];
      for (let i = 0; i < 5; i++) {
        shootingStarArray.push({
          id: `shooting-${i}`,
          delay: i * 7 + Math.random() * 5,
          startX: Math.random() * 100,
          startY: Math.random() * 50,
          endX: Math.random() * 100,
          endY: 50 + Math.random() * 50,
          duration: 1.5 + Math.random() * 1.5,
        });
      }
      return shootingStarArray;
    };

    // Generate nebula clouds
    const generateNebulaClouds = () => {
      return [
        {
          id: 'nebula-1',
          color1: 'rgba(139, 92, 246, 0.15)',
          color2: 'rgba(56, 189, 248, 0.1)',
          x: 20,
          y: 30,
          size: 600,
        },
        {
          id: 'nebula-2',
          color1: 'rgba(236, 72, 153, 0.12)',
          color2: 'rgba(245, 158, 11, 0.08)',
          x: 70,
          y: 60,
          size: 500,
        },
        {
          id: 'nebula-3',
          color1: 'rgba(34, 211, 238, 0.1)',
          color2: 'rgba(168, 85, 247, 0.08)',
          x: 40,
          y: 80,
          size: 400,
        },
      ];
    };

    // Generate floating particles
    const generateParticles = () => {
      const particleArray = [];
      for (let i = 0; i < 30; i++) {
        particleArray.push({
          id: `particle-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          color: ['#38BDF8', '#8B5CF6', '#EC4899', '#F59E0B'][Math.floor(Math.random() * 4)],
          duration: 15 + Math.random() * 20,
          delay: Math.random() * 10,
        });
      }
      return particleArray;
    };

    setStars(generateStars());
    setShootingStars(generateShootingStars());
    setNebulaClouds(generateNebulaClouds());
    setParticles(generateParticles());
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/20 to-black opacity-50" />
      
      {/* Animated nebula clouds */}
      <div className="absolute inset-0">
        {nebulaClouds.map((nebula) => (
          <motion.div
            key={nebula.id}
            className="absolute rounded-full filter blur-3xl"
            style={{
              background: `radial-gradient(circle, ${nebula.color1}, ${nebula.color2}, transparent)`,
              width: `${nebula.size}px`,
              height: `${nebula.size}px`,
              left: `${nebula.x}%`,
              top: `${nebula.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Star layers with parallax effect */}
      {stars.map((layer, layerIndex) => (
        <motion.div
          key={`layer-${layerIndex}`}
          className="absolute inset-0"
          animate={{
            x: layerIndex === 0 ? [0, -100] : layerIndex === 1 ? [0, -50] : [0, -25],
            y: layerIndex === 0 ? [0, -50] : layerIndex === 1 ? [0, -25] : [0, -12],
          }}
          transition={{
            x: {
              duration: layerIndex === 0 ? 120 : layerIndex === 1 ? 180 : 240,
              repeat: Infinity,
              ease: "linear",
            },
            y: {
              duration: layerIndex === 0 ? 150 : layerIndex === 1 ? 200 : 300,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{
            width: '200%',
            height: '200%',
          }}
        >
          {layer.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                filter: `blur(${layerIndex === 0 ? 0 : layerIndex === 1 ? 0.3 : 0.5}px)`,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.3, star.opacity],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: star.twinkleDuration,
                repeat: Infinity,
                delay: star.twinkleDelay,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      ))}

      {/* Shooting stars */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="shootingStarGradient">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
        {shootingStars.map((star) => (
          <motion.line
            key={star.id}
            x1={`${star.startX}%`}
            y1={`${star.startY}%`}
            x2={`${star.startX}%`}
            y2={`${star.startY}%`}
            stroke="url(#shootingStarGradient)"
            strokeWidth="2"
            initial={{ 
              x2: `${star.startX}%`, 
              y2: `${star.startY}%`,
              opacity: 0 
            }}
            animate={{
              x2: [`${star.startX}%`, `${star.endX}%`],
              y2: [`${star.startY}%`, `${star.endY}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              repeatDelay: 10 + Math.random() * 20,
              ease: "easeOut",
            }}
          />
        ))}
      </svg>

      {/* Floating cosmic particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.5, 0.5, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Galaxy rotation overlay */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'conic-gradient(from 0deg, transparent, rgba(139, 92, 246, 0.1), transparent, rgba(56, 189, 248, 0.1), transparent)',
        }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 200,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Cosmic dust effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 cosmic-dust" />
      </div>
    </div>
  );
};

export default UniverseBackground;
