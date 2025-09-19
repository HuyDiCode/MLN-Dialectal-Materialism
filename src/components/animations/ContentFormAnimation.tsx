import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const ContentFormAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const formContainersRef = useRef<HTMLDivElement[]>([]);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !messageRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Phase 1: Show core message (Content)
    masterTL.to(messageRef.current, {
      scale: 1,
      opacity: 1,
      rotationY: 5,
      z: 10,
      duration: 2,
      ease: "elastic.out(1, 0.6)",
    });

    // Phase 2: Show transition effect
    masterTL.to(transitionRef.current, {
      opacity: 1,
      scale: 1.5,
      rotationZ: 180,
      duration: 1.5,
      ease: "power2.out",
    });

    // Phase 3: Transform into different forms
    formContainersRef.current.forEach((container, index) => {
      if (container) {
        masterTL.to(
          container,
          {
            scale: 1,
            opacity: 1,
            rotationY: index % 2 === 0 ? 10 : -10,
            z: 15 + index * 5,
            duration: 1.5,
            ease: "back.out(1.7)",
            delay: index * 0.4,
          },
          "forms"
        );
      }
    });

    // Phase 4: Emphasize unity of content
    masterTL.to([messageRef.current, ...formContainersRef.current], {
      y: -8,
      duration: 1,
      ease: "sine.inOut",
      yoyo: true,
      repeat: 1,
      stagger: 0.1,
    });

    // Phase 5: Reset
    masterTL.to(
      [messageRef.current, ...formContainersRef.current, transitionRef.current],
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

  const addToFormContainersRef = (el: HTMLDivElement | null) => {
    if (el && !formContainersRef.current.includes(el)) {
      formContainersRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-64 flex items-center justify-center overflow-hidden'
      style={{ perspective: "1500px", perspectiveOrigin: "center center" }}
    >
      {/* Core Message (Content) */}
      <div
        ref={messageRef}
        className='absolute w-20 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg shadow-2xl flex items-center justify-center'
          style={{
            boxShadow:
              "0 15px 30px rgba(139, 92, 246, 0.4), inset 0 3px 10px rgba(255,255,255,0.3)",
            filter: "drop-shadow(0 8px 16px rgba(139, 92, 246, 0.3))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-purple-300 to-purple-500 rounded-lg opacity-80' />

          {/* Message content */}
          <div className='relative text-white text-center z-10'>
            <div className='text-xs font-bold'>THÔNG ĐIỆP</div>
            <div className='text-lg'>💭</div>
          </div>

          {/* Glow effect */}
          <div
            className='absolute inset-0 rounded-lg animate-pulse opacity-60'
            style={{
              background:
                "radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%)",
            }}
          />
        </div>

        <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-bold text-purple-700 bg-white px-2 py-1 rounded shadow-lg'>
          Nội dung
        </div>
      </div>

      {/* Transformation indicator */}
      <div
        ref={transitionRef}
        className='absolute w-16 h-16 opacity-0 transform-gpu preserve-3d'
        style={{ scale: 0 }}
      >
        <div
          className='relative w-full h-full rounded-full flex items-center justify-center'
          style={{
            background:
              "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #10b981, #f59e0b, #8b5cf6)",
            boxShadow:
              "0 12px 24px rgba(0,0,0,0.2), inset 0 4px 12px rgba(255,255,255,0.3)",
          }}
        >
          <div className='absolute inset-2 bg-white rounded-full opacity-90 flex items-center justify-center'>
            <span className='text-xl'>🔄</span>
          </div>
        </div>
      </div>

      {/* Different Forms */}

      {/* Form 1: Book */}
      <div
        ref={addToFormContainersRef}
        className='absolute top-8 left-8 w-12 h-16 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded shadow-xl'
          style={{
            boxShadow:
              "0 10px 20px rgba(59, 130, 246, 0.3), inset 0 2px 8px rgba(255,255,255,0.2)",
            filter: "drop-shadow(0 5px 10px rgba(59, 130, 246, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-blue-200 to-blue-400 rounded opacity-80' />

          {/* Book pages */}
          <div className='absolute inset-2 bg-white rounded opacity-90'>
            <div className='absolute inset-1 space-y-0.5'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='w-full h-0.5 bg-gray-400 rounded' />
              ))}
            </div>
          </div>

          {/* Book spine */}
          <div className='absolute left-0 top-0 bottom-0 w-1 bg-blue-800 rounded-l' />
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded shadow'>
          Sách
        </div>
      </div>

      {/* Form 2: Video */}
      <div
        ref={addToFormContainersRef}
        className='absolute top-8 right-8 w-16 h-12 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-xl'
          style={{
            boxShadow:
              "0 10px 20px rgba(239, 68, 68, 0.3), inset 0 2px 8px rgba(255,255,255,0.2)",
            filter: "drop-shadow(0 5px 10px rgba(239, 68, 68, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-red-200 to-red-400 rounded-lg opacity-80' />

          {/* Video screen */}
          <div className='absolute inset-2 bg-black rounded-lg flex items-center justify-center'>
            <div className='text-white text-lg'>▶️</div>
          </div>

          {/* Video controls */}
          <div className='absolute bottom-1 left-1 right-1 h-1 bg-gray-300 rounded-full'>
            <div className='w-1/3 h-full bg-red-500 rounded-full' />
          </div>
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-red-700 bg-white px-2 py-1 rounded shadow'>
          Video
        </div>
      </div>

      {/* Form 3: Presentation */}
      <div
        ref={addToFormContainersRef}
        className='absolute bottom-8 left-8 w-14 h-10 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-xl'
          style={{
            boxShadow:
              "0 10px 20px rgba(34, 197, 94, 0.3), inset 0 2px 8px rgba(255,255,255,0.2)",
            filter: "drop-shadow(0 5px 10px rgba(34, 197, 94, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-green-200 to-green-400 rounded-lg opacity-80' />

          {/* Presentation slide */}
          <div className='absolute inset-2 bg-white rounded-lg'>
            <div className='absolute inset-1 space-y-1'>
              <div className='w-full h-1 bg-green-400 rounded' />
              <div className='w-3/4 h-0.5 bg-gray-400 rounded' />
              <div className='w-1/2 h-0.5 bg-gray-400 rounded' />
            </div>
          </div>

          {/* Projector beam */}
          <div className='absolute -left-4 top-1/2 w-4 h-0.5 bg-yellow-300 rounded-full opacity-60 animate-pulse' />
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-green-700 bg-white px-2 py-1 rounded shadow'>
          Slide
        </div>
      </div>

      {/* Form 4: Website */}
      <div
        ref={addToFormContainersRef}
        className='absolute bottom-8 right-8 w-14 h-10 transform-gpu preserve-3d'
        style={{ opacity: 0, scale: 0 }}
      >
        <div
          className='relative w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-xl'
          style={{
            boxShadow:
              "0 10px 20px rgba(251, 146, 60, 0.3), inset 0 2px 8px rgba(255,255,255,0.2)",
            filter: "drop-shadow(0 5px 10px rgba(251, 146, 60, 0.2))",
          }}
        >
          <div className='absolute inset-1 bg-gradient-to-br from-orange-200 to-orange-400 rounded-lg opacity-80' />

          {/* Browser window */}
          <div className='absolute inset-2 bg-white rounded-lg'>
            {/* Browser bar */}
            <div className='absolute top-0 left-0 right-0 h-1 bg-gray-300 rounded-t-lg flex items-center px-1'>
              <div className='w-0.5 h-0.5 bg-red-400 rounded-full' />
              <div className='w-0.5 h-0.5 bg-yellow-400 rounded-full ml-0.5' />
              <div className='w-0.5 h-0.5 bg-green-400 rounded-full ml-0.5' />
            </div>

            {/* Website content */}
            <div className='absolute top-1 inset-x-1 bottom-1 space-y-0.5'>
              <div className='w-full h-0.5 bg-orange-400 rounded' />
              <div className='w-2/3 h-0.5 bg-gray-400 rounded' />
              <div className='w-1/2 h-0.5 bg-gray-400 rounded' />
            </div>
          </div>
        </div>

        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-orange-700 bg-white px-2 py-1 rounded shadow'>
          Website
        </div>
      </div>

      {/* Connection lines showing same content */}
      <svg className='absolute inset-0 w-full h-full pointer-events-none opacity-60'>
        <defs>
          <linearGradient
            id='contentGradient'
            x1='0%'
            y1='0%'
            x2='100%'
            y2='100%'
          >
            <stop offset='0%' stopColor='#8b5cf6' stopOpacity='0.6' />
            <stop offset='100%' stopColor='#3b82f6' stopOpacity='0.4' />
          </linearGradient>
        </defs>

        <path
          d='M 160 130 L 80 60'
          stroke='url(#contentGradient)'
          strokeWidth='1'
          strokeDasharray='3,3'
          opacity='0.5'
        />
        <path
          d='M 160 130 L 240 60'
          stroke='url(#contentGradient)'
          strokeWidth='1'
          strokeDasharray='3,3'
          opacity='0.5'
        />
        <path
          d='M 160 130 L 80 200'
          stroke='url(#contentGradient)'
          strokeWidth='1'
          strokeDasharray='3,3'
          opacity='0.5'
        />
        <path
          d='M 160 130 L 240 200'
          stroke='url(#contentGradient)'
          strokeWidth='1'
          strokeDasharray='3,3'
          opacity='0.5'
        />
      </svg>

      {/* Concept labels */}
      <div className='absolute top-4 left-4 space-y-2'>
        <div className='px-3 py-1 bg-purple-500 text-white text-xs rounded-full shadow-lg animate-pulse'>
          Một nội dung
        </div>
        <div
          className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "2s" }}
        >
          Nhiều hình thức
        </div>
      </div>

      {/* Energy particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className='absolute w-1 h-1 bg-purple-400 rounded-full animate-ping'
            style={{
              top: `${30 + Math.sin(i * 0.8) * 40}%`,
              left: `${30 + Math.cos(i * 0.8) * 40}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: "2.5s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ContentFormAnimation;
