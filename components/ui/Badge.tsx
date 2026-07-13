import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "accent" | "zinc";
}

export function Badge({ children, className = "", variant = "accent" }: BadgeProps) {
  const styles = {
    accent: "bg-blue-600/5 border border-blue-600/15 text-blue-600 dark:text-blue-400",
    zinc: "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide ${styles[variant]} ${className}`}>
      {children}
    </span>
  );
}
