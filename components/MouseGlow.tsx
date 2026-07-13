"use client";

import React, { useEffect, useState } from "react";

export function MouseGlow() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [hue, setHue] = useState(0);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });

      // Check if mouse is pointing at a button, anchor link, input, textarea, or pointer element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = 
          target.closest("button") || 
          target.closest("a") || 
          target.closest("input") || 
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          window.getComputedStyle(target).cursor === "pointer";
          
        setIsOverInteractive(!!isInteractive);
      }
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Dynamic rainbow cycling ticker
    let frame: number;
    const tick = () => {
      setHue(prev => (prev + 0.8) % 360);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    // Initial trigger
    setOpacity(0.85);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Reduce mouse glow intensity but don't shut it off completely (from 20% down to a subtle 4% when hovering interactive items)
  const glowOpacity = isOverInteractive ? 0.04 : 0.20;
  const glowSecondaryOpacity = isOverInteractive ? 0.005 : 0.02;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ease-out"
      style={{
        opacity,
        background: `radial-gradient(550px circle at ${coords.x}px ${coords.y}px, hsla(${hue}, 70%, 60%, ${glowOpacity}) 0%, hsla(${(hue + 60) % 360}, 70%, 60%, ${glowSecondaryOpacity}) 45%, transparent 80%)`,
      }}
    />
  );
}
