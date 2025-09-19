import React, { useEffect, useRef } from "react";
import { gsap } from "../../hooks/useGSAP";
import type { QuizQuestion, AnswerOption } from "../../types";
import { getScoreMessage } from "../../utils/quizUtils";

interface QuizResultsProps {
  score: number;
  total: number;
  questions: QuizQuestion[];
  selectedAnswers: Record<number, string>;
  onRestart: () => void;
}

const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  total,
  questions,
  selectedAnswers,
  onRestart,
}) => {
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resultsRef.current) return;

    const elements = resultsRef.current.querySelectorAll(".animate-in");

    gsap.fromTo(
      elements,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Animate score counter
    const scoreElement = resultsRef.current.querySelector(".score-counter");
    if (scoreElement) {
      const scoreObj = { value: 0 };
      gsap.to(scoreObj, {
        value: score,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
          if (scoreElement) {
            scoreElement.textContent = Math.round(scoreObj.value).toString();
          }
        },
      });
    }
  }, [score]);

  const percentage = (score / total) * 100;
  const message = getScoreMessage(score, total);

  return (
    <div ref={resultsRef} className='space-y-8'>
      {/* Score Card */}
      <div className='animate-in bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl p-12 border-2 border-green-200 text-center'>
        <div className='text-6xl mb-6'>
          {percentage >= 80 ? "🎉" : percentage >= 60 ? "👏" : "📚"}
        </div>
        <h3 className='text-4xl font-bold text-green-800 mb-4'>Kết quả Quiz</h3>
        <div className='text-6xl font-bold text-green-700 mb-2'>
          <span className='score-counter'>0</span>/{total}
        </div>
        <div className='text-2xl text-green-600 mb-6'>
          {Math.round(percentage)}% chính xác
        </div>
        <p className='text-lg text-green-700 max-w-2xl mx-auto'>{message}</p>
      </div>

      {/* Detailed Results */}
      <div className='animate-in bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-200'>
        <h4 className='text-2xl font-bold text-gray-900 mb-6'>
          Chi tiết câu trả lời
        </h4>
        <div className='space-y-4'>
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = userAnswer === question.answer;

            return (
              <div
                key={question.id}
                className={`p-4 rounded-xl border-2 ${
                  isCorrect
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className='flex items-start justify-between mb-2'>
                  <span className='font-semibold text-gray-700'>
                    Câu {index + 1}
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "✓ Đúng" : "✗ Sai"}
                  </span>
                </div>
                <p className='text-gray-800 mb-2'>{question.question}</p>
                <div className='text-sm'>
                  <p
                    className={`${
                      isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    Bạn chọn: {userAnswer} -{" "}
                    {question.options[userAnswer as AnswerOption]}
                  </p>
                  {!isCorrect && (
                    <p className='text-green-700'>
                      Đáp án đúng: {question.answer} -{" "}
                      {question.options[question.answer as AnswerOption]}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className='animate-in flex justify-center space-x-4'>
        <button
          onClick={onRestart}
          className='px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg'
        >
          Làm lại Quiz
        </button>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className='px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-xl hover:from-gray-700 hover:to-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg'
        >
          Về đầu trang
        </button>
      </div>
    </div>
  );
};

export default QuizResults;
