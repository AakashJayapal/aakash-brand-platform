"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Container } from "./ui/Container";
import { navigationLinks } from "@/content/navigation";
import { useTheme } from "@/components/ThemeContext";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--border-secondary)] py-2 shadow-xs" 
        : "bg-transparent py-4"
    }`}>
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo and AJ Monogram Only */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center gap-3 group" aria-label="AJ Monogram Homepage">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-secondary)] bg-[var(--secondary-bg)] text-[var(--accent)] group-hover:scale-105 transition-transform duration-300 shadow-sm relative overflow-hidden">
                <span className="absolute inset-0 bg-radial from-[var(--accent)]/10 to-transparent" />
                <span className="font-mono text-xs font-black relative z-10 tracking-tighter">AJ</span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Row (All links look identical, theme toggle sits last) */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-1" aria-label="Desktop Navigation">
              {navigationLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="text-[10px] font-mono uppercase tracking-widest text-[var(--foreground-secondary)] hover:text-[var(--accent)] transition-all duration-200 py-1.5 px-3 rounded-full hover:bg-[var(--accent)]/10 border border-transparent hover:border-[var(--accent)]/15 font-semibold"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            
            {/* Theme switcher toggle button - placed last */}
            <button
              onClick={toggleTheme}
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-secondary)] bg-[var(--secondary-bg)]/60 text-[var(--foreground-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/15 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme Color"
            >
              {mounted && theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* Mobile menu trigger + theme switcher */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-secondary)] bg-[var(--secondary-bg)]/60 text-[var(--foreground-secondary)] hover:text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/15 transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme Color"
            >
              {mounted && theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border-secondary)] text-[var(--foreground-secondary)] hover:text-[var(--foreground)] hover:bg-[var(--secondary-bg)] focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-[var(--border-secondary)] bg-[var(--background)]/95 backdrop-blur-xl" id="mobile-menu">
          <Container>
            <nav className="flex flex-col space-y-1.5 py-4" aria-label="Mobile Navigation">
              {navigationLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-xs font-mono uppercase tracking-widest text-[var(--foreground-secondary)] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] hover:border-[var(--accent)]/15 border border-transparent transition-all duration-200 font-semibold"
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
