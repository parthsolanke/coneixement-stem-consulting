"use client";
import { useState } from "react";

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-6 text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <span className={`ml-6 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </span>
        </div>
      </button>
      <div className={`transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
        <p className="text-gray-600">
          {content}
        </p>
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
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-12">
        Frequently Asked Questions
      </h2>
      <div className="divide-y divide-gray-200">
        <AccordionItem
          title="What is the purpose of your STEM career assessment test?"
          content="The STEM career assessment test is designed to help you identify your strengths, interests, and potential career paths within the fields of Science, Technology, Engineering, and Mathematics."
          isOpen={openIndex === 0}
          onClick={() => toggleAccordion(0)}
        />
        <AccordionItem
          title="How long does the assessment take?"
          content="The assessment typically takes about 30-45 minutes to complete. It's important to take your time and answer each question honestly for the most accurate results."
          isOpen={openIndex === 1}
          onClick={() => toggleAccordion(1)}
        />
        <AccordionItem
          title="What should I expect from the results?"
          content="The results will provide you with insights into your skills and interests, and suggest potential STEM careers that might be a good fit for you. You'll receive a detailed report with personalized recommendations."
          isOpen={openIndex === 2}
          onClick={() => toggleAccordion(2)}
        />
        <AccordionItem
          title="Is there a cost for taking the assessment?"
          content="No, the STEM career assessment test is completely free to take. We want to provide valuable guidance to help you make informed career decisions."
          isOpen={openIndex === 3}
          onClick={() => toggleAccordion(3)}
        />
        <AccordionItem
          title="Can I retake the assessment?"
          content="Yes, you can retake the assessment if you feel your interests or goals have changed. However, we recommend waiting at least a few months before retaking it to ensure the most accurate results."
          isOpen={openIndex === 4}
          onClick={() => toggleAccordion(4)}
        />
      </div>
    </div>
  );
}

export default Faqs;
