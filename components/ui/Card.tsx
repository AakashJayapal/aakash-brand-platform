"use client";

import React, { useRef, useState } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  accentColor?: string;
}

export function Card({ 
  children, 
  className = "", 
  hoverable = true,
  onClick,
  accentColor
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - left,
      y: e.clientY - top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-[var(--border-secondary)] bg-[var(--secondary-bg)]/15 p-8 transition-all duration-300 ${
        hoverable ? "hover:border-[var(--accent)]/35 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(var(--accent-rgb),0.12)]" : ""
      } ${onClick ? "cursor-pointer" : ""} ${className}`}
      style={{
        outline: isHovered && accentColor ? `1px solid ${accentColor}30` : undefined,
      }}
    >
      {/* Dynamic Cursor Spotlight Overlay in Accent color */}
      {hoverable && isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, rgba(var(--accent-rgb), 0.06) 0%, transparent 80%)`,
          }}
        />
      )}
      
      {/* Decorative accent highlight line */}
      {accentColor && (
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: accentColor }}
        />
      )}

      <div className="relative z-10 flex flex-col h-full">
        {children}
      </div>
    </div>
  );
}
