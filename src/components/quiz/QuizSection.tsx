import React, { useState, useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../../hooks/useGSAP";
import type {
  QuizQuestion as QuizQuestionType,
  QuizState,
  AnswerOption,
} from "../../types";
import { getRandomQuestions, calculateScore } from "../../utils/quizUtils";
import quizData from "../../assets/MLN111.json";
import QuizQuestionComponent from "./QuizQuestion";
import QuizResults from "./QuizResults";

const QuizSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: {},
    score: 0,
    isStarted: false,
    isCompleted: false,
    showResults: false,
  });

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    // Header animation
    gsap.fromTo(
      headerRef.current.children,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        stagger: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
          end: "bottom 60%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions(
      quizData as QuizQuestionType[],
      10
    );
    setQuizState({
      questions: randomQuestions,
      currentQuestionIndex: 0,
      selectedAnswers: {},
      score: 0,
      isStarted: true,
      isCompleted: false,
      showResults: false,
    });
  };

  const selectAnswer = (questionId: number, answer: AnswerOption) => {
    setQuizState((prev) => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionId]: answer,
      },
    }));
  };

  const nextQuestion = () => {
    if (quizState.currentQuestionIndex < quizState.questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    } else {
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const finalScore = calculateScore(
      quizState.selectedAnswers,
      quizState.questions
    );
    setQuizState((prev) => ({
      ...prev,
      score: finalScore,
      isCompleted: true,
      showResults: true,
    }));
  };

  const resetQuiz = () => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      selectedAnswers: {},
      score: 0,
      isStarted: false,
      isCompleted: false,
      showResults: false,
    });
  };

  const currentQuestion = quizState.questions[quizState.currentQuestionIndex];
  const progress =
    ((quizState.currentQuestionIndex + 1) / quizState.questions.length) * 100;

  return (
    <div
      ref={sectionRef}
      id='quiz-section'
      className='relative w-full bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20'
    >
      {/* Section Header */}
      <div ref={headerRef} className='relative text-center mb-16'>
        <h2 className='text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 custom-font'>
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600'>
            Kiểm tra kiến thức
          </span>
        </h2>
        <p className='text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto px-4'>
          Thử thách bản thân với 10 câu hỏi ngẫu nhiên về phép biện chứng duy
          vật
        </p>
        <div className='mt-8 flex justify-center'>
          <div className='w-32 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse'></div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className='max-w-4xl mx-auto px-4'>
        {!quizState.isStarted ? (
          // Start Screen
          <div className='text-center'>
            <div className='bg-white rounded-3xl shadow-xl p-12 border-2 border-purple-200'>
              <div className='text-6xl mb-6'>🧠</div>
              <h3 className='text-3xl font-bold text-gray-900 mb-4'>
                Sẵn sàng kiểm tra kiến thức?
              </h3>
              <p className='text-gray-600 text-lg mb-8'>
                Bạn sẽ có 10 câu hỏi ngẫu nhiên từ bộ câu hỏi MLN111
              </p>
              <button
                onClick={startQuiz}
                className='px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg'
              >
                Bắt đầu Quiz
              </button>
            </div>
          </div>
        ) : quizState.showResults ? (
          // Results Screen
          <QuizResults
            score={quizState.score}
            total={quizState.questions.length}
            questions={quizState.questions}
            selectedAnswers={quizState.selectedAnswers}
            onRestart={resetQuiz}
          />
        ) : (
          // Quiz Questions
          <div>
            {/* Progress Bar */}
            <div className='mb-8'>
              <div className='flex justify-between items-center mb-2'>
                <span className='text-sm font-semibold text-purple-600'>
                  Câu hỏi {quizState.currentQuestionIndex + 1} /{" "}
                  {quizState.questions.length}
                </span>
                <span className='text-sm font-semibold text-purple-600'>
                  {Math.round(progress)}%
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-3'>
                <div
                  className='bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Current Question */}
            <QuizQuestionComponent
              question={currentQuestion}
              selectedAnswer={quizState.selectedAnswers[currentQuestion.id]}
              onSelectAnswer={selectAnswer}
              onNext={nextQuestion}
              isLastQuestion={
                quizState.currentQuestionIndex ===
                quizState.questions.length - 1
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;
