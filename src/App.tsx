import { useState, useEffect, useRef } from "react";
import LoadingScreen from "./components/LoadingScreen";
import HeroSection from "./components/HeroSection";
import TheorySection from "./components/TheorySection";
import TimelineSection from "./components/TimelineSection";
import QuizSection from "./components/quiz/QuizSection";
import FloatingNav from "./components/FloatingNav";
import { gsap } from "./hooks/useGSAP";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const backgroundRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    // Mouse tracking for interactive background
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Animated grid squares
    if (gridRef.current && !isLoading) {
      const gridSquares = gridRef.current.querySelectorAll(".grid-square");

      gridSquares.forEach((square, index) => {
        // Random floating animation
        gsap.to(square, {
          y: Math.random() * 20 - 10,
          x: Math.random() * 20 - 10,
          rotation: Math.random() * 360,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.1,
        });

        // Opacity pulsing
        gsap.to(square, {
          opacity: Math.random() * 0.3 + 0.1,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });
      });
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <div className='min-h-screen w-full bg-white relative overflow-hidden'>
        {/* Enhanced Dynamic Background System */}
        <div
          ref={backgroundRef}
          className='fixed inset-0 z-0'
          style={{
            background: `
              linear-gradient(to right, rgba(240, 240, 240, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(240, 240, 240, 0.3) 1px, transparent 1px),
              radial-gradient(circle 1200px at ${mousePosition.x}% ${mousePosition.y}%, 
                rgba(147, 51, 234, 0.08) 0%, 
                rgba(79, 70, 229, 0.05) 30%, 
                rgba(236, 72, 153, 0.03) 60%, 
                transparent 100%),
              linear-gradient(135deg, 
                rgba(147, 51, 234, 0.02) 0%, 
                rgba(79, 70, 229, 0.015) 25%, 
                rgba(236, 72, 153, 0.01) 50%, 
                rgba(59, 130, 246, 0.015) 75%, 
                rgba(147, 51, 234, 0.02) 100%)
            `,
            backgroundSize: "120px 80px, 120px 80px, 100% 100%, 100% 100%",
            transition: "background 0.3s ease-out",
          }}
        />

        {/* Animated Grid Overlay */}
        <div
          ref={gridRef}
          className='fixed inset-0 z-1 pointer-events-none'
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {/* Generate animated grid squares */}
          {Array.from({ length: 20 }, (_, i) => (
            <div
              key={i}
              className='grid-square absolute w-2 h-2 rounded-full'
              style={{
                background: `linear-gradient(45deg, 
                  ${
                    i % 3 === 0
                      ? "rgba(147, 51, 234, 0.1)"
                      : i % 3 === 1
                      ? "rgba(79, 70, 229, 0.1)"
                      : "rgba(236, 72, 153, 0.1)"
                  }, 
                  ${
                    i % 3 === 0
                      ? "rgba(147, 51, 234, 0.05)"
                      : i % 3 === 1
                      ? "rgba(79, 70, 229, 0.05)"
                      : "rgba(236, 72, 153, 0.05)"
                  })`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1,
              }}
            />
          ))}

          {/* Floating geometric shapes */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={`shape-${i}`}
              className='grid-square absolute'
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                background: `linear-gradient(${Math.random() * 360}deg, 
                  rgba(147, 51, 234, 0.05), 
                  rgba(79, 70, 229, 0.03))`,
                borderRadius: i % 2 === 0 ? "50%" : "20%",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.1,
                filter: "blur(1px)",
              }}
            />
          ))}
        </div>

        {/* Interactive Light Rays */}
        <div className='fixed inset-0 z-1 pointer-events-none'>
          <div
            className='absolute w-full h-full opacity-30'
            style={{
              background: `
                conic-gradient(from ${mousePosition.x * 3.6}deg at ${
                mousePosition.x
              }% ${mousePosition.y}%, 
                  transparent 0deg, 
                  rgba(147, 51, 234, 0.03) 60deg, 
                  transparent 120deg, 
                  rgba(79, 70, 229, 0.02) 180deg, 
                  transparent 240deg, 
                  rgba(236, 72, 153, 0.03) 300deg, 
                  transparent 360deg)
              `,
              transition: "background 0.5s ease-out",
            }}
          />
        </div>

        {/* Content with enhanced layering */}
        <div className='relative z-10'>
          <HeroSection />
          <TheorySection />
          <TimelineSection />
          <QuizSection />
          <FloatingNav />
        </div>

        {/* Ambient Lighting Effects */}
        <div className='fixed inset-0 z-5 pointer-events-none'>
          <div
            className='absolute top-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 animate-pulse'
            style={{
              background: "radial-gradient(circle, #9333ea, transparent)",
              transform: `translate(${mousePosition.x * 0.5}px, ${
                mousePosition.y * 0.3
              }px)`,
              transition: "transform 0.8s ease-out",
            }}
          />
          <div
            className='absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-4 animate-pulse'
            style={{
              background: "radial-gradient(circle, #4f46e5, transparent)",
              transform: `translate(${-mousePosition.x * 0.3}px, ${
                -mousePosition.y * 0.4
              }px)`,
              transition: "transform 0.8s ease-out",
              animationDelay: "1s",
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
