import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const InterconnectionAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);
  const connectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || !treeRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Initial setup - hide connections
    gsap.set(connectionsRef.current, { opacity: 0, scale: 0 });

    // Tree pulsing to show it's alive
    masterTL.to(treeRef.current, {
      scale: 1.05,
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });

    // Show connections one by one
    connectionsRef.current.forEach((connection, index) => {
      if (connection) {
        masterTL.to(
          connection,
          {
            opacity: 0.8,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
            delay: index * 0.3,
          },
          "connections"
        );
      }
    });

    // Elements pulsing to show their vital role
    elementsRef.current.forEach((element, index) => {
      if (element) {
        masterTL.to(
          element,
          {
            scale: 1.2,
            duration: 1,
            ease: "power2.inOut",
            yoyo: true,
            repeat: 1,
            delay: index * 0.2,
          },
          "elements"
        );
      }
    });

    // Show what happens when one element is removed (simulation)
    masterTL
      .to(
        elementsRef.current[1],
        {
          // Remove water
          scale: 0.3,
          opacity: 0.3,
          duration: 1,
          ease: "power2.in",
        },
        "crisis"
      )
      .to(
        treeRef.current,
        {
          scale: 0.9,
          opacity: 0.7,
          rotationZ: -5,
          duration: 1,
          ease: "power2.in",
        },
        "crisis"
      )
      .to(
        connectionsRef.current[1],
        {
          opacity: 0.2,
          scale: 0.8,
          duration: 1,
          ease: "power2.in",
        },
        "crisis"
      );

    // Recovery - element returns
    masterTL
      .to(
        elementsRef.current[1],
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "recovery"
      )
      .to(
        treeRef.current,
        {
          scale: 1,
          opacity: 1,
          rotationZ: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "recovery"
      )
      .to(
        connectionsRef.current[1],
        {
          opacity: 0.8,
          scale: 1,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "recovery"
      );

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToElementsRef = (el: HTMLDivElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  const addToConnectionsRef = (el: HTMLDivElement | null) => {
    if (el && !connectionsRef.current.includes(el)) {
      connectionsRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-80 flex items-center justify-center perspective-1000'
    >
      {/* Central Tree */}
      <div
        ref={treeRef}
        className='relative w-20 h-32 transform-gpu preserve-3d'
      >
        {/* Trunk */}
        <div className='absolute left-1/2 bottom-0 w-4 h-20 bg-gradient-to-t from-amber-800 to-amber-600 rounded-full transform -translate-x-1/2 shadow-lg'></div>

        {/* Crown */}
        <div className='absolute left-1/2 top-2 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full transform -translate-x-1/2 shadow-lg'>
          <div className='absolute inset-2 bg-gradient-to-tr from-green-300 to-green-500 rounded-full opacity-80'></div>
          <div className='absolute inset-4 bg-green-200 rounded-full opacity-60'></div>
        </div>

        {/* Roots */}
        <div className='absolute left-1/2 bottom-0 transform -translate-x-1/2'>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`root-${i}`}
              className='absolute bg-gradient-to-b from-amber-700 to-amber-900 rounded-full'
              style={{
                width: "2px",
                height: `${8 + i * 2}px`,
                left: `${-8 + i * 4}px`,
                top: "0px",
                transform: `rotate(${-20 + i * 10}deg)`,
                transformOrigin: "top",
              }}
            />
          ))}
        </div>
      </div>

      {/* Essential Elements */}

      {/* Water */}
      <div
        ref={addToElementsRef}
        className='absolute top-12 left-8 w-12 h-16 transform-gpu preserve-3d'
      >
        <div className='relative w-full h-full'>
          <div className='w-full h-full bg-gradient-to-b from-blue-300 to-blue-600 rounded-lg shadow-lg'>
            <div className='absolute inset-1 bg-gradient-to-b from-blue-200 to-blue-400 rounded-lg opacity-80'></div>
            {/* Water droplets */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={`drop-${i}`}
                className='absolute w-2 h-2 bg-blue-400 rounded-full opacity-80 animate-bounce'
                style={{
                  top: `${20 + i * 20}%`,
                  left: `${30 + i * 15}%`,
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            ))}
          </div>
          <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-700 bg-white px-2 py-1 rounded shadow'>
            Nước
          </div>
        </div>
      </div>

      {/* Sunlight */}
      <div
        ref={addToElementsRef}
        className='absolute top-8 right-8 w-16 h-16 transform-gpu preserve-3d'
      >
        <div className='relative w-full h-full bg-gradient-to-br from-yellow-300 to-orange-500 rounded-full shadow-lg animate-pulse'>
          <div className='absolute inset-2 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full opacity-80'></div>
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
                }deg) translateY(-12px)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-yellow-700 bg-white px-2 py-1 rounded shadow'>
          Ánh sáng
        </div>
      </div>

      {/* Soil Nutrients */}
      <div
        ref={addToElementsRef}
        className='absolute bottom-8 left-12 w-14 h-10 transform-gpu preserve-3d'
      >
        <div className='relative w-full h-full bg-gradient-to-t from-amber-900 to-amber-700 rounded-lg shadow-lg'>
          <div className='absolute inset-1 bg-gradient-to-t from-amber-800 to-amber-600 rounded-lg opacity-80'></div>
          {/* Nutrient particles */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={`nutrient-${i}`}
              className='absolute w-1 h-1 bg-green-400 rounded-full opacity-80 animate-ping'
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-amber-700 bg-white px-2 py-1 rounded shadow'>
          Đất
        </div>
      </div>

      {/* Air/CO2 */}
      <div
        ref={addToElementsRef}
        className='absolute bottom-12 right-12 w-12 h-12 transform-gpu preserve-3d'
      >
        <div className='relative w-full h-full'>
          {/* Air molecules */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`air-${i}`}
              className='absolute w-2 h-2 bg-gradient-to-br from-cyan-200 to-cyan-400 rounded-full opacity-60 animate-pulse'
              style={{
                top: `${Math.random() * 80}%`,
                left: `${Math.random() * 80}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
        <div className='absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-cyan-700 bg-white px-2 py-1 rounded shadow'>
          Không khí
        </div>
      </div>

      {/* Connection Lines */}

      {/* Water to Tree */}
      <div
        ref={addToConnectionsRef}
        className='absolute w-20 h-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-full transform-gpu'
        style={{
          top: "35%",
          left: "25%",
          transform: "rotate(25deg)",
          transformOrigin: "left",
        }}
      />

      {/* Sun to Tree */}
      <div
        ref={addToConnectionsRef}
        className='absolute w-24 h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transform-gpu'
        style={{
          top: "30%",
          right: "25%",
          transform: "rotate(-25deg)",
          transformOrigin: "right",
        }}
      />

      {/* Soil to Tree */}
      <div
        ref={addToConnectionsRef}
        className='absolute w-16 h-1 bg-gradient-to-r from-amber-600 to-green-400 rounded-full transform-gpu'
        style={{
          bottom: "35%",
          left: "30%",
          transform: "rotate(-15deg)",
          transformOrigin: "left",
        }}
      />

      {/* Air to Tree */}
      <div
        ref={addToConnectionsRef}
        className='absolute w-18 h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transform-gpu'
        style={{
          bottom: "40%",
          right: "30%",
          transform: "rotate(15deg)",
          transformOrigin: "right",
        }}
      />

      {/* Energy flow particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-green-400 rounded-full animate-ping'
            style={{
              top: `${30 + Math.sin(i * 0.5) * 40}%`,
              left: `${30 + Math.cos(i * 0.5) * 40}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* Warning message when element is missing */}
      <div
        className='absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg shadow-lg opacity-0 animate-pulse'
        id='warning'
      >
        ⚠️ Thiếu một yếu tố → Cây chết!
      </div>

      {/* Principle label */}
      <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white text-sm rounded-lg shadow-lg'>
        🔗 Liên hệ phổ biến
      </div>
    </div>
  );
};

export default InterconnectionAnimation;
