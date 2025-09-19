import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const EssencePhenomenonAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const essenceRef = useRef<HTMLDivElement>(null);
  const phenomenaRef = useRef<HTMLDivElement[]>([]);
  const layersRef = useRef<HTMLDivElement[]>([]);
  const revelationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !essenceRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Phase 1: Show surface phenomena first
    phenomenaRef.current.forEach((phenomenon, index) => {
      if (phenomenon) {
        masterTL.to(
          phenomenon,
          {
            scale: 1,
            opacity: 1,
            rotationY: Math.sin(index) * 15,
            z: index * 3,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: index * 0.3,
          },
          "phenomena"
        );
      }
    });

    // Phase 2: Peel away layers to reveal essence
    layersRef.current.forEach((layer, index) => {
      if (layer) {
        masterTL.to(
          layer,
          {
            opacity: 0.3,
            scale: 1.2,
            rotationZ: index * 90,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.4,
          },
          "peeling"
        );
      }
    });

    // Phase 3: Reveal the essence
    masterTL.to(essenceRef.current, {
      scale: 1.3,
      opacity: 1,
      rotationY: 360,
      z: 30,
      duration: 2.5,
      ease: "elastic.out(1, 0.6)",
    });

    // Phase 4: Show revelation effect
    masterTL.to(
      revelationRef.current,
      {
        opacity: 1,
        scale: 2,
        duration: 1.5,
        ease: "power2.out",
      },
      "-=1"
    );

    // Phase 5: Show connection between essence and phenomena
    masterTL.to([essenceRef.current, ...phenomenaRef.current], {
      y: -10,
      duration: 1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      stagger: 0.1,
    });

    // Phase 6: Reset
    masterTL.to(
      [
        essenceRef.current,
        ...phenomenaRef.current,
        ...layersRef.current,
        revelationRef.current,
      ],
      {
        scale: 0,
        opacity: 0,
        duration: 1,
        ease: "power2.in",
        stagger: 0.1,
      }
    );

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToPhenomenaRef = (el: HTMLDivElement | null) => {
    if (el && !phenomenaRef.current.includes(el)) {
      phenomenaRef.current.push(el);
    }
  };

  const addToLayersRef = (el: HTMLDivElement | null) => {
    if (el && !layersRef.current.includes(el)) {
      layersRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-64 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1600px", perspectiveOrigin: "center center" }}
    >
      {/* Deep Essence (Core) */}
      <div
        ref={essenceRef}
        className='absolute w-16 h-16 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full rounded-full flex items-center justify-center'
          style={{
            background: "radial-gradient(circle, #fbbf24, #f59e0b, #d97706)",
            boxShadow:
              "0 0 40px rgba(251, 191, 36, 0.8), 0 15px 30px rgba(0,0,0,0.2), inset 0 5px 15px rgba(255,255,255,0.4)",
            filter: "drop-shadow(0 10px 20px rgba(251, 191, 36, 0.4))",
          }}
        >
          <div className='absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-90' />

          {/* Core symbol */}
          <div className='relative text-2xl z-10'>💎</div>

          {/* Pulsing energy */}
          <div
            className='absolute inset-0 rounded-full animate-pulse'
            style={{
              background:
                "radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent 70%)",
            }}
          />

          {/* Energy rings */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`ring-${i}`}
              className='absolute border-2 border-yellow-300 rounded-full opacity-40 animate-ping'
              style={{
                width: `${100 + i * 20}%`,
                height: `${100 + i * 20}%`,
                top: `${-10 - i * 10}%`,
                left: `${-10 - i * 10}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: "3s",
              }}
            />
          ))}
        </div>

        <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs font-bold text-orange-700 bg-white px-3 py-1 rounded shadow-lg'>
          Bản chất cốt lõi
        </div>
      </div>

      {/* Concealing Layers */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`layer-${i}`}
          ref={addToLayersRef}
          className='absolute w-20 h-20 transform-gpu preserve-3d'
          style={{
            opacity: 0.8,
            zIndex: 10 - i,
          }}
        >
          <div
            className='relative w-full h-full rounded-full'
            style={{
              background: `rgba(${100 + i * 30}, ${150 + i * 20}, ${
                200 + i * 10
              }, 0.${8 - i})`,
              boxShadow: `0 ${5 + i * 3}px ${15 + i * 5}px rgba(0,0,0,0.${
                2 + i
              })`,
              filter: `blur(${i * 0.5}px)`,
            }}
          />
        </div>
      ))}

      {/* Surface Phenomena */}

      {/* Phenomenon 1: Beautiful appearance */}
      <div
        ref={addToPhenomenaRef}
        className='absolute top-8 left-8 w-12 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg shadow-xl'
          style={{
            boxShadow:
              "0 8px 20px rgba(236, 72, 153, 0.3), inset 0 2px 8px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 4px 8px rgba(236, 72, 153, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-pink-200 to-pink-400 rounded-lg opacity-80' />

          <div className='relative text-2xl flex items-center justify-center h-full'>
            🌸
          </div>

          {/* Sparkle effects */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`sparkle1-${i}`}
              className='absolute w-1 h-1 bg-white rounded-full animate-ping'
              style={{
                top: `${20 + i * 20}%`,
                left: `${20 + i * 20}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-pink-700 bg-white px-2 py-1 rounded shadow'>
          Vẻ đẹp
        </div>
      </div>

      {/* Phenomenon 2: Impressive size */}
      <div
        ref={addToPhenomenaRef}
        className='absolute top-8 right-8 w-14 h-14 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-xl'
          style={{
            boxShadow:
              "0 10px 25px rgba(59, 130, 246, 0.4), inset 0 3px 10px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 5px 12px rgba(59, 130, 246, 0.3))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full opacity-80' />

          <div className='relative text-2xl flex items-center justify-center h-full'>
            📏
          </div>

          {/* Size indicators */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`size-${i}`}
              className='absolute border border-blue-300 rounded-full opacity-60'
              style={{
                width: `${80 + i * 10}%`,
                height: `${80 + i * 10}%`,
                top: `${10 - i * 5}%`,
                left: `${10 - i * 5}%`,
              }}
            />
          ))}
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded shadow'>
          Kích thước
        </div>
      </div>

      {/* Phenomenon 3: Bright color */}
      <div
        ref={addToPhenomenaRef}
        className='absolute bottom-8 left-8 w-12 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl'
          style={{
            boxShadow:
              "0 8px 20px rgba(34, 197, 94, 0.3), inset 0 2px 8px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 4px 8px rgba(34, 197, 94, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-green-200 to-green-400 rounded-lg opacity-80' />

          <div className='relative text-2xl flex items-center justify-center h-full'>
            🎨
          </div>

          {/* Color spectrum */}
          <div
            className='absolute inset-2 rounded-lg opacity-60'
            style={{
              background:
                "linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3)",
            }}
          />
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700 bg-white px-2 py-1 rounded shadow'>
          Màu sắc
        </div>
      </div>

      {/* Phenomenon 4: Texture */}
      <div
        ref={addToPhenomenaRef}
        className='absolute bottom-8 right-8 w-12 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg shadow-xl'
          style={{
            boxShadow:
              "0 8px 20px rgba(147, 51, 234, 0.3), inset 0 2px 8px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 4px 8px rgba(147, 51, 234, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-purple-200 to-purple-400 rounded-lg opacity-80' />

          <div className='relative text-2xl flex items-center justify-center h-full'>
            ✋
          </div>

          {/* Texture pattern */}
          <div
            className='absolute inset-2 rounded-lg opacity-40'
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
            }}
          />
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-700 bg-white px-2 py-1 rounded shadow'>
          Cảm giác
        </div>
      </div>

      {/* Revelation effect */}
      <div
        ref={revelationRef}
        className='absolute w-32 h-32 opacity-0 pointer-events-none'
        style={{ scale: 0 }}
      >
        <div
          className='relative w-full h-full rounded-full'
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8), rgba(251,191,36,0.3), transparent)",
            filter: "blur(10px)",
          }}
        />
      </div>

      {/* Depth perception lines */}
      <svg className='absolute inset-0 w-full h-full pointer-events-none opacity-40'>
        <defs>
          <linearGradient
            id='depthGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#f59e0b' stopOpacity='0.6' />
            <stop offset='100%' stopColor='#d97706' stopOpacity='0.2' />
          </linearGradient>
        </defs>

        {/* Lines from phenomena to essence */}
        <path
          d='M 80 60 L 160 130'
          stroke='url(#depthGradient)'
          strokeWidth='1'
          strokeDasharray='5,5'
          opacity='0.6'
        />
        <path
          d='M 240 60 L 160 130'
          stroke='url(#depthGradient)'
          strokeWidth='1'
          strokeDasharray='5,5'
          opacity='0.6'
        />
        <path
          d='M 80 200 L 160 130'
          stroke='url(#depthGradient)'
          strokeWidth='1'
          strokeDasharray='5,5'
          opacity='0.6'
        />
        <path
          d='M 240 200 L 160 130'
          stroke='url(#depthGradient)'
          strokeWidth='1'
          strokeDasharray='5,5'
          opacity='0.6'
        />
      </svg>

      {/* Concept labels */}
      <div className='absolute top-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-orange-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Hiện tượng
        </div>
        <div
          className='px-3 py-1 bg-yellow-600 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "4s" }}
        >
          Bản chất
        </div>
      </div>

      {/* Energy particles showing depth */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className='absolute w-1 h-1 bg-orange-400 rounded-full animate-ping'
            style={{
              top: `${25 + Math.sin(i * 0.6) * 50}%`,
              left: `${25 + Math.cos(i * 0.6) * 50}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "3s",
              opacity: 0.3 + (i % 3) * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EssencePhenomenonAnimation;
