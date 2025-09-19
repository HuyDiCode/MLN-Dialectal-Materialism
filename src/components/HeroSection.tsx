import React, { useEffect, useRef, useState } from "react";
import { gsap } from "../hooks/useGSAP";
import "../assets/fonts.css";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create floating particles
    if (particlesRef.current) {
      const particles = [];
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        particle.className =
          "particle absolute rounded-full pointer-events-none";
        particle.style.width = Math.random() * 4 + 2 + "px";
        particle.style.height = particle.style.width;
        particle.style.background = `linear-gradient(45deg, 
          rgba(147, 51, 234, ${Math.random() * 0.5 + 0.1}), 
          rgba(79, 70, 229, ${Math.random() * 0.5 + 0.1}))`;
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 100 + "%";

        particlesRef.current.appendChild(particle);
        particles.push(particle);

        // Animate particles
        gsap.to(particle, {
          y: -Math.random() * 100 - 50,
          x: Math.random() * 100 - 50,
          duration: Math.random() * 20 + 10,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: Math.random() * 2,
        });

        gsap.to(particle, {
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }

    // Enhanced initial animation
    const tl = gsap.timeline();

    // Animate title with more dramatic effects
    tl.fromTo(
      titleRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotationX: 45,
        transformPerspective: 1000,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.5,
        ease: "power4.out",
      }
    )
      .fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
          filter: "blur(10px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
        },
        "-=1"
      )
      .fromTo(
        buttonRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
          rotationY: 180,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 1,
          ease: "back.out(2)",
        },
        "-=0.8"
      );

    // Enhanced parallax effects
    gsap.to(titleRef.current, {
      y: -120,
      rotationX: -5,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(subtitleRef.current, {
      y: -60,
      opacity: 0.7,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(buttonRef.current, {
      y: -30,
      scale: 0.95,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToTimeline = () => {
    const timelineElement = document.getElementById("timeline-section");
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className='min-h-screen w-full relative overflow-hidden'
    >
      {/* Animated Particles Background */}
      <div ref={particlesRef} className='absolute inset-0 z-0'></div>

      {/* Dynamic Gradient Overlay */}
      <div
        className='absolute inset-0 z-1 transition-all duration-1000 ease-out'
        style={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(147, 51, 234, 0.15) 0%, 
              rgba(79, 70, 229, 0.1) 30%, 
              transparent 70%),
            linear-gradient(135deg, 
              rgba(147, 51, 234, 0.05) 0%, 
              rgba(79, 70, 229, 0.05) 50%, 
              rgba(236, 72, 153, 0.05) 100%)
          `,
        }}
      ></div>

      {/* Morphing Background Shapes */}
      <div className='absolute inset-0 z-1'>
        <div
          className='absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse'
          style={{
            background: "linear-gradient(45deg, #9333ea, #4f46e5)",
            top: "20%",
            left: "10%",
            transform: `translate(${mousePosition.x * 0.02}px, ${
              mousePosition.y * 0.02
            }px)`,
            transition: "transform 0.3s ease-out",
          }}
        ></div>
        <div
          className='absolute w-72 h-72 rounded-full blur-3xl opacity-15 animate-pulse'
          style={{
            background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            bottom: "20%",
            right: "15%",
            transform: `translate(${-mousePosition.x * 0.03}px, ${
              -mousePosition.y * 0.03
            }px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "1s",
          }}
        ></div>
      </div>

      <div className='relative z-10 text-center max-w-5xl mx-auto px-4 flex items-center justify-center min-h-screen text-gray-900'>
        <div>
          <h1
            ref={titleRef}
            className='text-6xl md:text-8xl lg:text-9xl font-bold mb-8 custom-font relative'
            style={{
              willChange: "transform",
              textShadow: "0 0 30px rgba(147, 51, 234, 0.3)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <span className='inline-block hover:scale-105 transition-transform duration-300'>
              Dialectical
            </span>
            <span
              className={`block text-transparent bg-clip-text transition-all duration-500 ${
                isHovered
                  ? "bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600"
              }`}
            >
              <span className='inline-block hover:scale-105 transition-transform duration-300 delay-100'>
                Materialism
              </span>
            </span>

            {/* Floating accent elements */}
            <div className='absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-60 animate-bounce'></div>
            <div className='absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-40 animate-pulse'></div>
          </h1>

          <p
            ref={subtitleRef}
            className='text-xl md:text-2xl lg:text-3xl mb-12 text-gray-700 leading-relaxed max-w-4xl mx-auto'
            style={{
              willChange: "transform",
              textShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            A Journey Through Revolutionary Ideas and Transformative Moments
            <span className='block text-lg md:text-xl text-purple-600 mt-2 font-medium'>
              Khám phá triết học qua góc nhìn hiện đại
            </span>
          </p>

          <button
            ref={buttonRef}
            onClick={scrollToTimeline}
            className='group relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full px-10 py-5 transition-all duration-500 shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 hover:-translate-y-1 overflow-hidden'
            style={{ willChange: "transform" }}
          >
            {/* Button background animation */}
            <div className='absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            {/* Button content */}
            <div className='relative z-10 flex items-center'>
              <span className='text-lg md:text-xl font-semibold mr-3'>
                Khám phá câu chuyện
              </span>
              <div className='relative'>
                <svg
                  className='w-6 h-6 group-hover:translate-y-1 transition-transform duration-300'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  />
                </svg>
                {/* Animated arrow trail */}
                <svg
                  className='w-6 h-6 absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 delay-100'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1}
                    d='M19 14l-7 7m0 0l-7-7m7 7V3'
                  />
                </svg>
              </div>
            </div>

            {/* Ripple effect */}
            <div className='absolute inset-0 rounded-full bg-white opacity-0 group-hover:animate-ping'></div>
          </button>

          {/* Scroll indicator */}
          <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
            <div className='w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center'>
              <div className='w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
