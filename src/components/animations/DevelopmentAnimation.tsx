import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const DevelopmentAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const humanStagesRef = useRef<HTMLDivElement[]>([]);
  const societyStagesRef = useRef<HTMLDivElement[]>([]);
  const transitionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !transitionRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial setup
    gsap.set([...humanStagesRef.current, ...societyStagesRef.current], {
      scale: 0,
      opacity: 0,
    });

    // Phase 1: Human Development - Child (Enhanced with realistic physics)
    masterTL
      .to(humanStagesRef.current[0], {
        scale: 1,
        opacity: 1,
        rotationY: 8,
        rotationX: 3,
        z: 15,
        duration: 2.5,
        ease: "elastic.out(1, 0.8)",
      })
      .to(humanStagesRef.current[0], {
        y: -15,
        x: Math.sin(Date.now() * 0.001) * 5,
        rotationZ: 5,
        rotationY: 12,
        z: 20,
        duration: 1.8,
        repeat: 2,
        yoyo: true,
        ease: "sine.inOut",
      })
      .to(humanStagesRef.current[0], {
        rotationX: -2,
        rotationY: -5,
        duration: 1,
        ease: "power2.inOut",
        yoyo: true,
        repeat: 1,
      });

    // Phase 2: Growth transition (Enhanced with particle effects)
    masterTL
      .to(transitionRef.current, {
        opacity: 1,
        scale: 1.5,
        rotationZ: 360,
        rotationX: 20,
        rotationY: 15,
        z: 30,
        duration: 2,
        ease: "back.out(2.2)",
      })
      .to(
        humanStagesRef.current[0],
        {
          scale: 0.7,
          opacity: 0.5,
          rotationY: 25,
          rotationX: 10,
          z: 5,
          duration: 1.5,
          ease: "power3.in",
        },
        "<"
      );

    // Phase 3: Human Development - Adult (Enhanced maturity animation)
    masterTL
      .to(humanStagesRef.current[1], {
        scale: 1.2,
        opacity: 1,
        rotationY: -8,
        rotationX: 5,
        z: 25,
        duration: 2,
        ease: "elastic.out(1.2, 0.7)",
      })
      .to(humanStagesRef.current[1], {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        z: 15,
        duration: 1,
        ease: "power2.out",
      })
      .to(
        transitionRef.current,
        {
          opacity: 0,
          scale: 0,
          rotationZ: 180,
          duration: 1,
          ease: "power3.in",
        },
        "<"
      );

    // Phase 4: Society Development - Agricultural (Enhanced farming animation)
    masterTL
      .to(societyStagesRef.current[0], {
        scale: 1,
        opacity: 1,
        rotationY: 10,
        rotationX: -5,
        z: 20,
        duration: 2,
        ease: "back.out(1.9)",
        delay: 0.8,
      })
      .to(societyStagesRef.current[0], {
        rotationY: -8,
        rotationZ: 2,
        y: -8,
        duration: 2.5,
        repeat: 1,
        yoyo: true,
        ease: "sine.inOut",
      })
      .to(societyStagesRef.current[0], {
        rotationX: 3,
        z: 25,
        duration: 1.2,
        ease: "power2.out",
      });

    // Phase 5: Social transformation (Enhanced industrial revolution)
    masterTL
      .to(transitionRef.current, {
        opacity: 1,
        scale: 1.8,
        rotationZ: 720,
        rotationX: 25,
        rotationY: 20,
        z: 40,
        duration: 2.2,
        ease: "back.out(2.5)",
      })
      .to(
        societyStagesRef.current[0],
        {
          scale: 0.6,
          opacity: 0.3,
          rotationY: 30,
          rotationX: 15,
          z: 5,
          duration: 2,
          ease: "power3.in",
        },
        "<"
      );

    // Phase 6: Society Development - Industrial (Enhanced machinery animation)
    masterTL
      .to(societyStagesRef.current[1], {
        scale: 1.3,
        opacity: 1,
        rotationY: 12,
        rotationX: -8,
        z: 30,
        duration: 2.5,
        ease: "elastic.out(1.5, 0.8)",
      })
      .to(societyStagesRef.current[1], {
        scale: 1,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 2,
        z: 20,
        duration: 1.5,
        ease: "power2.out",
      })
      .to(
        transitionRef.current,
        {
          opacity: 0,
          scale: 0,
          rotationZ: -360,
          rotationX: -20,
          duration: 1.5,
          ease: "power3.in",
        },
        "<"
      );

    // Continuous development indicators
    gsap.to(timelineRef.current, {
      scaleX: 1,
      duration: 12,
      repeat: -1,
      ease: "none",
      transformOrigin: "left",
    });

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToHumanStagesRef = (el: HTMLDivElement | null) => {
    if (el && !humanStagesRef.current.includes(el)) {
      humanStagesRef.current.push(el);
    }
  };

  const addToSocietyStagesRef = (el: HTMLDivElement | null) => {
    if (el && !societyStagesRef.current.includes(el)) {
      societyStagesRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-80 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1500px", perspectiveOrigin: "center center" }}
    >
      {/* Timeline Background */}
      <div
        className='absolute bottom-4 left-4 right-4 h-2 bg-gradient-to-r from-gray-200 to-gray-400 rounded-full'
        style={{
          boxShadow:
            "0 4px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(0,0,0,0.1)",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        }}
      >
        <div
          ref={timelineRef}
          className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transform-gpu'
          style={{
            transformOrigin: "left",
            transform: "scaleX(0)",
            boxShadow:
              "0 0 15px rgba(59, 130, 246, 0.5), inset 0 1px 3px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 2px 6px rgba(59, 130, 246, 0.3))",
          }}
        />

        {/* Timeline markers */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={`marker-${i}`}
            className='absolute top-1/2 w-1 h-3 bg-white rounded-full transform -translate-y-1/2 opacity-80'
            style={{
              left: `${i * 25}%`,
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>

      {/* Human Development Section */}
      <div className='absolute top-8 left-8 w-48 h-32'>
        <h4 className='text-sm font-bold text-blue-800 mb-2 text-center'>
          Con người phát triển
        </h4>

        {/* Child Stage */}
        <div
          ref={addToHumanStagesRef}
          className='absolute left-8 top-4 w-16 h-20 transform-gpu preserve-3d'
        >
          <div
            className='relative w-full h-full'
            style={{
              filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.2))",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Child figure */}
            <div
              className='absolute bottom-0 left-1/2 w-3 h-8 bg-gradient-to-t from-pink-400 to-pink-300 rounded-full transform -translate-x-1/2'
              style={{
                boxShadow:
                  "0 6px 12px rgba(244, 114, 182, 0.3), inset 0 2px 6px rgba(255,255,255,0.4)",
                filter: "drop-shadow(0 3px 6px rgba(244, 114, 182, 0.2))",
              }}
            />
            {/* Head */}
            <div
              className='absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-br from-amber-200 to-pink-200 rounded-full transform -translate-x-1/2'
              style={{
                boxShadow:
                  "0 8px 16px rgba(251, 191, 36, 0.3), inset 0 3px 8px rgba(255,255,255,0.5)",
                filter: "drop-shadow(0 4px 8px rgba(251, 191, 36, 0.2))",
              }}
            >
              <div className='absolute inset-1 bg-gradient-to-br from-pink-100 to-amber-100 rounded-full opacity-90' />
              {/* Eyes */}
              <div className='absolute top-1 left-1 w-0.5 h-0.5 bg-black rounded-full' />
              <div className='absolute top-1 right-1 w-0.5 h-0.5 bg-black rounded-full' />
              {/* Smile */}
              <div className='absolute bottom-1 left-1/2 w-1.5 h-0.5 border-b border-black rounded-full transform -translate-x-1/2 opacity-80' />
            </div>
            {/* Arms */}
            <div className='absolute top-4 left-0 w-2 h-1 bg-pink-300 rounded-full transform rotate-45' />
            <div className='absolute top-4 right-0 w-2 h-1 bg-pink-300 rounded-full transform -rotate-45' />
            {/* Legs */}
            <div className='absolute bottom-0 left-2 w-1 h-3 bg-blue-400 rounded-full' />
            <div className='absolute bottom-0 right-2 w-1 h-3 bg-blue-400 rounded-full' />

            {/* Playful elements */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`toy-${i}`}
                className='absolute w-1 h-1 bg-yellow-400 rounded-full animate-bounce'
                style={{
                  top: `${60 + i * 10}%`,
                  left: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
          <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded shadow'>
            Trẻ em
          </div>
        </div>

        {/* Adult Stage */}
        <div
          ref={addToHumanStagesRef}
          className='absolute right-8 top-4 w-16 h-20 transform-gpu preserve-3d'
        >
          <div
            className='relative w-full h-full'
            style={{
              filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.25))",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Adult figure */}
            <div
              className='absolute bottom-0 left-1/2 w-4 h-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transform -translate-x-1/2'
              style={{
                boxShadow:
                  "0 8px 16px rgba(59, 130, 246, 0.4), inset 0 3px 8px rgba(255,255,255,0.3)",
                filter: "drop-shadow(0 4px 8px rgba(59, 130, 246, 0.3))",
              }}
            />
            {/* Head */}
            <div
              className='absolute top-0 left-1/2 w-5 h-5 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full transform -translate-x-1/2'
              style={{
                boxShadow:
                  "0 10px 20px rgba(251, 191, 36, 0.4), inset 0 4px 10px rgba(255,255,255,0.6)",
                filter: "drop-shadow(0 5px 10px rgba(251, 191, 36, 0.3))",
              }}
            >
              <div className='absolute inset-1 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full opacity-90' />
              {/* Eyes */}
              <div className='absolute top-1.5 left-1 w-0.5 h-0.5 bg-black rounded-full' />
              <div className='absolute top-1.5 right-1 w-0.5 h-0.5 bg-black rounded-full' />
              {/* Confident smile */}
              <div className='absolute bottom-1 left-1/2 w-2 h-1 border-b-2 border-black rounded-full transform -translate-x-1/2' />
            </div>
            {/* Arms */}
            <div className='absolute top-6 left-0 w-3 h-1.5 bg-blue-400 rounded-full transform rotate-30' />
            <div className='absolute top-6 right-0 w-3 h-1.5 bg-blue-400 rounded-full transform -rotate-30' />
            {/* Legs */}
            <div className='absolute bottom-0 left-3 w-1.5 h-4 bg-gray-600 rounded-full' />
            <div className='absolute bottom-0 right-3 w-1.5 h-4 bg-gray-600 rounded-full' />

            {/* Professional elements */}
            <div className='absolute top-6 left-1/2 w-2 h-1 bg-yellow-600 rounded transform -translate-x-1/2'>
              {/* Briefcase */}
            </div>
          </div>
          <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded shadow'>
            Người lớn
          </div>
        </div>
      </div>

      {/* Society Development Section */}
      <div className='absolute bottom-16 right-8 w-48 h-32'>
        <h4 className='text-sm font-bold text-green-800 mb-2 text-center'>
          Xã hội phát triển
        </h4>

        {/* Agricultural Society */}
        <div
          ref={addToSocietyStagesRef}
          className='absolute left-8 top-4 w-16 h-20 transform-gpu preserve-3d'
        >
          <div className='relative w-full h-full'>
            {/* Farm landscape */}
            <div className='absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg'>
              {/* Crop rows */}
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={`crop-${i}`}
                  className='absolute w-px h-2 bg-green-800 opacity-60'
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: `${10 + Math.random() * 20}%`,
                  }}
                />
              ))}
            </div>

            {/* Farmer */}
            <div className='absolute bottom-8 left-1/2 w-3 h-6 bg-gradient-to-t from-amber-600 to-amber-400 rounded-full transform -translate-x-1/2' />
            <div className='absolute bottom-12 left-1/2 w-2.5 h-2.5 bg-amber-200 rounded-full transform -translate-x-1/2' />

            {/* Farm tools */}
            <div className='absolute bottom-6 right-2 w-1 h-4 bg-amber-800 rounded transform rotate-45' />

            {/* Animals */}
            <div className='absolute bottom-8 left-2 w-2 h-1.5 bg-white rounded-full shadow-sm'>
              <div className='absolute top-0 left-0 w-0.5 h-0.5 bg-black rounded-full' />
            </div>
          </div>
          <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700 bg-white px-2 py-1 rounded shadow'>
            Nông nghiệp
          </div>
        </div>

        {/* Industrial Society */}
        <div
          ref={addToSocietyStagesRef}
          className='absolute right-8 top-4 w-16 h-20 transform-gpu preserve-3d'
        >
          <div
            className='relative w-full h-full'
            style={{
              filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.3))",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Factory buildings */}
            <div
              className='absolute bottom-0 left-0 w-4 h-8 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-sm'
              style={{
                boxShadow:
                  "0 10px 20px rgba(75, 85, 99, 0.4), inset 0 3px 8px rgba(255,255,255,0.2)",
                filter: "drop-shadow(0 5px 10px rgba(75, 85, 99, 0.3))",
              }}
            />
            <div
              className='absolute bottom-0 right-0 w-3 h-6 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-sm'
              style={{
                boxShadow:
                  "0 8px 16px rgba(55, 65, 81, 0.4), inset 0 2px 6px rgba(255,255,255,0.15)",
                filter: "drop-shadow(0 4px 8px rgba(55, 65, 81, 0.3))",
              }}
            />

            {/* Smokestacks */}
            <div className='absolute top-0 left-1 w-1 h-4 bg-gray-800 rounded-full' />
            <div className='absolute top-0 right-1 w-0.5 h-3 bg-gray-800 rounded-full' />

            {/* Smoke */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={`smoke-${i}`}
                className='absolute w-1 h-1 bg-gray-400 rounded-full opacity-60 animate-pulse'
                style={{
                  top: `${-5 - i * 2}px`,
                  left: `${20 + Math.sin(i) * 10}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}

            {/* Gears and machinery */}
            <div
              className='absolute bottom-2 left-1 w-2 h-2 border-2 border-yellow-400 rounded-full animate-spin'
              style={{
                animationDuration: "3s",
                boxShadow:
                  "0 4px 8px rgba(251, 191, 36, 0.3), inset 0 1px 3px rgba(255,255,255,0.4)",
                filter: "drop-shadow(0 2px 4px rgba(251, 191, 36, 0.2))",
              }}
            >
              <div className='absolute inset-0.5 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full opacity-80' />

              {/* Gear teeth */}
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`tooth-${i}`}
                  className='absolute w-0.5 h-0.5 bg-yellow-500'
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${
                      i * 45
                    }deg) translateY(-6px)`,
                    transformOrigin: "center",
                  }}
                />
              ))}
            </div>

            {/* Steam/Energy effects */}
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={`energy-${i}`}
                className='absolute w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60'
                style={{
                  bottom: `${20 + i * 15}%`,
                  left: `${30 + Math.sin(i) * 20}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "2s",
                }}
              />
            ))}

            {/* Workers */}
            <div className='absolute bottom-8 left-2 w-1.5 h-3 bg-blue-500 rounded-full' />
            <div className='absolute bottom-8 right-3 w-1.5 h-3 bg-blue-500 rounded-full' />

            {/* Conveyor belt */}
            <div className='absolute bottom-6 left-0 right-0 h-0.5 bg-gray-800 rounded'>
              <div className='absolute top-0 left-0 w-2 h-full bg-yellow-400 rounded animate-pulse' />
            </div>
          </div>
          <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700 bg-white px-2 py-1 rounded shadow'>
            Công nghiệp
          </div>
        </div>
      </div>

      {/* Central Transformation Element */}
      <div
        ref={transitionRef}
        className='absolute w-12 h-12 opacity-0 transform-gpu preserve-3d'
        style={{
          background:
            "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #10b981, #f59e0b, #3b82f6)",
          borderRadius: "50%",
          boxShadow:
            "0 0 30px rgba(59, 130, 246, 0.6), 0 15px 30px rgba(0,0,0,0.3)",
          filter: "drop-shadow(0 10px 20px rgba(59, 130, 246, 0.4))",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className='absolute inset-2 bg-gradient-to-br from-white to-gray-100 rounded-full opacity-95 flex items-center justify-center'
          style={{
            boxShadow:
              "inset 0 3px 8px rgba(0,0,0,0.1), inset 0 -3px 8px rgba(255,255,255,0.8)",
          }}
        >
          <span className='text-lg animate-pulse'>🔄</span>
        </div>

        {/* Energy rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`energy-ring-${i}`}
            className='absolute border border-blue-300 rounded-full opacity-40 animate-ping'
            style={{
              width: `${120 + i * 15}%`,
              height: `${120 + i * 15}%`,
              top: `${-10 - i * 7.5}%`,
              left: `${-10 - i * 7.5}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "2.5s",
            }}
          />
        ))}
      </div>

      {/* Development arrows */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Human development arrow */}
        <div className='absolute top-16 left-20 w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full'>
          <div className='absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-blue-600 transform rotate-45 -translate-y-1' />
        </div>

        {/* Society development arrow */}
        <div className='absolute bottom-28 right-20 w-16 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full'>
          <div className='absolute right-0 top-0 w-2 h-2 border-r-2 border-t-2 border-green-600 transform rotate-45 -translate-y-1' />
        </div>
      </div>

      {/* Progress indicators */}
      <div className='absolute top-4 left-1/2 transform -translate-x-1/2 space-x-4 flex'>
        <div className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Phát triển liên tục
        </div>
        <div
          className='px-3 py-1 bg-green-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "1s" }}
        >
          Có quy luật
        </div>
      </div>

      {/* Time progression particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`time-${i}`}
            className='absolute w-1 h-1 bg-purple-400 rounded-full animate-ping'
            style={{
              top: `${30 + Math.sin(i * 0.7) * 40}%`,
              left: `${20 + i * 5}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Development principle label */}
      <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg'>
        <div className='flex items-center space-x-2'>
          <span className='text-lg'>📈</span>
          <span className='text-sm font-bold'>Sự phát triển</span>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentAnimation;
