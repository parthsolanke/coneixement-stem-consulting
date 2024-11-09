"use client";
import { useState, useEffect, useRef, useLayoutEffect } from "react";

const useTypewriter = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

const Typewriter = ({ text, speed = 40 }) => {
  const displayText = useTypewriter(text, speed);
  const [minHeight, setMinHeight] = useState(0);
  const fullTextRef = useRef(null);

  // Measure the full text height using useLayoutEffect to ensure DOM is ready
  useLayoutEffect(() => {
    if (fullTextRef.current) {
      const totalHeight = fullTextRef.current.offsetHeight;
      setMinHeight(totalHeight);
    }
  }, [text]);

  return (
    <div
      className="relative mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj"
      style={{ minHeight }}
    >
      {displayText}

      {/* Hidden element to measure the height */}
      <div
        ref={fullTextRef}
        className="invisible absolute whitespace-pre-wrap text-3xl sm:text-4xl xl:text-5xl font-pj font-semibold tracking-wide"
        aria-hidden="true"
      >
        {text}
      </div>
    </div>
  );
};

export default Typewriter;
