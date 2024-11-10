"use client";

import React, { useState, useRef } from "react";
import Button from "../Components/Button";
import Navbar from "../Components/Navbar";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [extraCurricular, setExtraCurricular] = useState("");
  const [subjects, setSubjects] = useState("");
  const [age, setAge] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const formRef = useRef(null);

  const fetchQuiz = async () => {
    if (!extraCurricular || !subjects || !age) {
      alert("Please fill in all the fields.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/quiz",
        {
          extraCurricular,
          subjects,
          age,
        }
      );
      const quizData = response.data;
      router.push(`/quiz?data=${encodeURIComponent(JSON.stringify(quizData))}`);
    } catch (error) {
      console.error("Error fetching quiz data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    setShowInputs(true);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-40">
        {!showInputs && (
          <>
            <h2 className="text-4xl mb-20 font-bold">Select Your Age Group</h2>
            <div className="border-2 rounded-lg p-6 w-full max-w-6xl flex flex-col md:flex-row items-center shadow-sm justify-between mb-6">
              <div className="w-72 h-56 flex-shrink-0 mr-4">
                <img
                  src="/Images/8th_class.jpeg"
                  alt="Graduate"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              <div className="m-6 flex-1 text-lg">
                <p className="font-bold">Students in Class 8-10 (Age 13 -15)</p>
                <p>
                  Start exploring your interests and build a strong foundation for success in the STEM field.
                </p>
              </div>
              <Button
                display={loading ? "Loading..." : "Select"}
                type="normal"
                extra="m-4 font-semibold"
                onClick={handleButtonClick}
                disabled={loading}
              />
            </div>
            <div className="border-2 rounded-lg p-6 w-full max-w-6xl flex items-center flex-col md:flex-row justify-between mb-6">
              <div className="w-72 h-56 flex-shrink-0 mr-4">
                <img
                  src="/Images/12th_class.jpeg"
                  alt="Graduate"
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>
              <div className="m-6 flex-1 text-lg">
                <p className="font-bold">Students in Class 11-12 (Age 16 -18)</p>
                <p>
                  Decide the stream of your choice and plan the next steps for your
                  dream career.
                </p>
              </div>
              <Button
                display={loading ? "Loading..." : "Select"}
                type="normal"
                extra="m-4 font-semibold"
                onClick={handleButtonClick}
                disabled={loading}
              />
            </div>
          </>
        )}
        {showInputs && (
          <div ref={formRef} className="flex flex-col items-center mt-6 bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h3 className="text-2xl font-bold mb-4">Tell us more about yourself</h3>
            <label className="w-full mb-2">
              <span className="block text-gray-700">Extracurricular Interests</span>
              <input
                type="text"
                placeholder="e.g., Sports, Music, Art"
                value={extraCurricular}
                onChange={(e) => setExtraCurricular(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="w-full mb-2">
              <span className="block text-gray-700">Subjects of Interest</span>
              <input
                type="text"
                placeholder="e.g., Math, Science, History"
                value={subjects}
                onChange={(e) => setSubjects(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="w-full mb-4">
              <span className="block text-gray-700">Your Age</span>
              <input
                type="text"
                placeholder="e.g., 15"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <Button
              display={loading ? "Loading..." : "Submit"}
              type="normal"
              extra="m-4 font-semibold"
              onClick={fetchQuiz}
              disabled={loading}
            />
          </div>
        )}
      </div>
    </>
  );
}
