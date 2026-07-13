"use client";

import React from "react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  badge?: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItemProps[];
  className?: string;
}

export function Timeline({ items, className = "" }: TimelineProps) {
  return (
    <div className={`flex flex-col gap-14 relative ${className}`}>
      {items.map((item, index) => (
        <div key={index} className="relative pl-12 reveal-on-scroll">
          {/* Segment line connecting to the next item - stops exactly at the center of the last node */}
          {index < items.length - 1 && (
            <span className="absolute left-[17px] top-[14px] bottom-[-56px] w-[1px] bg-[var(--border-secondary)] z-0" />
          )}
          
          {/* Node dot indicator matching theme accent */}
          <span className="absolute left-[9px] top-1.5 h-[17px] w-[17px] rounded-full bg-[var(--background)] border-2 border-[var(--accent)] shadow-sm transition-colors duration-200 z-10" />
          
          {/* Header layout - Stacks on mobile, splits on desktop */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
            <div className="flex flex-col gap-0.5">
              <h3 className="font-display font-bold text-base sm:text-lg text-[var(--foreground)] leading-tight">
                {item.title}
              </h3>
              <span className="text-xs sm:text-sm font-medium text-[var(--foreground-secondary)]">
                {item.subtitle}
              </span>
            </div>
            {item.badge && (
              <span className="font-mono text-[10px] sm:text-xs text-[var(--foreground-secondary)]/60 sm:self-start mt-1 sm:mt-0">
                {item.badge}
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-[var(--foreground-secondary)]/90 leading-relaxed font-light mt-3.5 max-w-2xl">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
