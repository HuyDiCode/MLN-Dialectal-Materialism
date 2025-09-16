import { useState, useEffect } from "react";
import { Parallax } from "react-scroll-parallax";
import "./FloatingNav.css";

const FloatingNav: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const heroSection = document.querySelector(".hero-section");
          const timelineSection = document.querySelector(".timeline-section");

          if (heroSection && timelineSection) {
            const heroBottom = heroSection.getBoundingClientRect().bottom;
            const timelineTop = timelineSection.getBoundingClientRect().top;

            if (heroBottom > window.innerHeight / 2) {
              setActiveSection("hero");
            } else if (timelineTop < window.innerHeight / 2) {
              setActiveSection("timeline");
            }
          }

          // Show/hide navigation based on scroll position
          if (window.pageYOffset > 300) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(
      sectionId === "hero" ? "root" : "timeline-section"
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Navigation Dots */}
      <div
        className={`floating-nav ${isVisible ? "floating-nav--visible" : ""}`}
      >
        <div className='nav-dots'>
          <button
            className={`nav-dot ${
              activeSection === "hero" ? "nav-dot--active" : ""
            }`}
            onClick={() => scrollToSection("hero")}
            aria-label='Go to hero section'
          >
            <span className='nav-dot__tooltip'>Hero</span>
          </button>
          <button
            className={`nav-dot ${
              activeSection === "timeline" ? "nav-dot--active" : ""
            }`}
            onClick={() => scrollToSection("timeline")}
            aria-label='Go to timeline section'
          >
            <span className='nav-dot__tooltip'>Timeline</span>
          </button>
        </div>
      </div>

      {/* Back to Top Button */}
      <Parallax speed={-1}>
        <button
          className={`back-to-top ${isVisible ? "back-to-top--visible" : ""}`}
          onClick={scrollToTop}
          aria-label='Back to top'
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
      </Parallax>
    </>
  );
};

export default FloatingNav;
