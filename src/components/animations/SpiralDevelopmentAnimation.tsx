import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const SpiralDevelopmentAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spiralRef = useRef<HTMLDivElement>(null);
  const seedStagesRef = useRef<HTMLDivElement[]>([]);
  const pathRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !spiralRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Create spiral path animation
    masterTL.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 8,
      ease: "power2.inOut",
    });

    // Animate seed stages along spiral path
    seedStagesRef.current.forEach((stage, index) => {
      if (stage) {
        const angle = index * 120 * (Math.PI / 180); // 120 degrees between stages
        const radius = 60 + index * 40; // Increasing radius for spiral
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        masterTL
          .fromTo(
            stage,
            {
              scale: 0,
              opacity: 0,
              rotationZ: 0,
              rotationX: 0,
              rotationY: 0,
              x: 0,
              y: 0,
              z: -50,
            },
            {
              scale: 1,
              opacity: 1,
              x: x,
              y: -y, // Negative for upward spiral
              z: index * 10,
              rotationX: index * 5,
              rotationY: index * 8,
              duration: 2.5,
              ease: "elastic.out(1, 0.6)",
              delay: index * 1.5,
            }
          )
          .to(
            stage,
            {
              rotationZ: 360,
              duration: 3,
              ease: "power2.inOut",
            },
            "<"
          );

        // Stage-specific animations
        if (index === 0) {
          // Seed stage - pulsing
          gsap.to(stage, {
            scale: 1.2,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 1.5 + 2,
          });
        } else if (index === 1) {
          // Growth stage - expanding
          gsap.to(stage.children, {
            scale: 1.3,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
            ease: "power2.inOut",
            delay: index * 1.5 + 2,
          });
        } else if (index === 2) {
          // Mature stage - glowing
          gsap.to(stage, {
            boxShadow: "0 0 30px rgba(34, 197, 94, 0.8)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 1.5 + 2,
          });
        }
      }
    });

    // Central core pulsing
    gsap.to(centerRef.current, {
      scale: 1.1,
      rotationZ: 360,
      duration: 4,
      repeat: -1,
      ease: "power2.inOut",
    });

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToSeedStagesRef = (el: HTMLDivElement | null) => {
    if (el && !seedStagesRef.current.includes(el)) {
      seedStagesRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-96 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1600px", perspectiveOrigin: "center center" }}
    >
      {/* Background spiral pattern */}
      <div className='absolute inset-0'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 400 400'
          className='absolute inset-0'
        >
          <defs>
            <linearGradient
              id='spiralGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#8b5cf6' stopOpacity='0.3' />
              <stop offset='50%' stopColor='#3b82f6' stopOpacity='0.5' />
              <stop offset='100%' stopColor='#10b981' stopOpacity='0.7' />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            d='M 200 200 
               m -20 0 
               a 20 20 0 1 1 40 0 
               a 40 40 0 1 1 -80 0 
               a 60 60 0 1 1 120 0 
               a 80 80 0 1 1 -160 0 
               a 100 100 0 1 1 200 0'
            fill='none'
            stroke='url(#spiralGradient)'
            strokeWidth='3'
            strokeDasharray='1000'
            strokeDashoffset='1000'
            className='drop-shadow-lg'
          />
        </svg>
      </div>

      {/* Central core */}
      <div
        ref={centerRef}
        className='absolute w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full shadow-2xl transform-gpu preserve-3d'
        style={{
          background: "radial-gradient(circle, #8b5cf6, #6366f1, #3b82f6)",
          boxShadow:
            "0 0 40px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.3)",
        }}
      >
        <div className='absolute inset-2 bg-gradient-to-br from-white to-purple-200 rounded-full opacity-30'></div>
        <div className='absolute inset-4 bg-white rounded-full opacity-50 animate-ping'></div>
      </div>

      {/* Spiral development stages */}
      <div ref={spiralRef} className='absolute inset-0'>
        {/* Stage 1: Original Seed (Thesis) */}
        <div
          ref={addToSeedStagesRef}
          className='absolute w-12 h-12 transform-gpu preserve-3d'
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className='relative w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full shadow-lg'>
            <div className='absolute inset-1 bg-gradient-to-tr from-yellow-300 to-amber-400 rounded-full opacity-80'></div>
            <div className='absolute inset-2 bg-yellow-200 rounded-full opacity-60'></div>
            {/* Seed label */}
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-amber-700 bg-white px-2 py-1 rounded shadow'>
              Hạt giống
            </div>
          </div>
        </div>

        {/* Stage 2: Growing Plant (Antithesis) */}
        <div
          ref={addToSeedStagesRef}
          className='absolute w-16 h-20 transform-gpu preserve-3d'
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className='relative w-full h-full'>
            {/* Stem */}
            <div className='absolute left-1/2 bottom-0 w-2 h-12 bg-gradient-to-t from-green-600 to-green-400 rounded-full transform -translate-x-1/2'></div>
            {/* Leaves */}
            <div className='absolute left-2 top-2 w-3 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform rotate-45'></div>
            <div className='absolute right-2 top-4 w-3 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform -rotate-45'></div>
            {/* Root system */}
            <div className='absolute left-1/2 bottom-0 w-4 h-3 bg-gradient-to-b from-amber-600 to-amber-800 rounded-full transform -translate-x-1/2 translate-y-1'></div>
            {/* Plant label */}
            <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700 bg-white px-2 py-1 rounded shadow'>
              Cây non
            </div>
          </div>
        </div>

        {/* Stage 3: Mature Tree with New Seeds (Synthesis) */}
        <div
          ref={addToSeedStagesRef}
          className='absolute w-20 h-24 transform-gpu preserve-3d'
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className='relative w-full h-full'>
            {/* Trunk */}
            <div className='absolute left-1/2 bottom-0 w-3 h-16 bg-gradient-to-t from-amber-800 to-amber-600 rounded-full transform -translate-x-1/2'></div>

            {/* Crown */}
            <div className='absolute left-1/2 top-0 w-16 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform -translate-x-1/2'>
              <div className='absolute inset-1 bg-gradient-to-tr from-green-300 to-green-500 rounded-full opacity-80'></div>
            </div>

            {/* Fruits with new seeds */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`fruit-${i}`}
                className='absolute w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg'
                style={{
                  top: `${25 + Math.sin(i * 1.5) * 15}%`,
                  left: `${30 + Math.cos(i * 1.5) * 25}%`,
                }}
              >
                {/* New seed inside */}
                <div className='absolute inset-0.5 bg-amber-400 rounded-full opacity-80'></div>
              </div>
            ))}

            {/* Tree label */}
            <div className='absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-800 bg-white px-2 py-1 rounded shadow'>
              Cây lớn + Hạt mới
            </div>
          </div>
        </div>
      </div>

      {/* Dialectical process arrows */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Arrow 1: Thesis to Antithesis */}
        <div className='absolute top-1/3 left-1/2 transform -translate-x-1/2'>
          <div className='w-8 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transform rotate-45'></div>
          <div className='absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-blue-500 transform rotate-45 -translate-y-1'></div>
        </div>

        {/* Arrow 2: Antithesis to Synthesis */}
        <div className='absolute top-2/3 right-1/3 transform translate-x-1/2'>
          <div className='w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform -rotate-45'></div>
          <div className='absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-green-500 transform rotate-45 -translate-y-1'></div>
        </div>

        {/* Spiral continuation indicator */}
        <div className='absolute bottom-1/4 left-1/4'>
          <div
            className='w-6 h-6 border-2 border-dashed border-purple-400 rounded-full animate-spin'
            style={{ animationDuration: "4s" }}
          ></div>
          <div className='absolute inset-2 bg-purple-400 rounded-full opacity-50 animate-pulse'></div>
        </div>
      </div>

      {/* Energy particles showing continuous development */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className='absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full animate-ping'
            style={{
              top: `${20 + Math.sin(i * 0.8) * 60}%`,
              left: `${20 + Math.cos(i * 0.8) * 60}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Process labels */}
      <div className='absolute top-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-purple-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Khẳng định
        </div>
        <div
          className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "3s" }}
        >
          Phủ định
        </div>
        <div
          className='px-3 py-1 bg-green-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "6s" }}
        >
          Phủ định của phủ định
        </div>
      </div>

      {/* Development level indicator */}
      <div className='absolute bottom-4 right-4 text-xs font-bold text-gray-600 bg-white px-3 py-2 rounded-lg shadow-lg'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-purple-500 rounded-full animate-pulse'></div>
          <span>Phát triển xoắn ốc</span>
        </div>
      </div>
    </div>
  );
};

export default SpiralDevelopmentAnimation;
