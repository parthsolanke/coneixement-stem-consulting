"use client";
import { useState, useEffect, useRef } from "react";

const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    
    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, speed);
      } else {
        setIsTyping(false);
      }
    };

    type();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [text, speed]);

  return { displayText, isTyping };
};

const Typewriter = ({ text, speed = 50 }) => {
  const containerRef = useRef(null);
  const { displayText, isTyping } = useTypewriter(text, speed);

  return (
    <div ref={containerRef} className="relative inline-block">
      <span className="inherit">
        {displayText}
        <span 
          className={`
            inline-block w-0.5 h-[1em] ml-1 align-middle
            ${isTyping ? 'animate-cursor-blink bg-current' : 'opacity-0'}
          `}
        />
      </span>
    </div>
  );
};

export default Typewriter;
