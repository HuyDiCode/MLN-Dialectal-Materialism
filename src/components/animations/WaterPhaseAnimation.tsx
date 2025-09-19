import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const WaterPhaseAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waterRef = useRef<HTMLDivElement>(null);
  const steamRef = useRef<HTMLDivElement>(null);
  const temperatureRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement[]>([]);
  const thermometerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !waterRef.current || !steamRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 3 });

    // Phase 1: Cold water (0-50°C)
    masterTL
      .set(steamRef.current, { opacity: 0, scale: 0 })
      .set(bubblesRef.current, { scale: 0, opacity: 0 })
      .to(waterRef.current, {
        background: "linear-gradient(to top, #1e40af, #3b82f6, #60a5fa)",
        duration: 2,
        ease: "power2.inOut",
      })
      .to(
        temperatureRef.current,
        {
          textContent: "25°C",
          duration: 2,
          ease: "power2.inOut",
        },
        0
      );

    // Phase 2: Warming water (50-90°C) - Quantity change
    masterTL
      .to(waterRef.current, {
        background: "linear-gradient(to top, #059669, #10b981, #34d399)",
        duration: 3,
        ease: "power2.inOut",
      })
      .to(
        temperatureRef.current,
        {
          textContent: "80°C",
          duration: 3,
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        thermometerRef.current,
        {
          scaleY: 0.8,
          background: "linear-gradient(to top, #dc2626, #ef4444)",
          duration: 3,
          ease: "power2.inOut",
        },
        "<"
      );

    // Phase 3: Critical point approach (90-99°C) - Tension builds
    bubblesRef.current.forEach((bubble, index) => {
      if (bubble) {
        masterTL.to(
          bubble,
          {
            scale: 0.5,
            opacity: 0.6,
            y: -10,
            duration: 1,
            ease: "power2.out",
            delay: index * 0.1,
          },
          "bubbling"
        );
      }
    });

    masterTL
      .to(
        waterRef.current,
        {
          background: "linear-gradient(to top, #dc2626, #ef4444, #f87171)",
          duration: 2,
          ease: "power2.inOut",
        },
        "bubbling"
      )
      .to(
        temperatureRef.current,
        {
          textContent: "99°C",
          duration: 2,
          ease: "power2.inOut",
        },
        "bubbling"
      );

    // Phase 4: QUALITATIVE CHANGE - 100°C Boiling Point!
    masterTL
      .to(waterRef.current, {
        background: "linear-gradient(to top, #fbbf24, #f59e0b, #d97706)",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(
        temperatureRef.current,
        {
          textContent: "100°C",
          color: "#dc2626",
          scale: 1.3,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "<"
      )
      .to(
        thermometerRef.current,
        {
          scaleY: 1,
          background: "linear-gradient(to top, #dc2626, #ef4444, #f87171)",
          duration: 1,
          ease: "power2.inOut",
        },
        "<"
      );

    // Phase 5: Steam formation - New quality emerges
    bubblesRef.current.forEach((bubble, index) => {
      if (bubble) {
        masterTL.to(
          bubble,
          {
            scale: 1.5,
            opacity: 1,
            y: -50 - index * 20,
            duration: 2,
            ease: "power2.out",
            delay: index * 0.15,
          },
          "steaming"
        );
      }
    });

    masterTL
      .to(
        steamRef.current,
        {
          opacity: 1,
          scale: 1,
          y: -30,
          duration: 3,
          ease: "power2.out",
        },
        "steaming"
      )
      .to(
        waterRef.current,
        {
          scaleY: 0.7,
          duration: 3,
          ease: "power2.inOut",
        },
        "steaming"
      );

    // Continuous steam movement
    gsap.to(steamRef.current.children, {
      y: -20,
      x: "random(-10, 10)",
      opacity: "random(0.3, 0.8)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: "power2.inOut",
    });

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToBubblesRef = (el: HTMLDivElement | null) => {
    if (el && !bubblesRef.current.includes(el)) {
      bubblesRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-80 flex items-center justify-center'
      style={{ perspective: "1500px", perspectiveOrigin: "center center" }}
    >
      {/* Container/Beaker */}
      <div
        className='relative w-32 h-48 border-4 border-gray-400 border-t-0 rounded-b-3xl bg-gradient-to-t from-gray-200 to-transparent transform-gpu preserve-3d'
        style={{
          boxShadow:
            "0 30px 60px rgba(0,0,0,0.3), inset 0 5px 15px rgba(255,255,255,0.2)",
          filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.15))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Water */}
        <div
          ref={waterRef}
          className='absolute bottom-0 left-0 right-0 h-40 rounded-b-3xl transform-gpu'
          style={{
            background: "linear-gradient(to top, #1e40af, #3b82f6, #60a5fa)",
            transformOrigin: "bottom",
            boxShadow:
              "inset 0 5px 15px rgba(255,255,255,0.2), inset 0 -5px 15px rgba(0,0,0,0.1)",
            filter: "drop-shadow(0 5px 10px rgba(30, 64, 175, 0.3))",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Water surface ripples */}
          <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse'></div>
        </div>

        {/* Bubbles */}
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={`bubble-${i}`}
              ref={addToBubblesRef}
              className='absolute w-3 h-3 bg-gradient-to-br from-blue-200 to-blue-400 rounded-full shadow-lg transform-gpu'
              style={{
                left: `${-20 + (i % 4) * 10}px`,
                bottom: `${(i % 3) * 15}px`,
                opacity: 0.7,
              }}
            >
              {/* Bubble highlight */}
              <div className='absolute top-0 left-1 w-1 h-1 bg-white rounded-full opacity-80'></div>
            </div>
          ))}
        </div>

        {/* Steam */}
        <div
          ref={steamRef}
          className='absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0'
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`steam-${i}`}
              className='absolute w-4 h-8 bg-gradient-to-t from-gray-300 to-transparent rounded-full opacity-60 transform-gpu'
              style={{
                left: `${-15 + i * 4}px`,
                top: `${-i * 3}px`,
                filter: "blur(2px)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Thermometer */}
      <div className='absolute right-8 top-8 w-6 h-48 bg-gray-300 rounded-full shadow-lg'>
        <div
          ref={thermometerRef}
          className='absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-32 bg-gradient-to-t from-blue-500 to-blue-400 rounded-full transform-gpu'
          style={{ transformOrigin: "bottom" }}
        />
        {/* Thermometer bulb */}
        <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg'></div>

        {/* Temperature markings */}
        {[0, 25, 50, 75, 100].map((temp, i) => (
          <div
            key={temp}
            className='absolute right-8 text-xs font-bold text-gray-700'
            style={{ top: `${85 - i * 20}%` }}
          >
            {temp}°C
          </div>
        ))}
      </div>

      {/* Temperature Display */}
      <div className='absolute top-4 left-4'>
        <div className='bg-black text-green-400 px-4 py-2 rounded-lg font-mono text-xl shadow-lg border-2 border-green-400'>
          <span ref={temperatureRef}>25°C</span>
        </div>
      </div>

      {/* Heat Source */}
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-8'>
        {/* Flame effect */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`flame-${i}`}
            className='absolute bottom-0 w-2 h-6 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse transform-gpu'
            style={{
              left: `${15 + i * 12}px`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: "1s",
              transform: `scaleY(${0.8 + Math.random() * 0.4})`,
            }}
          />
        ))}
      </div>

      {/* Phase Indicators */}
      <div className='absolute top-4 right-4 space-y-2'>
        <div className='px-3 py-1 bg-blue-500 text-white text-xs rounded-full shadow-lg'>
          Lượng thay đổi
        </div>
        <div
          className='px-3 py-1 bg-red-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "8s" }}
        >
          Chất thay đổi!
        </div>
        <div
          className='px-3 py-1 bg-gray-500 text-white text-xs rounded-full shadow-lg animate-pulse'
          style={{ animationDelay: "10s" }}
        >
          Trạng thái mới
        </div>
      </div>

      {/* Energy particles */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-orange-400 rounded-full animate-ping'
            style={{
              bottom: `${20 + Math.random() * 40}%`,
              left: `${40 + Math.random() * 20}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaterPhaseAnimation;
