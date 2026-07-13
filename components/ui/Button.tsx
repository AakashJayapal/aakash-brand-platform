"use client";

import React from "react";
import { Magnetic } from "@/components/Magnetic";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "link";
  href?: string;
  magnetic?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

export function Button({ 
  children, 
  variant = "primary", 
  href, 
  magnetic = true, 
  className = "",
  target,
  rel,
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-300 select-none cursor-pointer outline-none focus:ring-2 focus:ring-[var(--accent)]/30 focus:ring-offset-2";

  const variants = {
    primary: "px-8 py-4 bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 shadow-md border border-[var(--border-secondary)]",
    secondary: "px-8 py-4 bg-[var(--secondary-bg)] text-[var(--foreground)] hover:bg-[var(--secondary-bg)]/80 border border-[var(--border-secondary)]",
    outline: "px-8 py-4 bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary-bg)]/50 border border-[var(--border-secondary)]",
    link: "bg-transparent text-[var(--accent)] hover:underline p-0 lowercase font-mono tracking-normal"
  };

  const buttonElement = href ? (
    <a 
      href={href} 
      target={target}
      rel={rel}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ display: "inline-flex" }}
    >
      {children}
    </a>
  ) : (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );

  if (magnetic && variant !== "link") {
    return <Magnetic>{buttonElement}</Magnetic>;
  }

  return buttonElement;
}
