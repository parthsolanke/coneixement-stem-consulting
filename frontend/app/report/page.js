"use client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { DownloadButton } from './components/CommonComponents';
import LoadingState from './components/LoadingState';
import { generatePDF } from './utils/pdfGenerator';
import PrintStyles from './components/PrintStyles';
import ReportTemplate from './components/ReportTemplate';
import EmailOverlay from './components/EmailOverlay';
import Toast from "../Components/Toast";

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
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      await generatePDF(reportRef.current, { download: true });
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleEmailSubmit = async (formData) => {
    const { name, email } = formData;
    try {
      setIsSubmitting(true);
      setIsGeneratingPdf(true);
      
      const pdfBase64 = await generatePDF(reportRef.current);
      
      if (!pdfBase64) {
        throw new Error('Failed to generate PDF');
      }
      
      const response = await axios.post('/api/send-email', {
        type: 'report',
        name,
        email,
        pdfBuffer: pdfBase64
      });

      if (response.data.success) {
        setNotification({ type: 'success', message: 'Report sent successfully! Check your email.' });
        setEmailSubmitted(true);
        localStorage.setItem('reportEmailSubmitted', 'true');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error sending report:', error);
      setNotification({ 
        type: 'error', 
        message: 'Failed to send report. Please try again.' 
      });
    } finally {
      setIsGeneratingPdf(false);
      setIsSubmitting(false);
    }
  };

  if (!traitWeights || !reportData || isLoading) {
    return <LoadingState />;
  }

  const { strengths, weaknesses } = analyzeTraits(traitWeights);

  return (
    <>
      <PrintStyles />
      <Navbar hidden={!emailSubmitted} className="no-print" />
      <div className={`relative ${!emailSubmitted ? 'filter blur-md' : ''}`}>
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
      </div>
      {notification && (
        <Toast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      {!emailSubmitted && (
        <EmailOverlay 
          onSubmit={handleEmailSubmit} 
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default ReportPage;
