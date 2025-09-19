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

    // Phase 1: Human Development - Child
    masterTL
      .to(humanStagesRef.current[0], {
        scale: 1,
        opacity: 1,
        rotationY: 5,
        z: 10,
        duration: 2,
        ease: "elastic.out(1, 0.6)",
      })
      .to(humanStagesRef.current[0], {
        y: -12,
        rotationZ: 3,
        duration: 1.2,
        repeat: 2,
        yoyo: true,
        ease: "sine.inOut",
      });

    // Phase 2: Growth transition
    masterTL
      .to(transitionRef.current, {
        opacity: 1,
        scale: 1.3,
        rotationZ: 180,
        rotationX: 15,
        rotationY: 10,
        z: 20,
        duration: 1.5,
        ease: "back.out(1.7)",
      })
      .to(
        humanStagesRef.current[0],
        {
          scale: 0.8,
          opacity: 0.7,
          duration: 1,
          ease: "power2.in",
        },
        "<"
      );

    // Phase 3: Human Development - Adult
    masterTL
      .to(humanStagesRef.current[1], {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
      })
      .to(
        transitionRef.current,
        {
          opacity: 0,
          scale: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        "<"
      );

    // Phase 4: Society Development - Agricultural
    masterTL
      .to(societyStagesRef.current[0], {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "back.out(1.7)",
        delay: 0.5,
      })
      .to(societyStagesRef.current[0], {
        rotationY: 5,
        duration: 2,
        repeat: 1,
        yoyo: true,
        ease: "power2.inOut",
      });

    // Phase 5: Social transformation
    masterTL
      .to(transitionRef.current, {
        opacity: 1,
        scale: 1.5,
        rotationZ: 360,
        duration: 1.5,
        ease: "power2.inOut",
      })
      .to(
        societyStagesRef.current[0],
        {
          scale: 0.7,
          opacity: 0.5,
          duration: 1.5,
          ease: "power2.in",
        },
        "<"
      );

    // Phase 6: Society Development - Industrial
    masterTL
      .to(societyStagesRef.current[1], {
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "back.out(1.7)",
      })
      .to(
        transitionRef.current,
        {
          opacity: 0,
          scale: 0,
          duration: 1,
          ease: "power2.in",
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
      <div className='absolute bottom-4 left-4 right-4 h-1 bg-gray-300 rounded-full'>
        <div
          ref={timelineRef}
          className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transform-gpu'
          style={{ transformOrigin: "left", transform: "scaleX(0)" }}
        />
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
          <div className='relative w-full h-full'>
            {/* Child figure */}
            <div className='absolute bottom-0 left-1/2 w-3 h-8 bg-gradient-to-t from-pink-400 to-pink-300 rounded-full transform -translate-x-1/2' />
            {/* Head */}
            <div className='absolute top-0 left-1/2 w-4 h-4 bg-gradient-to-br from-peach-300 to-pink-200 rounded-full transform -translate-x-1/2 shadow-sm'>
              <div className='absolute inset-1 bg-pink-100 rounded-full opacity-80' />
              {/* Eyes */}
              <div className='absolute top-1 left-1 w-0.5 h-0.5 bg-black rounded-full' />
              <div className='absolute top-1 right-1 w-0.5 h-0.5 bg-black rounded-full' />
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
          <div className='relative w-full h-full'>
            {/* Adult figure */}
            <div className='absolute bottom-0 left-1/2 w-4 h-12 bg-gradient-to-t from-blue-600 to-blue-400 rounded-full transform -translate-x-1/2' />
            {/* Head */}
            <div className='absolute top-0 left-1/2 w-5 h-5 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full transform -translate-x-1/2 shadow-lg'>
              <div className='absolute inset-1 bg-amber-100 rounded-full opacity-80' />
              {/* Eyes */}
              <div className='absolute top-1.5 left-1 w-0.5 h-0.5 bg-black rounded-full' />
              <div className='absolute top-1.5 right-1 w-0.5 h-0.5 bg-black rounded-full' />
              {/* Smile */}
              <div className='absolute bottom-1 left-1/2 w-2 h-1 border-b border-black rounded-full transform -translate-x-1/2' />
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
          <div className='relative w-full h-full'>
            {/* Factory buildings */}
            <div className='absolute bottom-0 left-0 w-4 h-8 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-sm shadow-lg' />
            <div className='absolute bottom-0 right-0 w-3 h-6 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-sm shadow-lg' />

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
              className='absolute bottom-2 left-1 w-2 h-2 border border-yellow-400 rounded-full animate-spin'
              style={{ animationDuration: "3s" }}
            >
              <div className='absolute inset-0.5 bg-yellow-400 rounded-full opacity-60' />
            </div>

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
            "conic-gradient(from 0deg, #3b82f6, #8b5cf6, #10b981, #f59e0b)",
          borderRadius: "50%",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
        }}
      >
        <div className='absolute inset-2 bg-white rounded-full opacity-80 flex items-center justify-center'>
          <span className='text-lg'>🔄</span>
        </div>
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
