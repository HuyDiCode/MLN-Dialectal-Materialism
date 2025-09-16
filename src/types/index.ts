// Timeline data structure types
export interface TimelineMilestone {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  imageAlt: string;
  position: 'left' | 'right';
}

// Parallax effect configuration
export interface ParallaxConfig {
  speed?: number;
  translateY?: [number, number];
  translateX?: [number, number];
  scale?: [number, number];
  opacity?: [number, number];
}
