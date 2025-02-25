"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { DownloadButton } from './components/CommonComponents';
import LoadingState from './components/LoadingState';
import { generatePDF } from './utils/pdfGenerator';
import PrintStyles from './components/PrintStyles';
import ReportTemplate from './components/ReportTemplate';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

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
  const reportRef = useRef(null);
  const [traitWeights, setTraitWeights] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const data = query.get("data");

    if (data) {
      const parsedData = JSON.parse(decodeURIComponent(data));
      setTraitWeights(parsedData);
      fetchReport(parsedData);
    }
  }, []);

  const fetchReport = async (traits) => {
    const { strengths, weaknesses } = analyzeTraits(traits);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/report/`,
        {
          scores: traits,
          strengths,
          weaknesses
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      setReportData(data.report);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching report:', error.response?.data || error.message);
      setIsLoading(false);
      // add error handling UI here
    }
  };

  const handleGeneratePDF = async () => {
    if (!reportRef.current || isGeneratingPdf) return;
    try {
      setIsGeneratingPdf(true);
      await generatePDF(reportRef.current);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!traitWeights || !reportData || isLoading) {
    return <LoadingState />;
  }

  const { strengths, weaknesses } = analyzeTraits(traitWeights);

  return (
    <>
      <PrintStyles />
      <Navbar className="no-print" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6 pt-20 md:pt-24">
        <ReportTemplate 
          reportRef={reportRef}
          reportData={reportData}
          traitWeights={traitWeights}
          strengths={strengths}
          weaknesses={weaknesses}
        />
        <DownloadButton 
          onClick={handleGeneratePDF} 
          isGenerating={isGeneratingPdf}
          className="no-print fixed bottom-6 right-6 z-50 print:hidden" 
        />
      </div>
    </>
  );
};

export default ReportPage;
