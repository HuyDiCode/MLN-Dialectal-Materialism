import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";
import type {
  QuizQuestion as QuizQuestionType,
  AnswerOption,
} from "../../types";

interface QuizQuestionProps {
  question: QuizQuestionType;
  selectedAnswer?: string;
  onSelectAnswer: (questionId: number, answer: AnswerOption) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isLastQuestion,
}) => {
  const questionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!questionRef.current) return;

    const elements = questionRef.current.querySelectorAll(".animate-in");

    gsap.fromTo(
      elements,
      {
        y: 50,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, [question.id]);

  const handleAnswerSelect = (answer: AnswerOption) => {
    onSelectAnswer(question.id, answer);
  };

  const optionLabels: AnswerOption[] = ["A", "B", "C", "D"];

  return (
    <div
      ref={questionRef}
      className='bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200'
    >
      {/* Question */}
      <div className='animate-in mb-8'>
        <h3 className='text-2xl md:text-3xl font-bold text-gray-900 leading-relaxed'>
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className='space-y-4 mb-8'>
        {optionLabels.map((label) => (
          <button
            key={label}
            onClick={() => handleAnswerSelect(label)}
            className={`animate-in w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-102 hover:-translate-y-1 ${
              selectedAnswer === label
                ? "border-purple-500 bg-purple-50 shadow-lg"
                : "border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-25"
            }`}
          >
            <div className='flex items-start'>
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${
                  selectedAnswer === label
                    ? "bg-purple-500 text-white"
                    : "bg-gray-300 text-gray-700"
                }`}
              >
                {label}
              </span>
              <p className='text-gray-800 leading-relaxed'>
                {question.options[label]}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      {selectedAnswer && (
        <div className='animate-in flex justify-end'>
          <button
            onClick={onNext}
            className='px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg'
          >
            {isLastQuestion ? "Hoàn thành" : "Câu tiếp theo"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
