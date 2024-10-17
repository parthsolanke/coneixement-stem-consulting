"use client";
import { useState, useEffect, useRef } from 'react';

const useTypewriter = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        if(i === 0) setDisplayText(prevText => prevText + text.charAt(i));
        setDisplayText(prevText => prevText + text.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);

    return () => {
      clearInterval(typingInterval);
    };
  }, [text, speed]);

  return displayText;
};

const Typewriter = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);
  const [minHeight, setMinHeight] = useState(null);
  const fullTextRef = useRef(null);

  // Measure full text height after applying identical styling with padding and margin
  useEffect(() => {
    if (fullTextRef.current) {
      const computedStyles = getComputedStyle(fullTextRef.current);
      const height = fullTextRef.current.offsetHeight;
      const paddingTop = parseFloat(computedStyles.paddingTop);
      const paddingBottom = parseFloat(computedStyles.paddingBottom);
      const marginTop = parseFloat(computedStyles.marginTop);
      const marginBottom = parseFloat(computedStyles.marginBottom);
      const totalHeight = height + paddingTop + paddingBottom + marginTop + marginBottom;

      setMinHeight(totalHeight);
    }
  }, [text]);

  return (
    <div
      className="text-5xl ms-16 text-gray-900 font-sans tracking-wide font-semibold break-words pr-14"
      style={{ minHeight }}
    >
      {displayText}

      {/* Hidden element to measure text height with padding and margin */}
      <div
        ref={fullTextRef}
        className="absolute invisible pointer-events-none text-5xl ms-16 text-gray-900 font-sans tracking-wide font-semibold break-words pr-14"
        style={{
          whiteSpace: 'pre-wrap',
          visibility: 'hidden',
          position: 'absolute',
          boxSizing: 'border-box',  // Ensures padding is included in measurements
        }}
        aria-hidden="true"
      >
        {text}
      </div>
    </div>
  );
};

export default Typewriter;
