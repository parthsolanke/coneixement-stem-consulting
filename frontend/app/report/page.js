"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";

const ProgressBar = ({ percentage }) => (
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div
      className="bg-blue-600 h-4 rounded-full transition-all duration-500"
      style={{ width: `${percentage}%` }}
    ></div>
  </div>
);

const analyzeTraits = (traitWeights) => {
  const sortedTraits = Object.entries(traitWeights).sort((a, b) => b[1] - a[1]);
  const strengths = sortedTraits
    .filter(([_, score]) => score >= 70)
    .map(([trait]) => trait);
  const weaknesses = sortedTraits
    .filter(([_, score]) => score < 50)
    .map(([trait]) => trait);

  return { strengths, weaknesses };
};

const ReportPage = () => {
  const [traitWeights, setTraitWeights] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get("data");

    if (data) {
      setTraitWeights(JSON.parse(decodeURIComponent(data)));
    }
  }, []);

  if (!traitWeights) {
    return <p>Loading Report...</p>;
  }

  const { strengths, weaknesses } = analyzeTraits(traitWeights);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8 text-center">Your STEM Profile Analysis</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Trait Scores</h2>
            {Object.entries(traitWeights).map(([trait, percentage]) => (
              <div key={trait} className="mb-6">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-medium">{trait}</h3>
                  <span className="font-bold">{percentage}%</span>
                </div>
                <ProgressBar percentage={percentage} />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-green-800">Your Strengths</h2>
              {strengths.length > 0 ? (
                <ul className="list-disc pl-5">
                  {strengths.map(trait => (
                    <li key={trait} className="text-green-700">{trait}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Poor scores!</p>
              )}
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-3 text-orange-800">Your Weaknesses</h2>
              {weaknesses.length > 0 ? (
                <ul className="list-disc pl-5">
                  {weaknesses.map(trait => (
                    <li key={trait} className="text-orange-700">{trait}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Great job!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPage;
