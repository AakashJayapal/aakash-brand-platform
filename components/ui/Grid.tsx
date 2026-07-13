import React from "react";

interface GridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 12;
  gap?: "sm" | "md" | "lg" | "xl";
  className?: string;
  asymmetric?: boolean;
}

export function Grid({ 
  children, 
  columns = 3, 
  gap = "md", 
  className = "",
  asymmetric = false
}: GridProps) {
  const colStyles = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    12: "grid-cols-1 lg:grid-cols-12"
  };

  const gapStyles = {
    sm: "gap-4",
    md: "gap-6 lg:gap-8",
    lg: "gap-8 lg:gap-12",
    xl: "gap-12 lg:gap-16"
  };

  // If asymmetric, apply specific asymmetrical column arrangements
  const layoutStyle = asymmetric 
    ? "grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" 
    : `${colStyles[columns]} ${gapStyles[gap]}`;

  return (
    <div className={`grid ${layoutStyle} ${className}`}>
      {children}
    </div>
  );
}
