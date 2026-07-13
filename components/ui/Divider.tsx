import React from "react";

interface DividerProps {
  className?: string;
  spacing?: "sm" | "md" | "lg";
}

export function Divider({ className = "", spacing = "md" }: DividerProps) {
  const marginStyles = {
    sm: "my-8",
    md: "my-16 md:my-24",
    lg: "my-24 md:my-36"
  };

  return (
    <hr 
      className={`border-t border-zinc-200/60 dark:border-zinc-800/60 w-full ${marginStyles[spacing]} ${className}`} 
    />
  );
}
