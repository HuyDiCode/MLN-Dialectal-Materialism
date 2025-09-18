import React, { useEffect, useRef } from "react";
import { gsap } from "../hooks/useGSAP";
import "../assets/fonts.css";

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Initial animation on mount
    const tl = gsap.timeline();

    // Animate title, subtitle, and button in sequence
    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(
        buttonRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
        "-=0.6"
      );

    // Parallax effect on scroll
    gsap.to(titleRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(subtitleRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(buttonRef.current, {
      y: -25,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, []);

  const scrollToTimeline = () => {
    const timelineElement = document.getElementById("timeline-section");
    if (timelineElement) {
      timelineElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section ref={heroRef} className='min-h-screen w-full relative'>
      <div className='relative z-10 text-center max-w-4xl mx-auto px-4 flex items-center justify-center min-h-screen text-gray-900'>
        <div>
          <h1
            ref={titleRef}
            className='text-6xl md:text-8xl font-bold mb-6 custom-font'
            style={{ willChange: "transform" }}
          >
            Dialectical
            <span className='block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600'>
              Materialism
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className='text-xl md:text-2xl mb-8 text-gray-700'
            style={{ willChange: "transform" }}
          >
            A Journey Through Revolutionary Ideas and Transformative Moments
          </p>

          <button
            ref={buttonRef}
            onClick={scrollToTimeline}
            className='bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-4 transition-all duration-300 group shadow-lg'
            style={{ willChange: "transform" }}
          >
            <span className='text-lg font-medium'>Khám phá câu chuyện</span>
            <svg
              className='w-6 h-6 ml-2 inline-block group-hover:translate-y-1 transition-transform duration-300'
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
