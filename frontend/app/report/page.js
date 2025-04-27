"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const reportRef = useRef(null);
  const [traitWeights, setTraitWeights] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn !== undefined) {
      setIsAuthInitialized(true);
    }
  }, [isSignedIn]);

  useEffect(() => {
    if (!isAuthInitialized) return;

    try {
      const storedData = localStorage.getItem('quizResults');
      if (!storedData) {
        router.push('/quiz');
        return;
      }

      const parsedData = JSON.parse(storedData);
      setTraitWeights(parsedData);
      
      if (isSignedIn) {
        fetchReport(parsedData);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading quiz results:', error);
      router.push('/quiz');
    }
  }, [isSignedIn, isAuthInitialized, router]);

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

        // Split the base64 string into chunks of 500KB
        const chunkSize = 500 * 1024; // 500KB in bytes
        const chunks = [];
        for (let i = 0; i < pdfBase64.length; i += chunkSize) {
            chunks.push(pdfBase64.slice(i, i + chunkSize));
        }

        // Generate a unique ID for this upload
        const uploadId = Date.now().toString();

        // Send chunks sequentially
        for (let i = 0; i < chunks.length; i++) {
            const response = await axios.post('/api/send-email', {
                type: 'report',
                name,
                email,
                pdfChunk: chunks[i],
                chunkIndex: i,
                totalChunks: chunks.length,
                uploadId
            });

            if (!response.data.success) {
                throw new Error(`Failed to upload chunk ${i}`);
            }
        }

        // Trigger final email send
        const finalResponse = await axios.post('/api/send-email', {
            type: 'report',
            name,
            email,
            uploadId,
            finalizeUpload: true
        });

        if (finalResponse.data.success) {
            setNotification({ type: 'success', message: 'Report sent successfully! Check your email.' });
            setEmailSubmitted(true);
            localStorage.setItem('reportEmailSubmitted', 'true');
        } else {
            throw new Error(finalResponse.data.message);
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

  if (!isAuthInitialized || !traitWeights) {
    return <LoadingState />;
  }

  if (!isSignedIn) {
    return (
      <>
        <Navbar hidden={true} className="no-print" />
        <div className="relative filter blur-md">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-3 md:p-6 pt-20 md:pt-24">
            <div className="w-full max-w-4xl bg-white rounded-2xl p-8">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-6" />
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <EmailOverlay 
          onSubmit={handleEmailSubmit} 
          isSubmitting={isSubmitting}
        />
      </>
    );
  }

  if (!reportData || isLoading) {
    return <LoadingState />;
  }

  const { strengths, weaknesses } = analyzeTraits(traitWeights);

  return (
    <>
      <PrintStyles />
      <Navbar hidden={!emailSubmitted} className="no-print" />
      <div className={`relative ${!emailSubmitted ? 'filter blur-md' : ''}`}>
        {isSignedIn && reportData ? (
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
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sign in to View Your Report
              </h2>
            </div>
          </div>
        )}
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
