"use client";

import React, { useState } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from 'next/image';

const AgeSelector = ({ ageRange, onSelect, onBack }) => {
  const [selectedAge, setSelectedAge] = useState(ageRange[0]);

  return (
    <div className="animate-fadeIn flex flex-col items-center bg-white/95 backdrop-blur-sm p-8 rounded-lg 
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
  <div className="border-2 rounded-lg p-4 w-full max-w-lg flex flex-col items-center shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
    <div className="w-full aspect-[16/9] relative overflow-hidden rounded-xl mb-4">
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 40vw"
        className="object-cover object-center transition-transform duration-300 hover:scale-105"
        priority
      />
    </div>
    <div className="flex-1 text-base text-center">
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="text-gray-700 mb-4 text-base">{description}</p>
    </div>
    <Button
      display="Select"
      type="normal"
      extra="font-semibold hover:scale-105 transition-transform duration-300 w-32"
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
    <div className="animate-fadeIn flex flex-col items-center mt-6 bg-white/95 backdrop-blur-sm p-8 rounded-lg 
      shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-gray-200/50 w-full max-w-md 
      ring-1 ring-gray-900/5">
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
        display={loading ? "Loading Quiz..." : "Submit"}
        type="normal"
        extra="mt-4 font-semibold w-full max-w-xs hover:scale-105 transition-transform duration-300"
        onClick={handleSubmit}
        disabled={loading}
      />
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
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center relative">
        {/* Main content container */}
        <div className="w-full max-w-[1200px] flex flex-col items-center justify-center pt-16 relative">
          {/* Age group selection */}
          <div className={`w-full transition-all duration-500 ${
            (showAgeSelector || showInputs) ? 'blur-sm scale-95 brightness-[0.98] pointer-events-none' : ''
          }`}>
            <h2 className="text-3xl mb-8 font-bold text-center">Select Your Age Group</h2>
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl mx-auto">
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
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md
            transition-all duration-500 ${
              (showAgeSelector || showInputs)
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-90 pointer-events-none'
            }`}>
            <div className="absolute inset-0 -m-4 bg-white/30 backdrop-blur-[2px] rounded-xl"></div>
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
    </div>
  );
}
