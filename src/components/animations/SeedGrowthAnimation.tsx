import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const SeedGrowthAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const seedRef = useRef<HTMLDivElement>(null);
  const stemRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<HTMLDivElement[]>([]);
  const rootsRef = useRef<HTMLDivElement[]>([]);
  const conflictRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !seedRef.current || !stemRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Phase 1: Seed preparation (internal contradiction building)
    masterTL
      .set([stemRef.current, ...leavesRef.current, ...rootsRef.current], {
        scale: 0,
        opacity: 0,
      })
      .to(seedRef.current, {
        scale: 1.2,
        rotationX: 10,
        rotationY: 10,
        duration: 2,
        ease: "power2.inOut",
      })
      .to(
        conflictRef.current,
        {
          opacity: 1,
          scale: 1.5,
          duration: 1,
          ease: "power2.out",
        },
        "-=1"
      );

    // Phase 2: Root emergence (contradiction resolution begins)
    rootsRef.current.forEach((root, index) => {
      masterTL.to(
        root,
        {
          scale: 1,
          opacity: 0.8,
          y: 20 + index * 10,
          duration: 1,
          ease: "power2.out",
          delay: index * 0.2,
        },
        "roots"
      );
    });

    // Phase 3: Stem growth (upward movement)
    masterTL
      .to(
        stemRef.current,
        {
          scaleY: 1,
          opacity: 1,
          duration: 2,
          ease: "power2.out",
          transformOrigin: "bottom",
        },
        "growth"
      )
      .to(
        seedRef.current,
        {
          scale: 0.8,
          y: -10,
          duration: 2,
          ease: "power2.out",
        },
        "growth"
      );

    // Phase 4: Leaves unfurling (dialectical synthesis)
    leavesRef.current.forEach((leaf, index) => {
      masterTL.to(
        leaf,
        {
          scale: 1,
          opacity: 1,
          rotationZ: index % 2 === 0 ? 15 : -15,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
          delay: index * 0.3,
        },
        "leaves"
      );
    });

    // Phase 5: Mature plant swaying (ongoing dialectical process)
    masterTL.to([stemRef.current, ...leavesRef.current], {
      rotationZ: 5,
      duration: 3,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });

    // Continuous subtle animations
    gsap.to(conflictRef.current, {
      rotationZ: 360,
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToLeavesRef = (el: HTMLDivElement | null) => {
    if (el && !leavesRef.current.includes(el)) {
      leavesRef.current.push(el);
    }
  };

  const addToRootsRef = (el: HTMLDivElement | null) => {
    if (el && !rootsRef.current.includes(el)) {
      rootsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-80 flex items-end justify-center perspective-1000 overflow-hidden'
    >
      {/* Soil/Ground */}
      <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-amber-900 via-amber-800 to-amber-700 rounded-t-3xl'>
        {/* Soil particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`soil-${i}`}
            className='absolute w-1 h-1 bg-amber-600 rounded-full opacity-60'
            style={{
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Root System */}
      <div className='absolute bottom-16 left-1/2 transform -translate-x-1/2'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`root-${i}`}
            ref={addToRootsRef}
            className='absolute bg-gradient-to-b from-amber-600 to-amber-800 rounded-full transform-gpu'
            style={{
              width: `${3 - i * 0.3}px`,
              height: `${15 + i * 8}px`,
              left: `${-20 + i * 7}px`,
              top: "0px",
              transformOrigin: "top",
              transform: `rotate(${-30 + i * 10}deg)`,
            }}
          />
        ))}
      </div>

      {/* Main Plant Structure */}
      <div className='relative bottom-16'>
        {/* Seed */}
        <div
          ref={seedRef}
          className='relative w-6 h-8 mx-auto mb-2 transform-gpu preserve-3d'
        >
          <div className='absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full shadow-lg'></div>
          <div className='absolute inset-1 bg-gradient-to-tr from-yellow-400 to-amber-500 rounded-full opacity-80'></div>

          {/* Internal Contradiction Visualization */}
          <div
            ref={conflictRef}
            className='absolute inset-0 border-2 border-red-400 rounded-full opacity-0 transform-gpu'
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(239, 68, 68, 0.3), transparent)",
            }}
          />
        </div>

        {/* Stem */}
        <div
          ref={stemRef}
          className='w-3 h-32 mx-auto bg-gradient-to-t from-green-600 to-green-400 rounded-full shadow-lg transform-gpu'
          style={{ transformOrigin: "bottom" }}
        >
          {/* Stem segments showing growth stages */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`segment-${i}`}
              className='absolute w-full h-4 bg-green-500 opacity-60 rounded-full'
              style={{
                bottom: `${i * 12}px`,
                transform: `scale(${1 - i * 0.05})`,
              }}
            />
          ))}
        </div>

        {/* Leaves */}
        <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`leaf-${i}`}
              ref={addToLeavesRef}
              className='absolute transform-gpu preserve-3d'
              style={{
                top: `${-i * 8}px`,
                left: `${i % 2 === 0 ? -15 : 15}px`,
              }}
            >
              {/* Leaf shape */}
              <div
                className='w-8 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-md'
                style={{
                  clipPath: "ellipse(50% 80% at 50% 20%)",
                  transformOrigin: "bottom center",
                }}
              >
                {/* Leaf veins */}
                <div className='absolute inset-0 bg-gradient-to-t from-green-700 to-transparent opacity-30 rounded-full'></div>
                <div
                  className='absolute top-2 left-1/2 w-px h-6 bg-green-700 opacity-50'
                  style={{ transform: "translateX(-50%)" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Effects */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Sunlight rays */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`sunray-${i}`}
            className='absolute w-px h-16 bg-gradient-to-b from-yellow-300 to-transparent opacity-40 animate-pulse'
            style={{
              top: "10%",
              left: `${20 + i * 8}%`,
              transform: `rotate(${-15 + i * 4}deg)`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "3s",
            }}
          />
        ))}

        {/* Water droplets */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`water-${i}`}
            className='absolute w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-bounce'
            style={{
              top: `${40 + i * 8}%`,
              left: `${30 + i * 10}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "2s",
            }}
          />
        ))}

        {/* Growth energy particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping'
            style={{
              top: `${60 + Math.sin(i) * 20}%`,
              left: `${45 + Math.cos(i) * 20}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* Dialectical Process Indicators */}
      <div className='absolute top-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-red-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Mâu thuẫn nội tại
        </div>
        <div
          className='px-3 py-1 bg-green-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "2s" }}
        >
          Phát triển
        </div>
        <div
          className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "4s" }}
        >
          Chất lượng mới
        </div>
      </div>
    </div>
  );
};

export default SeedGrowthAnimation;
