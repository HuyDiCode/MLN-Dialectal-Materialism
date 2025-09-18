import { useState, useEffect, useRef } from "react";
import { gsap } from "../hooks/useGSAP";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const logoRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    "Initializing...",
    "Loading revolutionary concepts...",
    "Preparing dialectical framework...",
    "Setting up interactive timeline...",
    "Finalizing materialist perspective...",
    "Ready to explore!",
  ];

  useEffect(() => {
    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className =
          "absolute w-1 h-1 bg-white rounded-full opacity-30";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";

        particlesRef.current.appendChild(particle);

        // Animate particles
        gsap.to(particle, {
          y: -Math.random() * 200 - 100,
          x: Math.random() * 100 - 50,
          opacity: 0,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          ease: "power2.out",
          delay: Math.random() * 2,
        });
      }
    }

    // Animate logo
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        {
          scale: 0,
          rotation: -180,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
        }
      );

      // Continuous pulsing
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    // Animate container entrance
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current.children,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        }
      );
    }

    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 3 + 1;

        // Update loading text based on progress
        const messageIndex = Math.floor(
          (newProgress / 100) * (loadingMessages.length - 1)
        );
        setLoadingText(
          loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]
        );

        if (newProgress >= 100) {
          clearInterval(interval);
          setLoadingText("Ready to explore!");

          // Exit animation
          setTimeout(() => {
            if (containerRef.current) {
              gsap.to(containerRef.current, {
                scale: 0.9,
                opacity: 0,
                y: -50,
                duration: 0.8,
                ease: "power2.in",
                onComplete: onLoadingComplete,
              });
            }
          }, 800);
          return 100;
        }
        return newProgress;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className='fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center z-50 overflow-hidden'>
      {/* Animated Background Particles */}
      <div
        ref={particlesRef}
        className='absolute inset-0 pointer-events-none'
      ></div>

      {/* Dynamic Background Shapes */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse delay-500'></div>
      </div>

      <div
        ref={containerRef}
        className='text-center text-white relative z-10 max-w-md mx-auto px-6'
      >
        {/* Enhanced Logo */}
        <div ref={logoRef} className='relative mb-12'>
          <div className='w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 mx-auto flex items-center justify-center shadow-2xl shadow-purple-500/30 border-4 border-white/20 relative overflow-hidden'>
            {/* Shimmer effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer'></div>

            <div className='text-3xl font-bold text-white relative z-10'>
              DM
            </div>

            {/* Floating particles around logo */}
            <div className='absolute -top-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce opacity-80'></div>
            <div className='absolute -bottom-2 -left-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60'></div>
            <div className='absolute top-2 -left-3 w-1 h-1 bg-white rounded-full animate-ping opacity-70'></div>
          </div>

          {/* Orbital rings */}
          <div className='absolute inset-0 w-32 h-32 mx-auto'>
            <div
              className='absolute inset-0 rounded-full border border-white/10 animate-spin'
              style={{ animationDuration: "8s" }}
            ></div>
            <div
              className='absolute inset-2 rounded-full border border-purple-400/20 animate-spin'
              style={{
                animationDuration: "12s",
                animationDirection: "reverse",
              }}
            ></div>
          </div>
        </div>

        {/* Title with enhanced typography */}
        <h2 className='text-4xl md:text-5xl font-bold mb-4 text-gradient-animate'>
          Dialectical Materialism
        </h2>

        <p className='text-xl md:text-2xl text-blue-200 mb-8 leading-relaxed'>
          Preparing your journey through
          <span className='block font-semibold text-purple-300'>
            revolutionary ideas
          </span>
        </p>

        {/* Enhanced Progress Bar */}
        <div className='relative mb-6'>
          <div className='w-80 h-3 bg-white/10 rounded-full mx-auto mb-4 overflow-hidden backdrop-blur-sm border border-white/20 shadow-lg'>
            <div
              className='h-full bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden'
              style={{ width: `${loadingProgress}%` }}
            >
              {/* Shimmer effect on progress bar */}
              <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer'></div>
            </div>
          </div>

          {/* Progress percentage */}
          <div className='flex justify-between items-center text-sm text-white/80'>
            <span>{loadingText}</span>
            <span className='font-mono text-lg font-bold text-purple-300'>
              {Math.round(loadingProgress)}%
            </span>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className='flex justify-center space-x-2 mt-6'>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className='w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-70'
              style={{
                animationDelay: `${i * 0.2}s`,
                animationDuration: "1s",
              }}
            ></div>
          ))}
        </div>

        {/* Inspirational quote */}
        <div className='mt-8 text-center opacity-60'>
          <p className='text-sm italic text-purple-200'>
            "The philosophers have only interpreted the world in various ways;
            <br />
            the point is to change it." - Karl Marx
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
