import { useEffect, useRef, useState } from "react";
import { gsap } from "../hooks/useGSAP";

const FloatingNav: React.FC = () => {
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Enhanced scroll handling with section detection
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;

      // Show/hide navigation based on scroll
      setIsVisible(scrollY > windowHeight * 0.3);

      // Detect active section
      const theoryElement = document.getElementById("theory-section");
      const timelineElement = document.getElementById("timeline-section");
      const quizElement = document.getElementById("quiz-section");

      if (quizElement && timelineElement && theoryElement) {
        const theoryTop = theoryElement.offsetTop;
        const timelineTop = timelineElement.offsetTop;
        const quizTop = quizElement.offsetTop;

        if (scrollY >= quizTop - windowHeight * 0.5) {
          setActiveSection("quiz");
        } else if (scrollY >= timelineTop - windowHeight * 0.5) {
          setActiveSection("timeline");
        } else if (scrollY >= theoryTop - windowHeight * 0.5) {
          setActiveSection("theory");
        } else {
          setActiveSection("hero");
        }
      }
    };

    // Mouse tracking for magnetic effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    // Enhanced GSAP animations
    if (backToTopRef.current && navRef.current) {
      // Parallax effect for back-to-top button
      gsap.to(backToTopRef.current, {
        y: 30,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Navigation dots entrance animation
      gsap.fromTo(
        navRef.current.children,
        {
          x: 100,
          opacity: 0,
          scale: 0.5,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 1,
        }
      );

      // Floating animation for navigation
      gsap.to(navRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Enhanced hover animations for back-to-top button
      const button = backToTopRef.current;
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.15,
          rotation: 360,
          duration: 0.5,
          ease: "back.out(2)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("mousemove", handleMouseMove, { passive: true });

      // Initial scroll check
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    let targetId = "root";
    if (sectionId === "theory") {
      targetId = "theory-section";
    } else if (sectionId === "timeline") {
      targetId = "timeline-section";
    } else if (sectionId === "quiz") {
      targetId = "quiz-section";
    }

    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Enhanced Navigation Dots */}
      <div
        ref={navRef}
        className={`fixed right-8 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
      >
        <div className='flex flex-col space-y-6 p-4 bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl'>
          {/* Hero Section Button */}
          <button
            onClick={() => scrollToSection("hero")}
            aria-label='Go to hero section'
            className='group relative'
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 transform group-hover:scale-150 ${
                activeSection === "hero"
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 scale-125 shadow-lg shadow-purple-500/50"
                  : "bg-gray-600 group-hover:bg-gray-800"
              }`}
              style={{
                boxShadow:
                  activeSection === "hero"
                    ? "0 0 20px rgba(147, 51, 234, 0.6)"
                    : "none",
              }}
            >
              {activeSection === "hero" && (
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 animate-ping'></div>
              )}
            </div>

            {/* Enhanced tooltip */}
            <div className='absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
              <div className='bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xl whitespace-nowrap border border-white/20'>
                <span>🏠 Hero</span>
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-purple-600 rotate-45'></div>
              </div>
            </div>

            {/* Magnetic effect indicator */}
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-indigo-400/20 scale-0 group-hover:scale-300 transition-transform duration-500'></div>
          </button>

          {/* Theory Section Button */}
          <button
            onClick={() => scrollToSection("theory")}
            aria-label='Go to theory section'
            className='group relative'
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 transform group-hover:scale-150 ${
                activeSection === "theory"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 scale-125 shadow-lg shadow-indigo-500/50"
                  : "bg-gray-600 group-hover:bg-gray-800"
              }`}
              style={{
                boxShadow:
                  activeSection === "theory"
                    ? "0 0 20px rgba(99, 102, 241, 0.6)"
                    : "none",
              }}
            >
              {activeSection === "theory" && (
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 animate-ping'></div>
              )}
            </div>

            {/* Enhanced tooltip */}
            <div className='absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
              <div className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xl whitespace-nowrap border border-white/20'>
                <span>🧠 Lý thuyết</span>
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-indigo-600 rotate-45'></div>
              </div>
            </div>

            {/* Magnetic effect indicator */}
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 scale-0 group-hover:scale-300 transition-transform duration-500'></div>
          </button>

          {/* Timeline Section Button */}
          <button
            onClick={() => scrollToSection("timeline")}
            aria-label='Go to timeline section'
            className='group relative'
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 transform group-hover:scale-150 ${
                activeSection === "timeline"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 scale-125 shadow-lg shadow-blue-500/50"
                  : "bg-gray-600 group-hover:bg-gray-800"
              }`}
              style={{
                boxShadow:
                  activeSection === "timeline"
                    ? "0 0 20px rgba(59, 130, 246, 0.6)"
                    : "none",
              }}
            >
              {activeSection === "timeline" && (
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 animate-ping'></div>
              )}
            </div>

            {/* Enhanced tooltip */}
            <div className='absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xl whitespace-nowrap border border-white/20'>
                <span>📚 Timeline</span>
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-blue-600 rotate-45'></div>
              </div>
            </div>

            {/* Magnetic effect indicator */}
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 scale-0 group-hover:scale-300 transition-transform duration-500'></div>
          </button>

          {/* Quiz Section Button */}
          <button
            onClick={() => scrollToSection("quiz")}
            aria-label='Go to quiz section'
            className='group relative'
          >
            <div
              className={`w-4 h-4 rounded-full transition-all duration-500 transform group-hover:scale-150 ${
                activeSection === "quiz"
                  ? "bg-gradient-to-r from-green-500 to-blue-500 scale-125 shadow-lg shadow-green-500/50"
                  : "bg-gray-600 group-hover:bg-gray-800"
              }`}
              style={{
                boxShadow:
                  activeSection === "quiz"
                    ? "0 0 20px rgba(34, 197, 94, 0.6)"
                    : "none",
              }}
            >
              {activeSection === "quiz" && (
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-400 animate-ping'></div>
              )}
            </div>

            {/* Enhanced tooltip */}
            <div className='absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none'>
              <div className='bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-xl whitespace-nowrap border border-white/20'>
                <span>🧠 Quiz</span>
                <div className='absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-green-600 rotate-45'></div>
              </div>
            </div>

            {/* Magnetic effect indicator */}
            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 scale-0 group-hover:scale-300 transition-transform duration-500'></div>
          </button>
        </div>
      </div>

      {/* Enhanced Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        aria-label='Back to top'
        className={`fixed bottom-8 right-8 w-14 h-14 bg-white/20 backdrop-blur-lg border border-gray-300/50 rounded-2xl flex items-center justify-center text-gray-700 hover:bg-white/30 hover:text-gray-900 transition-all duration-500 z-50 shadow-2xl group ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ willChange: "transform" }}
      >
        {/* Animated background */}
        <div className='absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

        {/* Button content */}
        <div className='relative z-10 flex flex-col items-center'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='group-hover:-translate-y-1 transition-transform duration-300'
          >
            <path
              d='M18 15L12 9L6 15'
              stroke='currentColor'
              strokeWidth='2.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>

          {/* Animated trail */}
          <svg
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 group-hover:-translate-y-2 transition-all duration-300 delay-100'
          >
            <path
              d='M18 15L12 9L6 15'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </div>

        {/* Ripple effect */}
        <div className='absolute inset-0 rounded-2xl bg-white/20 scale-0 group-hover:scale-110 group-hover:opacity-0 transition-all duration-500'></div>

        {/* Floating particles */}
        <div className='absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-bounce group-hover:animate-ping'></div>
        <div className='absolute -bottom-1 -left-1 w-1 h-1 bg-indigo-400 rounded-full opacity-40 animate-pulse delay-500'></div>
      </button>
    </>
  );
};

export default FloatingNav;
