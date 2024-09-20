"use client";
import { useEffect, useState } from "react";

const options = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"];

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get('data');

    if (data) {
      setQuizData(JSON.parse(decodeURIComponent(data)));
    }
  }, []);

  const handleAnswerSelect = (answer) => {
    setAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answer;
      return newAnswers;
    });

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("Quiz completed:", answers);
      // use navigate to results or handle it as needed
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {quizData ? (
        <div className="flex flex-col items-center border-2 rounded-lg p-6 w-full max-w-md shadow-sm">
          <h3 className="text-xl mb-4 text-center">{quizData.questions[currentQuestionIndex].question}</h3>
          <div className="flex flex-col w-full">
            {options.map((option) => (
              <button
                key={option}
                className="my-2 p-2 bg-blue-500 text-white rounded-lg w-full"
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4 text-center">
            Question {currentQuestionIndex + 1} of {quizData.questions.length}
          </p>
        </div>
      ) : (
        <p>Loading Quiz...</p>
      )}
    </div>
  );
};

export default QuizPage;
