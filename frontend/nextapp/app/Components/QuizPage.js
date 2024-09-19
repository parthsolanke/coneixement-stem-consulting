
"use client"; // This tells Next.js that this is a Client Component

import React, { useState } from 'react';

const QuizPage = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Options array (can be empty)
  const options = []; // Replace this with actual options when available

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full border border-purple-300">
        <h2 className="text-2xl font-semibold mb-4">Question 1:</h2>
        <p className="text-gray-700 mb-6">
          Lorem ipsum dolor sit amet. Ad quis quae in facere mollitia vel maiores soluta ad quae repellendus?
        </p>
        <div className="space-y-4">
          {/* Check if options are available, else render "Lorem" text */}
          {(options.length > 0 ? options : ['Lorem', 'Lorem', 'Lorem', 'Lorem']).map((option, index) => (
            <button
              key={index}
              className={`w-full py-3 rounded-lg text-white font-semibold transition-colors ${
                selectedOption === option ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="flex justify-end mt-8">
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
            Next <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
