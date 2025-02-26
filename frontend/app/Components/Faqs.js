"use client";
import { useState } from "react";

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md transition-all duration-300 overflow-hidden bg-white">
      <button
        className={`w-full flex justify-between items-center px-6 py-4 transition-colors duration-300 text-left focus:outline-none ${
          isOpen ? "bg-indigo-200 text-indigo-800" : "bg-white hover:bg-indigo-100 text-gray-900"
        }`}
        onClick={onClick}
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180 text-indigo-800" : "text-indigo-600"
          }`}
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-48 opacity-100 py-4 px-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-700 text-base leading-relaxed">{content}</p>
      </div>
    </div>
  );
}

function Faqs() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <AccordionItem
            title="What is the purpose of your STEM career assessment test?"
            content="The STEM career assessment test helps identify your strengths, interests, and potential career paths within Science, Technology, Engineering, and Mathematics."
            isOpen={openIndex === 0}
            onClick={() => toggleAccordion(0)}
          />
          <AccordionItem
            title="How long does the assessment take?"
            content="It takes about 30-45 minutes to complete. Answer honestly for the most accurate results."
            isOpen={openIndex === 1}
            onClick={() => toggleAccordion(1)}
          />
          <AccordionItem
            title="What should I expect from the results?"
            content="You'll receive insights into your skills, interests, and STEM career recommendations with a detailed report."
            isOpen={openIndex === 2}
            onClick={() => toggleAccordion(2)}
          />
          <AccordionItem
            title="Is there a cost for taking the assessment?"
            content="No, it's completely free to take. We aim to provide valuable career guidance at no cost."
            isOpen={openIndex === 3}
            onClick={() => toggleAccordion(3)}
          />
          <AccordionItem
            title="Can I retake the assessment?"
            content="Yes, but we recommend waiting a few months to ensure more accurate results."
            isOpen={openIndex === 4}
            onClick={() => toggleAccordion(4)}
          />
        </div>
      </div>
    </div>
  );
}

export default Faqs;
