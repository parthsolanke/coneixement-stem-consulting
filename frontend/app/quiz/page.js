"use client";
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useRouter } from "next/navigation";

const options = [
  { label: "Strongly Agree", weight: 3 },
  { label: "Agree", weight: 2 },
  { label: "Disagree", weight: 1 },
  { label: "Strongly Disagree", weight: 0 },
];

const QuizPage = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [traitWeights, setTraitWeights] = useState({});
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get("data");

    if (data) {
      setQuizData(JSON.parse(decodeURIComponent(data)));
    }
  }, []);

  const handleAnswerSelect = (answerWeight, trait) => {
    setTraitWeights((prev) => {
      const newWeights = { ...prev };
      newWeights[trait] = (newWeights[trait] || 0) + answerWeight;
      if (currentQuestionIndex === quizData.questions.length - 1) {
        router.push(
          `/report?data=${encodeURIComponent(JSON.stringify(newWeights))}`
        );
      }

      return newWeights;
    });

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {quizData ? (
          <div className="flex flex-col items-center border-2 rounded-lg p-6 w-full max-w-md shadow-sm">
            <h3 className="text-xl mb-4 text-center">
              {quizData.questions[currentQuestionIndex].question}
            </h3>
            <div className="flex flex-col w-full">
              {options.map((option) => (
                <button
                  key={option.label}
                  className="my-2 p-2 bg-blue-500 text-white rounded-lg w-full"
                  onClick={() =>
                    handleAnswerSelect(
                      option.weight,
                      quizData.questions[currentQuestionIndex].trait
                    )
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p className="mt-4 text-center">
              Question {currentQuestionIndex + 1} of{" "}
              {quizData.questions.length}
            </p>
          </div>
        ) : (
          <p>Loading Quiz...</p>
        )}
      </div>
    </>
  );
};

export default QuizPage;
