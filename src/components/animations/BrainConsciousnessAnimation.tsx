import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const BrainConsciousnessAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brainRef = useRef<HTMLDivElement>(null);
  const thoughtsRef = useRef<HTMLDivElement>(null);
  const neuronsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !brainRef.current || !thoughtsRef.current)
      return;

    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    // Brain pulsing animation with 3D rotation
    tl.to(brainRef.current, {
      scale: 1.15,
      rotationX: 5,
      rotationY: 15,
      rotationZ: 2,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    }).to(brainRef.current, {
      rotationY: -10,
      rotationX: -3,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
    });

    // Enhanced neurons firing animation with 3D effects
    neuronsRef.current.forEach((neuron, index) => {
      if (neuron) {
        gsap.to(neuron, {
          scale: Math.random() * 0.7 + 0.9,
          opacity: Math.random() * 0.6 + 0.4,
          rotationZ: Math.random() * 360,
          z: Math.random() * 20 - 10,
          duration: Math.random() * 1.5 + 0.8,
          repeat: -1,
          yoyo: true,
          delay: index * 0.15,
          ease: "elastic.inOut(1, 0.3)",
        });
      }
    });

    // Enhanced thought bubbles floating animation with 3D movement
    const thoughtBubbles = thoughtsRef.current.children;
    Array.from(thoughtBubbles).forEach((bubble, index) => {
      gsap.to(bubble, {
        y: -25 + Math.sin(index * 2) * 10,
        x: Math.sin(index) * 15,
        z: Math.cos(index) * 8,
        rotationX: Math.sin(index) * 5,
        rotationY: Math.cos(index) * 8,
        scale: 1.1 + Math.sin(index) * 0.1,
        duration: 4 + index * 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.4,
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const addToNeuronsRef = (el: HTMLDivElement | null) => {
    if (el && !neuronsRef.current.includes(el)) {
      neuronsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-64 flex items-center justify-center'
      style={{ perspective: "1200px", perspectiveOrigin: "center center" }}
    >
      {/* 3D Brain Structure */}
      <div
        ref={brainRef}
        className='relative w-32 h-32 transform-gpu preserve-3d'
        style={{
          background: "linear-gradient(45deg, #ff6b9d, #c44569, #f8b500)",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          boxShadow:
            "0 25px 50px rgba(196, 69, 105, 0.4), inset 0 5px 15px rgba(255, 255, 255, 0.3)",
          filter: "drop-shadow(0 10px 20px rgba(196, 69, 105, 0.2))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Brain Surface Details */}
        <div className='absolute inset-2 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 opacity-80'></div>
        <div className='absolute inset-4 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-60'></div>

        {/* Neural Network */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            ref={addToNeuronsRef}
            className='absolute w-2 h-2 bg-yellow-400 rounded-full shadow-lg'
            style={{
              top: `${20 + Math.sin(i * 0.5) * 30}%`,
              left: `${20 + Math.cos(i * 0.5) * 30}%`,
              boxShadow: "0 0 10px rgba(255, 235, 59, 0.8)",
            }}
          />
        ))}

        {/* Synaptic Connections */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`synapse-${i}`}
            className='absolute bg-gradient-to-r from-cyan-400 to-blue-500 opacity-60'
            style={{
              width: "2px",
              height: `${20 + i * 3}px`,
              top: `${25 + i * 8}%`,
              left: `${30 + Math.sin(i) * 20}%`,
              transform: `rotate(${i * 45}deg)`,
              borderRadius: "1px",
            }}
          />
        ))}
      </div>

      {/* Consciousness Manifestation */}
      <div ref={thoughtsRef} className='absolute left-48 top-8 space-y-4'>
        {/* Thought Bubbles */}
        <div className='relative'>
          <div className='w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg transform-gpu'>
            💭
          </div>
          <div className='absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full opacity-70'></div>
          <div className='absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 rounded-full opacity-50'></div>
        </div>

        <div className='relative ml-8'>
          <div className='w-12 h-12 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white shadow-lg transform-gpu'>
            ✨
          </div>
        </div>

        <div className='relative ml-4'>
          <div className='w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white shadow-lg transform-gpu'>
            🧠
          </div>
        </div>
      </div>

      {/* Energy Flow Animation */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping'
            style={{
              top: `${30 + i * 10}%`,
              left: `${35 + i * 8}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className='absolute w-1 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse'
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrainConsciousnessAnimation;
