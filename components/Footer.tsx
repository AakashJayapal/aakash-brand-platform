"use client";

import React from "react";
import { Container } from "./ui/Container";
import { socialChannels } from "@/content/social";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-secondary)] bg-[var(--background)] text-[var(--foreground-secondary)] transition-colors duration-200 py-10 relative z-10">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* AJ Monogram Logo with subtle 6-degree rotation on hover */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-secondary)] bg-[var(--secondary-bg)] text-[var(--accent)] shrink-0 shadow-sm hover:rotate-6 transition-transform duration-300">
              <span className="font-mono text-[9px] font-black tracking-tighter">AJ</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm text-[var(--foreground)] leading-none">Aakash Jayapal</span>
              <p className="text-[10px] text-[var(--foreground-secondary)]/80 font-mono mt-1.5 leading-relaxed">
                Designed and built by Aakash Jayapal. &bull; Namakkal, Tamil Nadu, India
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5 text-[10px] font-mono uppercase tracking-wider shrink-0">
            <div className="flex flex-wrap justify-center gap-4">
              <a href={socialChannels.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">LinkedIn</a>
              <a href={socialChannels.behanceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">Behance</a>
              <a href={`mailto:${socialChannels.email}`} className="hover:text-[var(--foreground)] transition-colors">Email</a>
              <a href={socialChannels.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--foreground)] transition-colors">WhatsApp</a>
            </div>
            
            <a 
              href="#" 
              onClick={scrollToTop} 
              className="flex items-center gap-1 hover:text-[var(--foreground)] text-[var(--accent)] border border-[var(--border-secondary)] hover:border-[var(--accent)]/20 px-3 py-1.5 rounded-full transition-all duration-200"
            >
              Back to Top <ArrowUp className="h-3 w-3" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
