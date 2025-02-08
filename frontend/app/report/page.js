"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Navbar from "../Components/Navbar";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { Radar, Bar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const SectionHeading = ({ icon, title, className = "" }) => (
  <h2 className={`text-3xl font-bold mb-6 text-gray-800 flex items-center ${className}`}>
    <span className="bg-blue-100 text-blue-800 p-2 rounded-lg mr-3">
      {icon}
    </span>
    {title}
  </h2>
);

const InfoTag = ({ children, color = "blue" }) => (
  <span className={`px-4 py-2 bg-gradient-to-r from-${color}-50 to-${color}-100 
    text-${color}-800 rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300`}>
    {children}
  </span>
);

const TraitVisualization = ({ traitWeights }) => {
  const traits = Object.keys(traitWeights);
  const scores = Object.values(traitWeights);

  const radarData = {
    labels: traits,
    datasets: [
      {
        label: 'Your Trait Scores',
        data: scores,
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(99, 102, 241, 1)',
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const barData = {
    labels: traits,
    datasets: [
      {
        data: scores,
        backgroundColor: scores.map(score => 
          score >= 70 ? 'rgba(34, 197, 94, 0.6)' :
          score < 50 ? 'rgba(249, 115, 22, 0.6)' :
          'rgba(99, 102, 241, 0.6)'
        ),
        borderColor: scores.map(score => 
          score >= 70 ? 'rgb(34, 197, 94)' :
          score < 50 ? 'rgb(249, 115, 22)' :
          'rgb(99, 102, 241)'
        ),
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.raw}%`,
          title: (context) => context[0].label
        },
        padding: 12,
        boxPadding: 6,
        titleFont: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => `${value}%`,
          font: {
            size: 12,
            weight: 'medium'
          }
        },
        title: {
          display: true,
          text: 'Score Percentage',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: { top: 10 }
        }
      },
      y: {
        grid: {
          display: false,
          drawBorder: false,
        },
        ticks: {
          padding: 12,
          font: {
            size: 13,
            weight: 'medium'
          },
          align: 'center',
          crossAlign: 'far',
          callback: (value) => {
            const label = traits[value];
            return label.length > 20 ? [label.slice(0, 20) + '...'] : label;
          }
        },
        afterFit: (scaleInstance) => {
          scaleInstance.width = 180;
        }
      }
    },
    animation: {
      duration: 2000,
    },
    layout: {
      padding: {
        left: 20,
        right: 30,
        top: 20,
        bottom: 20
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Trait Distribution</h3>
          <div className="aspect-square">
            <Radar data={radarData} options={radarOptions} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Detailed Scores</h3>
          <div className="h-[500px] relative">
            <div className="absolute inset-0 px-4">
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="bg-white p-4 rounded-xl shadow-sm"> 
        <div className="flex justify-center gap-8"> 
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Strong (≥70%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Moderate (50-69%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm text-gray-600">Needs Development (≤49%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const SectionCard = ({ children, className = "" }) => (
  <div className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const DownloadButton = ({ onClick, isGenerating }) => (
  <div className="sticky bottom-8 w-full max-w-6xl mx-auto px-6">
    <button
      onClick={onClick}
      disabled={isGenerating}
      className="float-right bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-3 rounded-full 
      shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
    >
      {isGenerating ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
          <span>Generating PDF...</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Save as PDF</span>
        </>
      )}
    </button>
  </div>
);

const ReportPage = () => {
  const reportRef = useRef(null);
  const [traitWeights, setTraitWeights] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
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
    } catch (error) {
      console.error('Error fetching report:', error.response?.data || error.message);
      // add error handling UI here
    }
  };

  const generatePDF = async () => {
    if (!reportRef.current || isGeneratingPdf) return;

    try {
      setIsGeneratingPdf(true);

      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const sections = Array.from(reportRef.current.children);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margins = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
      };

      let currentPage = 1;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        
        section.style.backgroundColor = 'white';
        
        const canvas = await html2canvas(section, {
          scale: 2,
          logging: false,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          letterRendering: true,
          onclone: (clonedDoc) => {
            const charts = clonedDoc.querySelectorAll('canvas');
            charts.forEach(chart => {
              chart.getContext('2d').imageSmoothingEnabled = false;
            });
          }
        });

        const imgWidth = pdfWidth - (margins.left + margins.right);
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (currentPage > 1) {
          pdf.addPage();
        }

        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          margins.left,
          margins.top,
          imgWidth,
          imgHeight,
          `section-${i}`,
          'FAST'
        );

        currentPage++;

        section.style.backgroundColor = '';
      }

      const totalPages = currentPage - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(128, 128, 128);
        pdf.text(
          `Page ${i} of ${totalPages}`,
          pdfWidth / 2,
          pdfHeight - 10,
          { align: 'center' }
        );
      }

      pdf.setProperties({
        title: 'STEM Profile Analysis Report',
        subject: 'Personal STEM trait analysis and career recommendations',
        creator: 'Coneixement STEM Consulting',
        author: 'Coneixement',
        keywords: 'STEM, career guidance, education',
        creationDate: new Date()
      });

      pdf.save('STEM-Profile-Analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!traitWeights || !reportData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const { strengths, weaknesses } = analyzeTraits(traitWeights);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 pt-24">
        <div ref={reportRef} className="w-full max-w-6xl space-y-8 mb-24">
          {/* Header Section */}
          <SectionCard className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 -z-10"></div>
            <div className="text-center mb-12">
              <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Your STEM Profile Analysis
              </h1>
              <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
                Based on your responses, we've created a comprehensive analysis of your STEM traits and potential career paths.
                This report will help guide your educational and career decisions.
              </p>
            </div>

            {/* Profile Overview */}
            <div className="mb-12 transform hover:scale-[1.01] transition-all duration-300">
              <SectionHeading 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}
                title={reportData.profile_overview.title}
              />
              <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl mb-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{reportData.profile_overview.description}</p>
                <div className="flex flex-wrap gap-3">
                  {reportData.profile_overview.key_characteristics.map((char, index) => (
                    <InfoTag key={index} color="blue">{char}</InfoTag>
                  ))}
                </div>
              </div>
            </div>

            {/* Trait Analysis Section */}
            <div className="mb-12">
              <SectionHeading 
                icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>}
                title="Trait Analysis"
              />
              <TraitVisualization traitWeights={traitWeights} />
            </div>

            {/* Strengths and Growth Areas Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-green-800 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Your Strengths
                </h2>
                {strengths.length > 0 ? (
                  <ul className="space-y-2">
                    {strengths.map(trait => (
                      <li key={trait} className="text-green-700 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 italic">Areas for improvement identified.</p>
                )}
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <h2 className="text-2xl font-semibold mb-4 text-orange-800 flex items-center">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Growth Areas
                </h2>
                {weaknesses.length > 0 ? (
                  <ul className="space-y-2">
                    {weaknesses.map(trait => (
                      <li key={trait} className="text-orange-700 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        {trait}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 italic">Excellent performance across all areas!</p>
                )}
              </div>
            </div>
          </SectionCard>

          {/* Academic & Career Section with new layout */}
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <SectionCard className="h-full">
                <SectionHeading 
                  icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>}
                  title={reportData.strength_academic_mapping.title}
                />
                <div className="space-y-6">
                  {reportData.strength_academic_mapping.mappings.map((mapping, index) => (
                    <div key={index} 
                      className="p-6 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 hover:shadow-md transition-all duration-300">
                      <h3 className="text-xl font-semibold text-purple-800 mb-2">{mapping.strength}</h3>
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {mapping.academic_fields.map((field, i) => (
                            <span key={i} className="px-3 py-1 bg-white/50 rounded-full text-sm font-medium text-purple-700">
                              {field}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-700">{mapping.potential_applications}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
            <div className="md:col-span-3">
              <SectionCard className="h-full">
                <SectionHeading 
                  icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>}
                  title={reportData.career_exploration.title}
                />
                <div className="grid md:grid-cols-2 gap-6">
                  {reportData.career_exploration.paths.map((path, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl hover:shadow-md transition-all duration-300">
                      <h3 className="text-xl font-semibold text-blue-800 mb-3">{path.field}</h3>
                      <p className="text-gray-700 mb-3">{path.why_consider}</p>
                      <h4 className="font-medium mb-2">Required Skills:</h4>
                      <ul className="list-disc list-inside text-gray-600 mb-3">
                        {path.required_skills.map((skill, i) => (
                          <li key={i}>{skill}</li>
                        ))}
                      </ul>
                      <p className="text-gray-700"><span className="font-medium">Growth: </span>{path.growth_potential}</p>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </div>

          {/* Reflection Section with improved layout */}
          <SectionCard className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
            <SectionHeading 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>}
              title={reportData.reflection_questions.title}
            />
            <div className="grid md:grid-cols-2 gap-6">
              {reportData.reflection_questions.questions.map((question, index) => (
                <div key={index} 
                  className="p-6 bg-white/80 rounded-xl hover:shadow-md transition-all duration-300 backdrop-blur-sm">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-indigo-100 text-indigo-800 rounded-full font-bold">
                      {index + 1}
                    </span>
                    <p className="text-gray-700 leading-relaxed">{question}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <DownloadButton onClick={generatePDF} isGenerating={isGeneratingPdf} />
      </div>
    </>
  );
};

export default ReportPage;
