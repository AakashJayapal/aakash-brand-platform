"use client";

import React, { useRef, useState, useEffect } from "react";

interface MagneticProps {
  children: React.ReactElement<any>;
  range?: number;
  strength?: number;
}

export function Magnetic({ children, range = 50, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distanceX = clientX - centerX;
      const distanceY = clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < range) {
        setPosition({
          x: distanceX * strength,
          y: distanceY * strength,
        });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (element) {
        element.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [range, strength]);

  const childStyle = (children && children.props && children.props.style) || {};

  return React.cloneElement(children, {
    ref,
    style: {
      ...childStyle,
      transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      transition: position.x !== 0 ? "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
    },
  });
}
