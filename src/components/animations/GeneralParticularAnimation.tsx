import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const GeneralParticularAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particularTreesRef = useRef<HTMLDivElement[]>([]);
  const generalElementsRef = useRef<HTMLDivElement[]>([]);
  const connectionLinesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Phase 1: Show individual trees (Particular)
    particularTreesRef.current.forEach((tree, index) => {
      if (tree) {
        masterTL.to(
          tree,
          {
            scale: 1,
            opacity: 1,
            rotationY: Math.sin(index) * 10,
            z: index * 5,
            duration: 1.5,
            ease: "elastic.out(1, 0.6)",
            delay: index * 0.3,
          },
          "particular"
        );
      }
    });

    // Phase 2: Highlight common needs (General)
    masterTL.to(
      generalElementsRef.current,
      {
        scale: 1.2,
        opacity: 1,
        rotationZ: 360,
        duration: 2,
        ease: "power2.out",
        stagger: 0.4,
        delay: 1,
      },
      "general"
    );

    // Phase 3: Show connections
    connectionLinesRef.current.forEach((line, index) => {
      if (line) {
        masterTL.to(
          line,
          {
            scaleX: 1,
            opacity: 0.8,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.2,
          },
          "connections"
        );
      }
    });

    // Phase 4: Unified understanding
    masterTL.to(
      [...particularTreesRef.current, ...generalElementsRef.current],
      {
        y: -5,
        duration: 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }
    );

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToParticularTreesRef = (el: HTMLDivElement | null) => {
    if (el && !particularTreesRef.current.includes(el)) {
      particularTreesRef.current.push(el);
    }
  };

  const addToGeneralElementsRef = (el: HTMLDivElement | null) => {
    if (el && !generalElementsRef.current.includes(el)) {
      generalElementsRef.current.push(el);
    }
  };

  const addToConnectionLinesRef = (el: HTMLDivElement | null) => {
    if (el && !connectionLinesRef.current.includes(el)) {
      connectionLinesRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-64 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1400px", perspectiveOrigin: "center center" }}
    >
      {/* Individual Trees (Particular) */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`tree-${i}`}
          ref={addToParticularTreesRef}
          className='absolute w-12 h-16 transform-gpu preserve-3d'
          style={{
            left: `${25 + i * 15}%`,
            bottom: "20%",
            opacity: 0,
            scale: 0,
          }}
        >
          {/* Tree trunk */}
          <div
            className='absolute bottom-0 left-1/2 w-2 h-8 bg-gradient-to-t from-amber-800 to-amber-600 rounded-full transform -translate-x-1/2'
            style={{
              boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
            }}
          />

          {/* Tree crown - each tree different */}
          <div
            className={`absolute top-0 left-1/2 w-10 h-10 rounded-full transform -translate-x-1/2 shadow-lg`}
            style={{
              background:
                i % 2 === 0
                  ? "radial-gradient(circle, #22c55e, #15803d)"
                  : "radial-gradient(circle, #16a34a, #166534)",
              boxShadow: "0 8px 20px rgba(34, 197, 94, 0.3)",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))",
            }}
          >
            <div className='absolute inset-1 bg-gradient-to-br from-green-300 to-transparent rounded-full opacity-60' />
          </div>

          {/* Individual characteristics */}
          <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-800 bg-white px-2 py-1 rounded shadow-lg'>
            Cây {i + 1}
          </div>
        </div>
      ))}

      {/* Common Elements (General) */}

      {/* Sun (Light) */}
      <div
        ref={addToGeneralElementsRef}
        className='absolute top-4 right-8 w-12 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full animate-pulse'
          style={{
            boxShadow:
              "0 0 30px rgba(251, 191, 36, 0.6), 0 10px 20px rgba(0,0,0,0.1)",
            filter: "drop-shadow(0 5px 10px rgba(251, 191, 36, 0.3))",
          }}
        >
          <div className='absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80' />

          {/* Sun rays */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`ray-${i}`}
              className='absolute w-1 h-4 bg-yellow-400 rounded-full opacity-70'
              style={{
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) rotate(${
                  i * 45
                }deg) translateY(-10px)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-700 bg-white px-2 py-1 rounded shadow'>
          Ánh sáng
        </div>
      </div>

      {/* Water */}
      <div
        ref={addToGeneralElementsRef}
        className='absolute bottom-8 left-8 w-10 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-b from-blue-300 to-blue-600 rounded-lg'
          style={{
            boxShadow:
              "0 8px 20px rgba(59, 130, 246, 0.4), inset 0 2px 8px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg opacity-80' />

          {/* Water droplets */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={`drop-${i}`}
              className='absolute w-1.5 h-1.5 bg-blue-400 rounded-full opacity-80 animate-bounce'
              style={{
                top: `${20 + i * 25}%`,
                left: `${30 + i * 20}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded shadow'>
          Nước
        </div>
      </div>

      {/* Soil */}
      <div
        ref={addToGeneralElementsRef}
        className='absolute bottom-4 right-8 w-12 h-6 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-t from-amber-900 to-amber-700 rounded-lg'
          style={{
            boxShadow:
              "0 6px 15px rgba(120, 53, 15, 0.4), inset 0 2px 6px rgba(255,255,255,0.1)",
            filter: "drop-shadow(0 3px 6px rgba(120, 53, 15, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-t from-amber-800 to-amber-600 rounded-lg opacity-80' />

          {/* Soil particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`particle-${i}`}
              className='absolute w-0.5 h-0.5 bg-amber-600 rounded-full opacity-70'
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
              }}
            />
          ))}
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-amber-700 bg-white px-2 py-1 rounded shadow'>
          Đất
        </div>
      </div>

      {/* Connection Lines */}

      {/* Sun to trees */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`sun-line-${i}`}
          ref={addToConnectionLinesRef}
          className='absolute h-0.5 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transform-gpu'
          style={{
            top: "25%",
            left: `${30 + i * 15}%`,
            width: `${20 - i * 2}px`,
            transformOrigin: "left",
            opacity: 0,
            transform: `scaleX(0) rotate(${-30 + i * 10}deg)`,
          }}
        />
      ))}

      {/* Water to trees */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`water-line-${i}`}
          ref={addToConnectionLinesRef}
          className='absolute h-0.5 bg-gradient-to-r from-blue-400 to-green-400 rounded-full transform-gpu'
          style={{
            bottom: "35%",
            left: `${20 + i * 15}%`,
            width: `${15 + i * 2}px`,
            transformOrigin: "left",
            opacity: 0,
            transform: `scaleX(0) rotate(${20 - i * 8}deg)`,
          }}
        />
      ))}

      {/* Soil to trees */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={`soil-line-${i}`}
          ref={addToConnectionLinesRef}
          className='absolute h-0.5 bg-gradient-to-r from-amber-600 to-green-400 rounded-full transform-gpu'
          style={{
            bottom: "25%",
            right: `${25 + i * 12}%`,
            width: `${18 - i * 2}px`,
            transformOrigin: "right",
            opacity: 0,
            transform: `scaleX(0) rotate(${-25 + i * 12}deg)`,
          }}
        />
      ))}

      {/* Concept Labels */}
      <div className='absolute top-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-pink-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Cái riêng
        </div>
        <div
          className='px-3 py-1 bg-pink-600 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "2s" }}
        >
          Cái chung
        </div>
      </div>

      {/* Energy particles showing unity */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-pink-400 rounded-full animate-ping'
            style={{
              top: `${30 + Math.sin(i * 0.8) * 40}%`,
              left: `${30 + Math.cos(i * 0.8) * 40}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default GeneralParticularAnimation;
