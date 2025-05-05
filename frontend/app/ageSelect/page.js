"use client";

import React, { useState, useEffect } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from 'next/image';
import posthog from 'posthog-js';

const QuizLoadingIndicator = () => {
  const [progress, setProgress] = useState(0);
  const steps = [
    "Analyzing your interests...",
    "Generating personalized questions...",
    "Tailoring difficulty level...",
    "Preparing your quiz...",
    "Almost ready..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : prev));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const currentStep = Math.floor((progress / 100) * steps.length);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
        <div 
          className="h-full bg-blue-500 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-gray-700 text-center animate-pulse">
        {steps[Math.min(currentStep, steps.length - 1)]}
      </p>
    </div>
  );
};

const AgeSelector = ({ ageRange, onSelect, onBack }) => {
  const [selectedAge, setSelectedAge] = useState(ageRange[0]);

  return (
    <div className="flex flex-col items-center bg-white/95 backdrop-blur-sm p-8 rounded-lg 
      shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200/50 w-full max-w-md ring-1 ring-gray-900/5">
      <h3 className="text-2xl font-bold mb-6">Select Your Age</h3>
      <div className="w-full flex justify-center items-center mb-6">
        <button onClick={() => setSelectedAge(prev => Math.max(prev - 1, ageRange[0]))}
          className="text-2xl px-4 py-2 rounded-lg hover:bg-gray-100">
          −
        </button>
        <div className="text-4xl font-bold mx-8 w-20 text-center">
          {selectedAge}
        </div>
        <button onClick={() => setSelectedAge(prev => Math.min(prev + 1, ageRange[1]))}
          className="text-2xl px-4 py-2 rounded-lg hover:bg-gray-100">
          +
        </button>
      </div>
      <div className="flex gap-4 w-full">
        <Button
          display="Back"
          type="normal"
          extra="w-1/2 hover:scale-105 transition-transform duration-300"
          onClick={onBack}
        />
        <Button
          display="Continue"
          type="normal"
          extra="w-1/2 hover:scale-105 transition-transform duration-300"
          onClick={() => onSelect(selectedAge)}
        />
      </div>
    </div>
  );
};

const AgeGroupCard = ({ image, title, description, onSelect }) => (
  <div className="border-2 rounded-lg p-3 md:p-4 w-full max-w-lg flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
    <div className="w-full aspect-[16/9] relative overflow-hidden rounded-xl mb-3 md:mb-4">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover object-center transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
    <div className="flex-1 text-sm md:text-base text-center px-2">
      <h3 className="font-bold text-lg md:text-xl mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
    </div>
    <Button
      display="Select"
      type="normal"
      extra="font-semibold hover:scale-105 transition-transform duration-300 w-full md:w-32"
      onClick={onSelect}
    />
  </div>
);

const InterestForm = ({ onSubmit, loading, selectedAge }) => {
  const [formData, setFormData] = useState({
    extraCurricular: "",
    subjects: "",
    age: selectedAge.toString(),
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.extraCurricular.trim()) newErrors.extraCurricular = "Required field";
    if (!formData.subjects.trim()) newErrors.subjects = "Required field";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        extraCurricular: formData.extraCurricular,
        subjects: formData.subjects,
        age: selectedAge.toString()
      });
    }
  };

  return (
    <div className="flex flex-col items-center mt-6 bg-white/95 backdrop-blur-sm p-8 rounded-lg 
      shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200/50 w-full max-w-md 
      ring-1 ring-gray-900/5">
      {loading ? (
        <div className="w-full py-4">
          <h3 className="text-2xl font-bold mb-6 text-center">Generating Your Quiz</h3>
          <QuizLoadingIndicator />
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-6">Tell us more about yourself</h3>
          {["extraCurricular", "subjects"].map((field) => (
            <label key={field} className="w-full mb-4">
              <span className="block text-gray-700 capitalize mb-1">
                {field.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <input
                type="text"
                placeholder={getPlaceholder(field)}
                value={formData[field]}
                onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                className={`w-full p-3 border rounded-lg transition-colors duration-200 focus:border-blue-500 outline-none
                  ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors[field] && (
                <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
              )}
            </label>
          ))}
          <Button
            display="Start Quiz"
            type="normal"
            extra="mt-4 font-semibold w-full max-w-xs hover:scale-105 transition-transform duration-300"
            onClick={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

const getPlaceholder = (field) => ({
  extraCurricular: "e.g., Sports, Music, Art",
  subjects: "e.g., Math, Science, History",
}[field]);

export default function Page() {
  const router = useRouter();
  const [showInputs, setShowInputs] = useState(false);
  const [showAgeSelector, setShowAgeSelector] = useState(false);
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(null);
  const [selectedAge, setSelectedAge] = useState(null);
  const [quizLoading, setQuizLoading] = useState(false);

  const handleAgeGroupSelect = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
    setShowAgeSelector(true);
  };

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    setShowAgeSelector(false);
    setShowInputs(true);
  };

  const handleQuizSubmit = async (formData) => {
    setQuizLoading(true);
    try {
      posthog.capture('quiz_generation_started', {
        age: formData.age,
        extraCurricular: formData.extraCurricular,
        subjects: formData.subjects
      });
      
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/quiz/`,
        {
          extraCurricular: formData.extraCurricular,
          subjects: formData.subjects,
          age: formData.age
        }
      );
      router.push(`/quiz?data=${encodeURIComponent(JSON.stringify(response.data))}`);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
      alert("Failed to fetch quiz. Please try again.");
    } finally {
      setQuizLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar />
      <main className="container mx-auto px-3 md:px-4 pt-20 sm:pt-24 pb-8 min-h-screen">
        <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center justify-center relative">
          {/* Age group selection */}
          <div className={`w-full ${
            (showAgeSelector || showInputs) ? 'blur-sm pointer-events-none' : ''
          }`}>
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 md:mb-8 font-bold text-center px-2">
              Select Your Age Group
            </h2>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl mx-auto px-2">
              <AgeGroupCard
                image="/Images/8th_class.jpeg"
                title="Students in Class 8-10 (Age 13-15)"
                description="Start exploring your interests and build a strong foundation for success in the STEM field."
                onSelect={() => handleAgeGroupSelect({ range: [13, 15] })}
              />
              <AgeGroupCard
                image="/Images/12th_class.jpeg"
                title="Students in Class 11-12 (Age 16-18)"
                description="Decide the stream of your choice and plan the next steps for your dream career."
                onSelect={() => handleAgeGroupSelect({ range: [16, 18] })}
              />
            </div>
          </div>

          {/* Overlay Age Selector or Interest Form */}
          <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
            (showAgeSelector || showInputs) ? 'block' : 'hidden'
          }`}>
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" 
                 onClick={() => {
                   setShowAgeSelector(false);
                   setShowInputs(false);
                 }}
            />
            <div className="relative w-full max-w-md">
              {showAgeSelector ? (
                <AgeSelector 
                  ageRange={selectedAgeGroup.range}
                  onSelect={handleAgeSelect}
                  onBack={() => setShowAgeSelector(false)}
                />
              ) : showInputs ? (
                <InterestForm 
                  onSubmit={handleQuizSubmit} 
                  loading={quizLoading}
                  selectedAge={selectedAge}
                />
              ) : null}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
