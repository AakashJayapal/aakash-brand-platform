"use client";

import React, { useEffect, useRef } from "react";

export function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseCoords = useRef({ x: 0, y: 0 });
  const targetCoords = useRef({ x: 0, y: 0 });
  const isOverInteractiveRef = useRef(false);
  const opacityRef = useRef(0);
  const hueRef = useRef(0);

  useEffect(() => {
    // Disable mouse glow on mobile/tablet viewports or touch devices to save resources
    if (window.innerWidth < 1024 || 'ontouchstart' in window || navigator.maxTouchPoints > 0) {
      if (glowRef.current) {
        glowRef.current.style.display = "none";
      }
      return;
    }

    // Set initial opacity to fade in after page paint
    opacityRef.current = 0.85;

    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.current = { x: e.clientX, y: e.clientY };

      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = 
          target.closest("button") || 
          target.closest("a") || 
          target.closest("input") || 
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          window.getComputedStyle(target).cursor === "pointer";
          
        isOverInteractiveRef.current = !!isInteractive;
      }
    };

    const handleMouseEnter = () => {
      opacityRef.current = 0.85;
    };
    const handleMouseLeave = () => {
      opacityRef.current = 0;
    };

    // Use passive event listener for best scrolling performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.body.addEventListener("mouseenter", handleMouseEnter);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    let frame: number;
    const tick = () => {
      // Linear interpolation (LERP) for smooth ease lag
      targetCoords.current.x += (mouseCoords.current.x - targetCoords.current.x) * 0.15;
      targetCoords.current.y += (mouseCoords.current.y - targetCoords.current.y) * 0.15;

      // Cycle hue color wheel
      hueRef.current = (hueRef.current + 0.8) % 360;

      if (glowRef.current) {
        const glowOpacity = isOverInteractiveRef.current ? 0.04 : 0.20;
        const glowSecondaryOpacity = isOverInteractiveRef.current ? 0.005 : 0.02;

        glowRef.current.style.opacity = String(opacityRef.current);
        glowRef.current.style.background = `radial-gradient(550px circle at ${targetCoords.current.x}px ${targetCoords.current.y}px, hsla(${hueRef.current}, 70%, 60%, ${glowOpacity}) 0%, hsla(${(hueRef.current + 60) % 360}, 70%, 60%, ${glowSecondaryOpacity}) 45%, transparent 80%)`;
      }

      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 ease-out"
      style={{ opacity: 0 }}
    />
  );
}
