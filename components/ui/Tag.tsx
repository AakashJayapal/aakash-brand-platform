import React from "react";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export function Tag({ children, className = "" }: TagProps) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded bg-[var(--secondary-bg)]/80 border border-[var(--border-primary)] text-[10px] font-mono uppercase tracking-widest text-[var(--foreground-secondary)] ${className}`}>
      {children}
    </span>
  );
}
