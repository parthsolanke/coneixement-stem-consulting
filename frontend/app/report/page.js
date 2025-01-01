"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl mb-6">Quiz Report</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {Object.entries(traitWeights).map(([trait, weight]) => (
          <div key={trait} className="mb-4">
            <h2 className="text-lg font-bold">{trait}</h2>
            <p className="text-gray-700">Score: {weight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportPage;
