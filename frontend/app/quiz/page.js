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

const calculateMaxScorePerTrait = (questions) => {
  const traitCounts = {};
  questions.forEach(question => {
    traitCounts[question.trait] = (traitCounts[question.trait] || 0) + 1;
  });
  // Maximum score per question is 3
  return Object.fromEntries(
    Object.entries(traitCounts).map(([trait, count]) => [trait, count * 3])
  );
};

const calculateTraitPercentages = (weights, maxScores) => {
  const percentages = {};
  for (const trait in weights) {
    percentages[trait] = Math.round((weights[trait] / maxScores[trait]) * 100);
  }
  return percentages;
};

const ProgressBar = ({ current, total }) => (
  <div className="w-full bg-gray-50 rounded-lg p-3 mt-auto">
    <div className="flex justify-between text-xs mb-2">
      <span className="font-medium text-gray-600 flex items-center">
        <svg className="w-3.5 h-3.5 mr-1.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"/>
        </svg>
        Question {current} of {total}
      </span>
      <span className="font-bold text-blue-600">
        {Math.round((current / total) * 100)}%
      </span>
    </div>
    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full 
                   transition-all duration-700 ease-out-expo"
        style={{ width: `${(current / total) * 100}%` }}
      />
    </div>
  </div>
);

const QuestionCard = ({ question, onAnswer, options, total }) => (
  <div className="w-full max-w-[550px] min-h-[420px] bg-white/95 backdrop-blur-md rounded-2xl p-4 md:p-8 
                  shadow-xl relative border border-gray-100 flex flex-col mt-8 mx-4">
    {/* Question Number Badge */}
    <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-purple-600 
                    rounded-full flex items-center justify-center text-white font-bold text-lg md:text-xl 
                    shadow-lg transform rotate-0 transition-transform hover:rotate-12">
      {question.number}
    </div>
    
    {/* Question Text */}
    <h3 className="text-lg md:text-xl font-bold mb-6 md:mb-8 text-gray-800 text-center leading-relaxed pt-4 px-2 md:px-3">
      {question.question}
    </h3>
    
    {/* Options Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-grow justify-center mt-4">
      {options.slice(0, 2).map((option, index) => (
        <button
          key={option.label}
          className="group h-[80px] px-5 bg-white border-2 border-blue-500/20 text-gray-700 
                   rounded-lg transition-all duration-300 hover:border-blue-500 
                   hover:shadow-lg hover:shadow-blue-100 hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50
                   active:transform active:scale-[0.98]"
          onClick={() => onAnswer(option.weight)}
          style={{ animationDelay: `${index * 150}ms` }}
        >
          <div className="relative flex flex-col items-center justify-center space-y-1.5">
            <span className="text-base font-medium group-hover:text-blue-600 
                         transition-colors duration-300">
              {option.label}
            </span>
            <div className="w-2 h-2 rounded-full bg-blue-500/20 
                        group-hover:bg-blue-500 transition-all duration-300 
                        group-hover:scale-125" />
          </div>
        </button>
      ))}
      {options.slice(2).map((option, index) => (
        <button
          key={option.label}
          className="group h-[80px] px-5 bg-white border-2 border-red-500/20 text-gray-700 
                   rounded-lg transition-all duration-300 hover:border-red-500 
                   hover:shadow-lg hover:shadow-red-100 hover:-translate-y-0.5
                   focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
                   active:transform active:scale-[0.98]"
          onClick={() => onAnswer(option.weight)}
          style={{ animationDelay: `${(index + 2) * 150}ms` }}
        >
          <div className="relative flex flex-col items-center justify-center space-y-1.5">
            <span className="text-base font-medium group-hover:text-red-600 
                         transition-colors duration-300">
              {option.label}
            </span>
            <div className="w-2 h-2 rounded-full bg-red-500/20 
                        group-hover:bg-red-500 transition-all duration-300 
                        group-hover:scale-125" />
          </div>
        </button>
      ))}
    </div>
    <ProgressBar current={question.number} total={total} />
  </div>
);

const LoadingState = () => (
  <div className="w-[550px] min-h-[420px] bg-white/90 backdrop-blur-sm p-8 
                  rounded-2xl shadow-2xl border border-gray-100">
    <div className="animate-pulse space-y-6">
      <div className="h-7 bg-gray-200 rounded-full w-3/4 mx-auto" />
      {[...Array(4)].map((_, i) => (
        <div key={i} 
             className="h-[68px] bg-gray-200 rounded-xl transform transition-all duration-300"
             style={{ 
               animationDelay: `${i * 150}ms`, 
               opacity: 1 - (i * 0.15) 
             }}
        />
      ))}
    </div>
  </div>
);

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
        const maxScores = calculateMaxScorePerTrait(quizData.questions);
        const percentages = calculateTraitPercentages(newWeights, maxScores);
        router.push(
          `/report?data=${encodeURIComponent(JSON.stringify(percentages))}`
        );
      }

      return newWeights;
    });

    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4 py-20 min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-full">
            {quizData ? (
              <QuestionCard 
                question={{
                  number: currentQuestionIndex + 1,
                  question: quizData.questions[currentQuestionIndex].question
                }}
                onAnswer={(weight) => handleAnswerSelect(
                  weight,
                  quizData.questions[currentQuestionIndex].trait
                )}
                options={options}
                total={quizData.questions.length}
              />
            ) : (
              <LoadingState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
