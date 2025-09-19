import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";

const TeamCompetitionAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playersRef = useRef<HTMLDivElement[]>([]);
  const tacticsRef = useRef<HTMLDivElement>(null);
  const competitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !tacticsRef.current) return;

    const masterTL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    // Initial positions - players scattered
    playersRef.current.forEach((player, index) => {
      if (player) {
        gsap.set(player, {
          x: Math.random() * 200 - 100,
          y: Math.random() * 100 - 50,
          scale: 0.8,
        });
      }
    });

    // Phase 1: Internal competition begins
    masterTL.to(competitionRef.current, {
      opacity: 1,
      scale: 1.2,
      duration: 1,
      ease: "power2.out",
    });

    // Players start competing for positions
    playersRef.current.forEach((player, index) => {
      if (player) {
        masterTL.to(
          player,
          {
            x: Math.sin(index * 2) * 60,
            y: Math.cos(index * 2) * 40,
            scale: 1 + Math.random() * 0.3,
            rotationZ: Math.random() * 20 - 10,
            duration: 2,
            ease: "power2.inOut",
            delay: index * 0.2,
          },
          "competition"
        );
      }
    });

    // Phase 2: Conflict intensifies
    masterTL.to(playersRef.current, {
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut",
      stagger: 0.1,
    });

    // Phase 3: Resolution - better formation emerges
    playersRef.current.forEach((player, index) => {
      if (player) {
        const angle = (index * 360) / playersRef.current.length;
        const radius = 80;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        masterTL.to(
          player,
          {
            x: x,
            y: y,
            scale: 1,
            rotationZ: 0,
            duration: 2,
            ease: "back.out(1.7)",
            delay: index * 0.1,
          },
          "formation"
        );
      }
    });

    // Phase 4: New tactics emerge
    masterTL.to(
      tacticsRef.current,
      {
        opacity: 1,
        scale: 1,
        rotationZ: 360,
        duration: 2,
        ease: "power2.out",
      },
      "formation"
    );

    // Continuous team coordination
    gsap.to(playersRef.current, {
      y: "+=10",
      duration: 2,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
      ease: "power2.inOut",
      delay: 6,
    });

    return () => {
      masterTL.kill();
    };
  }, []);

  const addToPlayersRef = (el: HTMLDivElement | null) => {
    if (el && !playersRef.current.includes(el)) {
      playersRef.current.push(el);
    }
  };

  return (
    <div
      ref={containerRef}
      className='relative w-full h-80 flex items-center justify-center perspective-1000 overflow-hidden'
    >
      {/* Soccer Field Background */}
      <div className='absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl shadow-2xl'>
        {/* Field lines */}
        <div className='absolute inset-4 border-2 border-white rounded-lg opacity-60'>
          <div className='absolute left-1/2 top-0 bottom-0 w-0.5 bg-white transform -translate-x-1/2'></div>
          <div className='absolute left-1/2 top-1/2 w-16 h-16 border-2 border-white rounded-full transform -translate-x-1/2 -translate-y-1/2'></div>
        </div>

        {/* Goal posts */}
        <div className='absolute left-2 top-1/2 w-1 h-12 bg-white transform -translate-y-1/2'></div>
        <div className='absolute right-2 top-1/2 w-1 h-12 bg-white transform -translate-y-1/2'></div>
      </div>

      {/* Team Players */}
      <div className='relative'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`player-${i}`}
            ref={addToPlayersRef}
            className='absolute w-8 h-8 transform-gpu preserve-3d'
          >
            <div className='relative w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg'>
              <div className='absolute inset-1 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full opacity-80'></div>
              {/* Player number */}
              <div className='absolute inset-0 flex items-center justify-center text-white text-xs font-bold'>
                {i + 1}
              </div>

              {/* Player shadow */}
              <div className='absolute top-full left-1/2 w-6 h-2 bg-black rounded-full opacity-20 transform -translate-x-1/2 blur-sm'></div>
            </div>
          </div>
        ))}
      </div>

      {/* Competition Indicator */}
      <div
        ref={competitionRef}
        className='absolute top-8 left-1/2 transform -translate-x-1/2 opacity-0'
      >
        <div className='px-4 py-2 bg-red-500 text-white rounded-full shadow-lg animate-pulse'>
          ⚔️ Cạnh tranh vị trí
        </div>
      </div>

      {/* Tactical Formation Lines */}
      <div
        ref={tacticsRef}
        className='absolute inset-0 opacity-0 pointer-events-none'
      >
        <svg width='100%' height='100%' className='absolute inset-0'>
          <defs>
            <linearGradient
              id='tacticGradient'
              x1='0%'
              y1='0%'
              x2='100%'
              y2='100%'
            >
              <stop offset='0%' stopColor='#3b82f6' stopOpacity='0.6' />
              <stop offset='100%' stopColor='#1d4ed8' stopOpacity='0.8' />
            </linearGradient>
          </defs>

          {/* Formation lines connecting players */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`line-${i}`}
              x1='50%'
              y1='50%'
              x2={`${50 + Math.cos((i * 72 * Math.PI) / 180) * 25}%`}
              y2={`${50 + Math.sin((i * 72 * Math.PI) / 180) * 25}%`}
              stroke='url(#tacticGradient)'
              strokeWidth='2'
              strokeDasharray='5,5'
              className='animate-pulse'
            />
          ))}
        </svg>
      </div>

      {/* Soccer Ball */}
      <div className='absolute w-6 h-6 bg-gradient-to-br from-white to-gray-300 rounded-full shadow-lg animate-bounce'>
        <div className='absolute inset-0 bg-gradient-to-br from-transparent to-gray-400 rounded-full opacity-30'></div>
        {/* Ball pattern */}
        <div className='absolute top-1 left-1 w-1 h-1 bg-black rounded-full'></div>
        <div className='absolute bottom-1 right-1 w-1 h-1 bg-black rounded-full'></div>
      </div>

      {/* Conflict Visualization */}
      <div className='absolute inset-0 pointer-events-none'>
        {/* Tension lines between players */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`tension-${i}`}
            className='absolute w-16 h-0.5 bg-gradient-to-r from-red-400 to-orange-500 rounded-full opacity-60 animate-pulse'
            style={{
              top: `${40 + Math.random() * 20}%`,
              left: `${30 + Math.random() * 40}%`,
              transform: `rotate(${Math.random() * 180}deg)`,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Energy particles showing development */}
      <div className='absolute inset-0 pointer-events-none'>
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`energy-${i}`}
            className='absolute w-1 h-1 bg-yellow-400 rounded-full animate-ping'
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: "2s",
            }}
          />
        ))}
      </div>

      {/* Process Stages */}
      <div className='absolute bottom-4 left-4 space-y-1'>
        <div className='px-2 py-1 bg-red-500 text-white text-xs rounded-full shadow animate-pulse'>
          Mâu thuẫn
        </div>
        <div
          className='px-2 py-1 bg-orange-500 text-white text-xs rounded-full shadow animate-pulse'
          style={{ animationDelay: "2s" }}
        >
          Đấu tranh
        </div>
        <div
          className='px-2 py-1 bg-green-500 text-white text-xs rounded-full shadow animate-pulse'
          style={{ animationDelay: "4s" }}
        >
          Chiến thuật mới
        </div>
      </div>

      {/* Result Indicator */}
      <div className='absolute bottom-4 right-4 px-3 py-2 bg-blue-600 text-white rounded-lg shadow-lg'>
        <div className='flex items-center space-x-2'>
          <span className='text-lg'>⚽</span>
          <span className='text-sm font-bold'>Đội bóng mạnh hơn</span>
        </div>
      </div>

      {/* Coach/Strategy indicator */}
      <div className='absolute top-4 right-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full shadow-lg flex items-center justify-center animate-pulse'>
        <span className='text-white text-lg'>👨‍💼</span>
      </div>
    </div>
  );
};

export default TeamCompetitionAnimation;
