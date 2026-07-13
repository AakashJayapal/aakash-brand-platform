import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full ${className}`}>
      {children}
    </div>
  );
}
