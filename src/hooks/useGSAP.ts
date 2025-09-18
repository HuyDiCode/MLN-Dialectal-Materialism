import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseGSAPScrollOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
}

// Simple hook for GSAP animations
export const useGSAP = () => {
  const elementRef = useRef<HTMLElement>(null);

  return elementRef;
};

// Hook specifically for ScrollTrigger
export const useScrollTrigger = (
  elementRef: React.RefObject<HTMLElement>,
  options: UseGSAPScrollOptions = {}
) => {
  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;

    const st = ScrollTrigger.create({
      trigger: options.trigger || element,
      start: options.start || "top 80%",
      end: options.end || "bottom 20%",
      scrub: options.scrub,
      pin: options.pin,
      markers: options.markers,
      toggleActions: options.toggleActions || "play none none reverse",
      onEnter: options.onEnter,
      onLeave: options.onLeave,
      onEnterBack: options.onEnterBack,
      onLeaveBack: options.onLeaveBack,
      onUpdate: options.onUpdate,
    });

    return () => {
      st.kill();
    };
  }, [elementRef, options]);
};

export { gsap, ScrollTrigger };
