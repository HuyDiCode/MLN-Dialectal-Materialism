import { useEffect, useRef } from "react";
import { gsap } from "../hooks/useGSAP";

const FloatingNav: React.FC = () => {
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Placeholder for scroll handling
    };

    // GSAP animation for back-to-top button parallax
    if (backToTopRef.current) {
      gsap.to(backToTopRef.current, {
        y: 25,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      });

      // Hover animation
      const button = backToTopRef.current;
      const handleMouseEnter = () => {
        gsap.to(button, {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(
      sectionId === "hero" ? "root" : "timeline-section"
    );
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
      {/* Navigation Dots */}
      <div className='fixed right-8 top-1/2 transform -translate-y-1/2 z-50'>
        <div className='flex flex-col space-y-4'>
          <button
            onClick={() => scrollToSection("hero")}
            aria-label='Go to hero section'
            className='group relative'
          >
            <div className='w-3 h-3 bg-white/50 rounded-full transition-all duration-300 group-hover:bg-white group-hover:scale-125'></div>
            <span className='absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
              Hero
            </span>
          </button>
          <button
            onClick={() => scrollToSection("timeline")}
            aria-label='Go to timeline section'
            className='group relative'
          >
            <div className='w-3 h-3 bg-white/50 rounded-full transition-all duration-300 group-hover:bg-white group-hover:scale-125'></div>
            <span className='absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/80 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap'>
              Timeline
            </span>
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        aria-label='Back to top'
        className='fixed bottom-8 right-8 w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 z-50'
        style={{ willChange: "transform" }}
      >
        <svg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M18 15L12 9L6 15'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </>
  );
};

export default FloatingNav;
