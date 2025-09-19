import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const NecessityChanceAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sunRef = useRef<HTMLDivElement>(null);
  const friendRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<HTMLDivElement[]>([]);
  const clockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !sunRef.current || !friendRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Phase 1: Show necessity (Sun rising)
    masterTL
      .to(sunRef.current, {
        y: -50,
        scale: 1.2,
        opacity: 1,
        rotationZ: 180,
        duration: 3,
        ease: "power2.out",
      })
      .to(
        clockRef.current,
        {
          rotationZ: 360,
          duration: 3,
          ease: "none",
        },
        "<"
      );

    // Phase 2: Show predictable paths (necessity)
    pathsRef.current.slice(0, 3).forEach((path, index) => {
      if (path) {
        masterTL.to(
          path,
          {
            strokeDashoffset: 0,
            opacity: 0.8,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.3,
          },
          "necessity"
        );
      }
    });

    // Phase 3: Random encounter (chance)
    masterTL
      .to(friendRef.current, {
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        scale: 1,
        opacity: 1,
        rotationZ: Math.random() * 360,
        duration: 2,
        ease: "bounce.out",
      })
      .to(
        pathsRef.current.slice(3),
        {
          strokeDashoffset: 0,
          opacity: 0.6,
          duration: 1,
          ease: "power2.out",
          stagger: 0.2,
        },
        "-=1"
      );

    // Phase 4: Reset
    masterTL.to([sunRef.current, friendRef.current, clockRef.current], {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      stagger: 0.2,
    });

    masterTL.to(
      pathsRef.current,
      {
        strokeDashoffset: 200,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        stagger: 0.1,
      },
      "-=0.5"
    );

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToPathsRef = (el: HTMLDivElement | null) => {
    if (el && !pathsRef.current.includes(el)) {
      pathsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-64 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1400px", perspectiveOrigin: "center center" }}
    >
      {/* Sky background */}
      <div className='absolute inset-0 bg-gradient-to-b from-blue-200 via-blue-100 to-orange-100 rounded-lg opacity-80' />

      {/* Sun (Necessity) */}
      <div
        ref={sunRef}
        className='absolute top-16 right-8 w-16 h-16 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full'
          style={{
            boxShadow:
              "0 0 40px rgba(251, 191, 36, 0.8), 0 10px 20px rgba(0,0,0,0.1)",
            filter: "drop-shadow(0 5px 15px rgba(251, 191, 36, 0.4))",
          }}
        >
          <div className='absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-90' />

          {/* Sun rays */}
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`ray-${i}`}
              className='absolute w-1 h-6 bg-yellow-400 rounded-full opacity-80'
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${
                  i * 30
                }deg) translateY(-12px)`,
                transformOrigin: "center",
              }}
            />
          ))}

          {/* Radial glow */}
          <div
            className='absolute inset-0 rounded-full animate-pulse'
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.3), transparent 70%)",
            }}
          />
        </div>

        <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-orange-700 bg-white px-2 py-1 rounded shadow-lg'>
          Mặt trời mọc
        </div>
      </div>

      {/* Clock showing time progression (Necessity) */}
      <div
        ref={clockRef}
        className='absolute top-8 left-8 w-12 h-12 transform-gpu preserve-3d'
        style={{ opacity: 1 }}
      >
        <div
          className='relative w-full h-full bg-white rounded-full border-4 border-gray-400'
          style={{
            boxShadow:
              "0 8px 20px rgba(0,0,0,0.2), inset 0 2px 8px rgba(255,255,255,0.8)",
          }}
        >
          {/* Clock face */}
          <div className='absolute inset-2 rounded-full border border-gray-300'>
            {/* Hour markers */}
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={`marker-${i}`}
                className='absolute w-0.5 h-2 bg-gray-600'
                style={{
                  top: "5%",
                  left: "50%",
                  transform: `translate(-50%, 0) rotate(${i * 30}deg)`,
                  transformOrigin: "50% 400%",
                }}
              />
            ))}

            {/* Clock hands */}
            <div className='absolute w-0.5 h-3 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom' />
            <div className='absolute w-0.5 h-4 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-full origin-bottom rotate-90' />
            <div className='absolute w-1 h-1 bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
          </div>
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded shadow'>
          Thời gian
        </div>
      </div>

      {/* Friend encounter (Chance) */}
      <div
        ref={friendRef}
        className='absolute w-14 h-16 transform-gpu preserve-3d'
        style={{
          opacity: 0,
          scale: 0,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Person figure */}
        <div className='relative w-full h-full'>
          {/* Head */}
          <div
            className='absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full transform -translate-x-1/2'
            style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            <div className='absolute inset-0.5 bg-pink-200 rounded-full opacity-80' />
            {/* Face */}
            <div className='absolute top-1 left-1 w-0.5 h-0.5 bg-black rounded-full' />
            <div className='absolute top-1 right-1 w-0.5 h-0.5 bg-black rounded-full' />
            <div className='absolute bottom-1 left-1/2 w-1 h-0.5 bg-black rounded-full transform -translate-x-1/2' />
          </div>

          {/* Body */}
          <div
            className='absolute top-4 left-1/2 w-3 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full transform -translate-x-1/2'
            style={{
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
            }}
          />

          {/* Arms */}
          <div className='absolute top-5 left-2 w-2 h-1 bg-pink-300 rounded-full transform rotate-45' />
          <div className='absolute top-5 right-2 w-2 h-1 bg-pink-300 rounded-full transform -rotate-45' />

          {/* Legs */}
          <div className='absolute bottom-0 left-3 w-1 h-3 bg-blue-600 rounded-full' />
          <div className='absolute bottom-0 right-3 w-1 h-3 bg-blue-600 rounded-full' />

          {/* Surprise effect */}
          <div className='absolute -top-2 -left-2 text-lg animate-bounce'>
            ❗
          </div>
        </div>

        <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-700 bg-white px-2 py-1 rounded shadow-lg'>
          Gặp bạn cũ!
        </div>
      </div>

      {/* Predictable paths (Necessity) */}
      <svg className='absolute inset-0 w-full h-full pointer-events-none'>
        <defs>
          <linearGradient
            id='necessityGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.8' />
            <stop offset='100%' stopColor='#1d4ed8' stopOpacity='0.6' />
          </linearGradient>
          <linearGradient
            id='chanceGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#ec4899' stopOpacity='0.6' />
            <stop offset='100%' stopColor='#be185d' stopOpacity='0.4' />
          </linearGradient>
        </defs>

        {/* Necessity paths (predictable) */}
        <path
          ref={addToPathsRef}
          d='M 60 60 Q 150 80 240 100'
          fill='none'
          stroke='url(#necessityGradient)'
          strokeWidth='2'
          strokeDasharray='100'
          strokeDashoffset='100'
          opacity='0'
        />
        <path
          ref={addToPathsRef}
          d='M 80 80 Q 160 100 250 120'
          fill='none'
          stroke='url(#necessityGradient)'
          strokeWidth='2'
          strokeDasharray='100'
          strokeDashoffset='100'
          opacity='0'
        />
        <path
          ref={addToPathsRef}
          d='M 100 100 Q 180 120 270 140'
          fill='none'
          stroke='url(#necessityGradient)'
          strokeWidth='2'
          strokeDasharray='100'
          strokeDashoffset='100'
          opacity='0'
        />

        {/* Chance paths (random) */}
        <path
          ref={addToPathsRef}
          d='M 150 150 Q 100 200 200 180 Q 250 160 180 120'
          fill='none'
          stroke='url(#chanceGradient)'
          strokeWidth='2'
          strokeDasharray='150'
          strokeDashoffset='150'
          opacity='0'
        />
        <path
          ref={addToPathsRef}
          d='M 120 180 Q 200 150 160 100 Q 180 200 220 170'
          fill='none'
          stroke='url(#chanceGradient)'
          strokeWidth='2'
          strokeDasharray='150'
          strokeDashoffset='150'
          opacity='0'
        />
      </svg>

      {/* Concept labels */}
      <div className='absolute bottom-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Tất nhiên
        </div>
        <div
          className='px-3 py-1 bg-pink-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "3s" }}
        >
          Ngẫu nhiên
        </div>
      </div>

      {/* Energy particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute w-1 h-1 rounded-full animate-ping ${
              i % 2 === 0 ? "bg-blue-400" : "bg-pink-400"
            }`}
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NecessityChanceAnimation;
