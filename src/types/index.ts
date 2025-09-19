// Parallax effect configuration
export interface ParallaxConfig {
  speed?: number;
  translateY?: [number, number];
  translateX?: [number, number];
  scale?: [number, number];
  opacity?: [number, number];
}

// Quiz interfaces
export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
}

export interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  selectedAnswers: Record<number, string>;
  score: number;
  isStarted: boolean;
  isCompleted: boolean;
  showResults: boolean;
}

export type AnswerOption = "A" | "B" | "C" | "D";
