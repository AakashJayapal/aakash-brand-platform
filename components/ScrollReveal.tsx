"use client";

import React, { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children?: string;
  className?: string;
  stagger?: number;
}

export function ScrollReveal({ children = "", className = "", stagger = 0.02 }: ScrollRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const textToSplit = typeof children === "string" ? children : "";
  const words = textToSplit ? textToSplit.split(" ") : [];

  if (words.length === 0) return null;

  return (
    <p
      ref={containerRef}
      className={`flex flex-wrap leading-relaxed ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block mr-[0.25em] transition-all duration-700 transform will-change-transform"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 10px, 0)",
            transitionDelay: `${index * stagger}s`,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
}
