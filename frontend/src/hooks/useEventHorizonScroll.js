import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEventHorizon } from '../context/EventHorizonContext';

gsap.registerPlugin(ScrollTrigger);

export const useEventHorizonScroll = (sections) => {
  const { cameraRef, controlsRef } = useEventHorizon();

  useEffect(() => {
    const camera = cameraRef.current;
    if (!camera) return;

    const timelines = sections.map(({ id, position, rotation, start = 'top center', end = 'bottom center' }) => {
      const triggerElement = document.getElementById(id);
      if (!triggerElement) return null;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start,
          end,
          scrub: true
        }
      });

      if (position) {
        timeline.to(camera.position, {
          ...position,
          duration: 1
        }, 0);
      }

      if (rotation) {
        timeline.to(camera.rotation, {
          ...rotation,
          duration: 1
        }, 0);
      }

      return timeline;
    });

    return () => {
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0, 0);
      }
      timelines.forEach((timeline) => {
        if (timeline?.scrollTrigger) {
          timeline.scrollTrigger.kill();
        }
        timeline?.kill();
      });
    };
  }, [cameraRef, controlsRef, sections]);
};
