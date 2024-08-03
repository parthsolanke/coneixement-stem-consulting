"use client";
import { useState } from "react";

function AccordionItem({ title, content, isOpen, onClick }) {
  return (
    <div className="border border-gray-200 bg-gray-100 rounded-xl mb-4 ">
      <div
        className="flex justify-between items-center px-6 py-4 cursor-pointer rounded-xl bg-gray-200"
        onClick={onClick}
      >
        <span>{title}</span>
        <span>
          {isOpen ? (
            <i className="fas fa-chevron-up"></i>
          ) : (
            <i className="fas fa-chevron-down"></i>
          )}
        </span>
      </div>
      {isOpen && <div className="px-4 py-2">{content}</div>}
    </div>
  );
}

function Faqs() {
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4 mb-10">
      <h2 className="text-4xl font-semibold mb-8 text-center text-gray-900 font-pj">
        Got a Question? Find Your Answer
      </h2>
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
  );
}

export default Faqs;
