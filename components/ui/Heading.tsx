import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
}

export function Heading({ level = 2, children, className = "", gradient = false }: HeadingProps) {
  const baseStyles = "font-display tracking-tight text-[var(--foreground)] transition-colors duration-200";
  
  const levelStyles = {
    1: "text-5xl sm:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.05]",
    2: "text-3xl sm:text-5xl font-semibold tracking-tight leading-tight",
    3: "text-xl sm:text-2xl font-medium tracking-normal",
    4: "text-base sm:text-lg font-normal"
  };

  const gradientStyle = gradient ? "text-gradient-electric" : "";

  const Element = `h${level}` as "h1" | "h2" | "h3" | "h4";

  return (
    <Element className={`${baseStyles} ${levelStyles[level]} ${gradientStyle} ${className}`}>
      {children}
    </Element>
  );
}
