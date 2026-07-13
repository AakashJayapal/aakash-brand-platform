import React from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  background?: "default" | "zinc" | "mesh";
  hasDivider?: boolean;
}

export function Section({ 
  id, 
  children, 
  className = "", 
  background = "default",
  hasDivider = false
}: SectionProps) {
  const bgStyles = {
    "default": "bg-[var(--background)]",
    "zinc": "bg-[var(--secondary-bg)]/40 backdrop-blur-sm",
    "mesh": "bg-[var(--background)] relative overflow-hidden before:absolute before:inset-0 before:bg-radial-gradient before:from-[rgba(var(--accent-rgb),0.03)] before:to-transparent before:pointer-events-none"
  };

  return (
    <section 
      id={id} 
      className={`relative py-10 md:py-18 z-10 transition-colors duration-200 ${bgStyles[background]} ${
        hasDivider ? "border-t border-[var(--border-secondary)]" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}
