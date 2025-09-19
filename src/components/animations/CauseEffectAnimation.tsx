import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const CauseEffectAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stagesRef = useRef<HTMLDivElement[]>([]);
  const arrowsRef = useRef<HTMLDivElement[]>([]);
  const cycleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 1.5 });

    // Stage 1: Studying hard
    masterTL.to(stagesRef.current[0], {
      scale: 1,
      opacity: 1,
      rotationY: 5,
      z: 10,
      duration: 1.5,
      ease: "back.out(1.7)",
    });

    // Arrow 1
    masterTL.to(
      arrowsRef.current[0],
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Stage 2: Pass exam
    masterTL.to(stagesRef.current[1], {
      scale: 1,
      opacity: 1,
      rotationY: -5,
      z: 15,
      duration: 1.5,
      ease: "elastic.out(1, 0.6)",
    });

    // Arrow 2
    masterTL.to(
      arrowsRef.current[1],
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Stage 3: Confidence
    masterTL.to(stagesRef.current[2], {
      scale: 1,
      opacity: 1,
      rotationY: 3,
      z: 20,
      duration: 1.5,
      ease: "back.out(1.7)",
    });

    // Arrow 3 (cycle back)
    masterTL.to(
      arrowsRef.current[2],
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Stage 4: Better studying
    masterTL.to(stagesRef.current[3], {
      scale: 1,
      opacity: 1,
      rotationY: -3,
      z: 25,
      duration: 1.5,
      ease: "elastic.out(1, 0.6)",
    });

    // Show cycle completion
    masterTL.to(cycleRef.current, {
      opacity: 1,
      scale: 1.2,
      rotationZ: 360,
      duration: 2,
      ease: "power2.out",
    });

    // Reset for loop
    masterTL.to([...stagesRef.current, ...arrowsRef.current], {
      scale: 0,
      opacity: 0,
      duration: 1,
      ease: "power2.in",
      stagger: 0.1,
    });

    masterTL.to(
      cycleRef.current,
      {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.5"
    );

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToStagesRef = (el: HTMLDivElement | null) => {
    if (el && !stagesRef.current.includes(el)) {
      stagesRef.current.push(el);
    }
  };

  const addToArrowsRef = (el: HTMLDivElement | null) => {
    if (el && !arrowsRef.current.includes(el)) {
      arrowsRef.current.push(el);
    }
  };

  const stages = [
    {
      icon: "📚",
      title: "Học chăm",
      color: "blue",
      position: { top: "20%", left: "10%" },
    },
    {
      icon: "🎯",
      title: "Thi đỗ",
      color: "green",
      position: { top: "20%", right: "10%" },
    },
    {
      icon: "😊",
      title: "Tự tin",
      color: "purple",
      position: { bottom: "20%", right: "10%" },
    },
    {
      icon: "📈",
      title: "Học tốt hơn",
      color: "orange",
      position: { bottom: "20%", left: "10%" },
    },
  ];

  return (
    <div
      ref={containerRef}
      className='relative w-full h-64 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1500px", perspectiveOrigin: "center center" }}
    >
      {/* Stages */}
      {stages.map((stage, index) => (
        <div
          key={`stage-${index}`}
          ref={addToStagesRef}
          className='absolute w-16 h-16 transform-gpu preserve-3d'
          style={{
            ...stage.position,
            opacity: 0,
            scale: 0,
          }}
        >
          <div
            className={`relative w-full h-full bg-gradient-to-br from-${stage.color}-400 to-${stage.color}-600 rounded-full shadow-2xl flex items-center justify-center`}
            style={{
              boxShadow: `0 10px 25px rgba(0,0,0,0.2), 0 0 20px rgba(59, 130, 246, 0.${
                stage.color === "blue" ? "4" : "2"
              })`,
              filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.1))",
            }}
          >
            <div className='absolute inset-1 bg-gradient-to-br from-white to-transparent rounded-full opacity-30' />
            <span className='text-2xl z-10'>{stage.icon}</span>

            {/* Glow effect */}
            <div
              className='absolute inset-0 rounded-full animate-pulse opacity-50'
              style={{
                background: `radial-gradient(circle, transparent 60%, rgba(59, 130, 246, 0.3) 100%)`,
              }}
            />
          </div>

          <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap'>
            {stage.title}
          </div>
        </div>
      ))}

      {/* Arrows showing cause-effect flow */}

      {/* Arrow 1: Study → Pass */}
      <div
        ref={addToArrowsRef}
        className='absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
        style={{ opacity: 0, transform: "scaleX(0)" }}
      >
        <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full relative'>
          <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border-r-2 border-t-2 border-green-500 rotate-45' />
        </div>
      </div>

      {/* Arrow 2: Pass → Confidence */}
      <div
        ref={addToArrowsRef}
        className='absolute right-1/4 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-90'
        style={{ opacity: 0, transform: "scaleX(0)" }}
      >
        <div className='w-24 h-1 bg-gradient-to-r from-green-500 to-purple-500 rounded-full relative'>
          <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border-r-2 border-t-2 border-purple-500 rotate-45' />
        </div>
      </div>

      {/* Arrow 3: Confidence → Better study */}
      <div
        ref={addToArrowsRef}
        className='absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-180'
        style={{ opacity: 0, transform: "scaleX(0)" }}
      >
        <div className='w-24 h-1 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full relative'>
          <div className='absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 border-r-2 border-t-2 border-orange-500 rotate-45' />
        </div>
      </div>

      {/* Cycle completion indicator */}
      <div
        ref={cycleRef}
        className='absolute w-20 h-20 opacity-0 transform-gpu preserve-3d'
        style={{ scale: 0 }}
      >
        <div
          className='relative w-full h-full rounded-full flex items-center justify-center'
          style={{
            background:
              "conic-gradient(from 0deg, #3b82f6, #10b981, #8b5cf6, #f59e0b, #3b82f6)",
            boxShadow:
              "0 15px 30px rgba(0,0,0,0.2), inset 0 5px 15px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
          }}
        >
          <div className='absolute inset-2 bg-white rounded-full opacity-90 flex items-center justify-center'>
            <span className='text-2xl'>🔄</span>
          </div>
        </div>
      </div>

      {/* Center explanation */}
      <div className='absolute w-24 h-24 flex items-center justify-center'>
        <div className='text-center'>
          <div className='text-xs font-bold text-gray-600 bg-white px-3 py-2 rounded-lg shadow-lg'>
            Nguyên nhân
            <br />↓<br />
            Kết quả
          </div>
        </div>
      </div>

      {/* Dynamic energy particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-blue-400 rounded-full animate-ping'
            style={{
              top: `${30 + Math.sin(i * 0.5) * 40}%`,
              left: `${30 + Math.cos(i * 0.5) * 40}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2.5s",
            }}
          />
        ))}
      </div>

      {/* Concept labels */}
      <div className='absolute top-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Chuỗi nhân quả
        </div>
        <div
          className='px-3 py-1 bg-green-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "1s" }}
        >
          Vòng tuần hoàn
        </div>
      </div>
    </div>
  );
};

export default CauseEffectAnimation;
