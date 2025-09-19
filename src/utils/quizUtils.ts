import type { QuizQuestion } from "../types";

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getRandomQuestions = (
  questions: QuizQuestion[],
  count: number = 10
): QuizQuestion[] => {
  const shuffled = shuffleArray(questions);
  return shuffled.slice(0, Math.min(count, questions.length));
};

export const calculateScore = (
  selectedAnswers: Record<number, string>,
  questions: QuizQuestion[]
): number => {
  let correct = 0;
  questions.forEach((question) => {
    if (selectedAnswers[question.id] === question.answer) {
      correct++;
    }
  });
  return correct;
};

export const getScoreMessage = (score: number, total: number): string => {
  const percentage = (score / total) * 100;

  if (percentage >= 90)
    return "Xuất sắc! Bạn đã nắm vững phép biện chứng duy vật! 🎉";
  if (percentage >= 80) return "Rất tốt! Kiến thức của bạn khá vững vàng! 👏";
  if (percentage >= 70) return "Khá ổn! Bạn cần ôn lại một số khái niệm! 📚";
  if (percentage >= 60) return "Trung bình! Hãy học thêm để hiểu sâu hơn! 💪";
  return "Cần cố gắng hơn! Hãy xem lại timeline và học thêm! 📖";
};
