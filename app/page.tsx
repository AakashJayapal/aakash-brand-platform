"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  ArrowRight, Sparkles, ArrowUpRight, 
  MapPin, ExternalLink, Code, Layers, LineChart, 
  Cpu, Compass, Database, Terminal, Calendar,
  GraduationCap, PhoneCall, Mail, Award, Layers3, Smartphone, CompassIcon, ArrowUp
} from "lucide-react";
import dynamic from "next/dynamic";

// Design System Primitives
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Timeline } from "@/components/ui/Timeline";
import { Grid } from "@/components/ui/Grid";

// Dynamic imports of client-only non-critical layout components to decrease initial load bundle
const MouseGlow = dynamic(() => import("@/components/MouseGlow").then((mod) => mod.MouseGlow), { ssr: false });
const ScrollObserver = dynamic(() => import("@/components/ScrollObserver").then((mod) => mod.ScrollObserver), { ssr: false });
const ScrollReveal = dynamic(() => import("@/components/ScrollReveal").then((mod) => mod.ScrollReveal), { ssr: false });

// Content Layer Modules
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { journeyTimeline } from "@/content/experience";
import { skillsGroups } from "@/content/skills";
import { socialChannels } from "@/content/social";

export default function HomePage() {
  const heroImageRef = useRef<HTMLDivElement>(null);
  const heroGlowRef = useRef<HTMLDivElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  // Form submission state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    project: "",
    message: ""
  });

  // Track cursor location relative to hero image for dynamic lighting shifts without state updates
  useEffect(() => {
    // Trigger Hero Load Animation
    setHeroVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (!heroImageRef.current) return;
      const rect = heroImageRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left - rect.width / 2) * 0.05;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.05;
      
      // Update element styles directly via refs to avoid high-frequency React re-renders!
      heroImageRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (heroGlowRef.current) {
        heroGlowRef.current.style.transform = `translate3d(${x * -1.2}px, ${y * -1.2}px, 0)`;
      }
    };

    // Parallax scrolling calculation for about portrait via direct DOM manipulation
    const handleScroll = () => {
      if (!aboutImageRef.current) return;
      const rect = aboutImageRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0) {
        aboutImageRef.current.style.transform = `translate3d(0, ${scrolled * -0.02}px, 0)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const subject = encodeURIComponent(`Project Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Aakash,\n\nI reached out via your digital brand platform.\n\n` +
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n` +
      `Company: ${formData.company || "Not specified"}\n` +
      `Project Description: ${formData.project || "Not specified"}\n\n` +
      `Message:\n${formData.message}`
    );

    window.location.href = `mailto:uiux.aakashjayapal@gmail.com?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
  };

  // Maps the journey timeline nodes directly (Freelance -> Mentor -> Intern) without Today node
  const timelineItems = journeyTimeline.map((node) => ({
    title: node.role,
    subtitle: node.focusArea,
    badge: node.period,
    description: node.impactDescription
  }));

  return (
    <div className="relative min-h-screen">
      {/* Background Glows & Patterns */}
      <MouseGlow />
      <ScrollObserver />
      <div className="absolute inset-0 bg-grid-pattern [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)] pointer-events-none z-0 opacity-40 animate-pulse" />

      {/* 1. Hero Section (Left-aligned grid layout) */}
      <section className="relative min-h-[calc(100vh-60px)] lg:min-h-screen pt-24 pb-8 overflow-hidden flex flex-col justify-center z-10 text-left">
        <Container>
          <Grid columns={12} gap="xl" className="items-center z-20">
            {/* Left Column: Text content (left-aligned) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col items-start gap-5 sm:gap-6">
              {/* Availability tag & Location pills (accent styled) */}
              <div 
                className={`flex flex-wrap items-center gap-2.5 font-mono text-[9px] sm:text-[10px] tracking-widest text-[var(--accent)] font-semibold uppercase transition-all duration-1000 transform ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "150ms" }}
              >
                <span className="px-2.5 py-1 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/15 text-[var(--accent)] font-semibold">
                  AVAILABLE FOR FREELANCE &amp; FULL-TIME
                </span>
                <span className="text-[var(--accent)]/30">&bull;</span>
                <span className="px-2.5 py-1 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/15 text-[var(--accent)] font-semibold">
                  NAMAKKAL, IN
                </span>
              </div>

              {/* Title matching active theme accent */}
              <div 
                className={`transition-all duration-1000 transform ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "300ms" }}
              >
                <Heading level={1} className="font-display font-semibold tracking-tight leading-[0.95] text-[var(--accent)] text-4xl sm:text-7xl lg:text-8xl mt-1">
                  Aakash Jayapal
                </Heading>
              </div>

              {/* Tagline statement */}
              <div 
                className={`flex flex-col items-start gap-3 mt-2 transition-all duration-1000 transform ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "450ms" }}
              >
                <span className="font-display font-semibold text-2xl sm:text-4xl lg:text-5xl text-[var(--foreground)] leading-tight max-w-2xl">
                  Designing products that feel effortless.
                </span>
                <p className="font-body text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed max-w-xl font-light">
                  Freelance Product Designer collaborating with founders and engineering teams to transform complex systems into high-conversion interfaces.
                </p>
              </div>

              {/* Action buttons */}
              <div 
                className={`flex flex-row gap-3 sm:gap-4 mt-4 w-full sm:w-auto transition-all duration-1000 transform ${
                  heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "600ms" }}
              >
                <Button href="#work" variant="primary">
                  View Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button href="#contact" variant="outline" magnetic={true}>
                  Contact Me
                </Button>
              </div>
            </div>

            {/* Right Column: Interactive Portrait image */}
            <div 
              className={`col-span-12 lg:col-span-5 relative mt-8 lg:mt-0 flex justify-center lg:justify-end items-center transition-all duration-1200 transform ${
                heroVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
              style={{ transitionDelay: "750ms" }}
            >
              <div 
                ref={heroGlowRef}
                className="absolute h-64 w-64 rounded-full bg-radial from-[rgba(var(--accent-rgb),0.1)] to-transparent pointer-events-none blur-2xl z-0 transition-transform duration-300"
              />
              
              <div 
                ref={heroImageRef}
                className="relative aspect-[3/4] w-full max-w-[280px] rounded-3xl overflow-hidden blend-portrait-mask z-10 shadow-xl transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-[var(--accent)]/5 mix-blend-multiply z-20 pointer-events-none" />
                <Image
                  src="/aakash-hero.jpg"
                  alt="Aakash Jayapal"
                  fill
                  priority
                  quality={90}
                  decoding="async"
                  sizes="(max-w-768px) 100vw, 30vw"
                  className="object-cover object-top filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 ease-in-out"
                />
              </div>
            </div>
          </Grid>
        </Container>
      </section>

      {/* 2. Selected Work */}
      <Section id="work" background="default" hasDivider={true}>
        <Container>
          <div className="flex flex-col items-center text-center gap-4 mb-20 reveal-on-scroll">
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Featured Work
              </span>
            </div>
            <Heading level={2} className="text-[var(--accent)]">Selected Studies</Heading>
            <p className="text-[var(--foreground-secondary)] text-sm font-light leading-relaxed max-w-xl">
              Displaying select portfolio cases linking to Behance.
            </p>
          </div>

          <div className="flex flex-col gap-24 md:gap-32">
            {projects.map((project, index) => {
              return (
                <div key={project.id} className="reveal-on-scroll">
                  <a 
                    href={project.behanceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-center"
                  >
                    <Grid columns={12} gap="xl" className="items-center">
                      {/* Image Frame */}
                      <div className="col-span-12 lg:col-span-6 flex justify-center">
                        <div className="aspect-video w-full max-w-xl rounded-2xl bg-black border border-[var(--border-secondary)] flex items-center justify-center overflow-hidden relative shadow-md hover-glow-card transition-all duration-500">
                          <div className="absolute inset-0 bg-radial from-[rgba(var(--accent-rgb),0.04)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          
                          <div className="w-[85%] h-[85%] transition-transform duration-700 ease-out group-hover:scale-102">
                            {project.thumbnailType === "hrms" && (
                              <div className="w-full h-full border border-zinc-800 bg-zinc-955 rounded shadow-xs p-4 flex flex-col gap-3 text-left">
                                <div className="flex justify-between items-center text-[8px] font-mono text-zinc-555">
                                  <span className="font-normal text-zinc-200">HRMS Workspace</span>
                                  <span className="text-[var(--accent)] font-normal">Active Session</span>
                                </div>
                                <div className="flex-grow bg-black border border-zinc-900/10 rounded p-2.5 flex flex-col gap-2">
                                  <div className="h-2 bg-zinc-950 w-[40%] rounded-sm" />
                                  <div className="flex gap-2 items-center mt-1">
                                    <div className="h-5 w-5 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] text-[8px] font-normal">AJ</div>
                                    <div className="flex-grow flex flex-col gap-1">
                                      <div className="h-1.5 bg-zinc-950 w-[80%] rounded-sm" />
                                      <div className="h-1 bg-zinc-955/50 w-[50%] rounded-sm" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.thumbnailType === "wash" && (
                              <div className="w-full h-full border border-zinc-800 bg-zinc-955 rounded p-4 flex gap-4 items-center justify-center">
                                <div className="w-[80px] h-[110px] bg-black border border-zinc-900 rounded-xl p-2.5 font-mono text-[7px] text-zinc-555 flex flex-col justify-between text-left">
                                  <div className="flex justify-between items-center border-b border-zinc-900/20 pb-1.5">
                                    <span className="font-normal text-zinc-200">City Wash</span>
                                    <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                                  </div>
                                  <div className="flex-grow flex items-center justify-center my-2">
                                    <div className="h-8 w-8 rounded-full border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-normal text-[9px] relative">
                                      <div className="absolute inset-0.5 rounded-full border border-[var(--accent)]/10 animate-ping" />
                                      GO
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.thumbnailType === "cabs" && (
                              <div className="w-full h-full border border-zinc-800 bg-zinc-955 rounded p-4 font-mono text-[8px] text-zinc-555 flex flex-col gap-2.5 text-left">
                                <div className="flex justify-between items-center border-b border-zinc-900/10 pb-1.5">
                                  <span className="font-normal text-zinc-200">Dispatch Map</span>
                                  <span className="text-[var(--accent)]">4 Online</span>
                                </div>
                                <div className="flex-grow flex gap-2">
                                  <div className="w-[30%] bg-black border border-zinc-900 rounded p-2 flex flex-col gap-1.5">
                                    <div className="h-1 bg-[var(--accent)] rounded-sm w-[90%]" />
                                    <div className="h-1 bg-zinc-950 rounded-sm w-[70%]" />
                                  </div>
                                  <div className="flex-grow bg-black/40 border border-zinc-900 rounded p-2 flex items-center justify-center text-[9px] font-sans">
                                    📍 Map Layout
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.thumbnailType === "petrol" && (
                              <div className="w-full h-full border border-zinc-805 bg-zinc-955 rounded p-4 flex flex-col gap-2 font-mono text-[8px] text-left">
                                <div className="flex justify-between items-center">
                                  <span className="font-normal text-zinc-200">Shift diagnostics</span>
                                  <span className="text-[var(--accent)]">Tally OK</span>
                                </div>
                                <div className="flex-grow bg-black rounded p-2.5 flex items-center justify-between gap-2 border border-zinc-900">
                                  <div className="flex flex-col gap-1.5">
                                    <div className="h-2 w-10 bg-zinc-950 rounded-sm" />
                                    <div className="h-1.5 w-6 bg-zinc-950 rounded-sm" />
                                  </div>
                                  <div className="h-6 w-14 rounded bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-[7px] text-[var(--accent)] font-normal">
                                    LOG SHIFT
                                  </div>
                                </div>
                              </div>
                            )}

                            {project.thumbnailType === "brand" && (
                              <div className="w-full h-full border border-zinc-800 bg-zinc-950 rounded p-4 flex items-center justify-center">
                                <div className="flex flex-col items-center gap-2">
                                  <div className="h-10 w-10 border border-[var(--accent)]/20 rounded-full flex items-center justify-center text-[var(--accent)] font-mono font-normal text-xs relative overflow-hidden">
                                    <span className="absolute inset-0 bg-radial from-[var(--accent)]/10 to-transparent" />
                                    AJ
                                  </div>
                                  <span className="font-mono text-[7px] tracking-widest text-zinc-550 uppercase">Brand System V6</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Content Details (centered) */}
                      <div className="col-span-12 lg:col-span-6 flex flex-col items-center gap-4 text-center">
                        <div className="flex items-center gap-3 border-b border-[var(--border-secondary)] pb-2.5 w-full justify-center">
                          <span className="font-mono text-[9px] sm:text-[10px] text-[var(--accent)] uppercase tracking-wider font-normal">{project.category}</span>
                          <span className="font-mono text-xs text-[var(--foreground-secondary)]/50">&bull;</span>
                          <span className="font-mono text-xs text-[var(--foreground-secondary)]">{project.year}</span>
                        </div>
                        
                        <Heading level={2} className="group-hover:text-[var(--accent)] transition-colors duration-300 flex items-center justify-center gap-2 text-xl sm:text-2xl leading-tight font-semibold text-[var(--foreground)]">
                          {project.title}
                          <ArrowUpRight className="h-4 w-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-[var(--accent)]" />
                        </Heading>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-[9px] text-[var(--foreground-secondary)] w-full text-left">
                          <div className="flex flex-col gap-1 border-l border-[var(--border-secondary)] pl-3">
                            <span className="text-[var(--foreground-secondary)]/70 uppercase tracking-widest font-normal">Context</span>
                            <p className="font-sans text-xs text-[var(--foreground)] font-light mt-0.5">{project.context}</p>
                          </div>
                          <div className="flex flex-col gap-1 border-l border-[var(--border-secondary)] pl-3">
                            <span className="text-[var(--foreground-secondary)]/70 uppercase tracking-widest font-normal">Challenge</span>
                            <p className="font-sans text-xs text-[var(--foreground)] font-light mt-0.5">{project.challenge}</p>
                          </div>
                          <div className="flex flex-col gap-1 border-l border-[var(--border-secondary)] pl-3">
                            <span className="text-[var(--foreground-secondary)]/70 uppercase tracking-widest font-normal">My Role</span>
                            <p className="font-sans text-xs text-[var(--foreground)] font-light mt-0.5">{project.role}</p>
                          </div>
                          <div className="flex flex-col gap-1 border-l border-[var(--border-secondary)] pl-3">
                            <span className="text-[var(--foreground-secondary)]/70 uppercase tracking-widest font-normal">Approach</span>
                            <p className="font-sans text-xs text-[var(--foreground)] font-light mt-0.5">{project.approach}</p>
                          </div>
                          <div className="flex flex-col gap-1 border-l border-[var(--border-secondary)] pl-3 col-span-1 sm:col-span-2">
                            <span className="text-[var(--accent)] uppercase tracking-widest font-normal">Outcome</span>
                            <p className="font-sans text-xs text-[var(--foreground)] font-light mt-0.5">{project.outcome}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 pt-2">
                          {project.techUsed.map((tech, idx) => (
                            <Tag key={idx}>{tech}</Tag>
                          ))}
                        </div>
                      </div>
                    </Grid>
                  </a>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* 3. Behind the Screens Section (Visually balanced and centered image) */}
      <Section id="behind-the-screens" background="default" hasDivider={true}>
        <Container>
          <div className="max-w-5xl mx-auto flex flex-col gap-12 reveal-on-scroll text-center items-center">
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Behind the Screens
              </span>
            </div>
            
            <h3 className="font-display font-semibold text-2xl sm:text-4xl text-[var(--foreground)] leading-tight tracking-tight max-w-3xl text-center mx-auto">
              &ldquo;I learn across boundaries because the most resilient systems are built by connecting unrelated worlds—from the logic of design and the reality of human behavior.&rdquo;
            </h3>

            <Grid columns={12} gap="lg" className="items-center mt-6 w-full max-w-5xl">
              {/* Left Column: Larger Portrait (420-500px wide visually, blended edges, centered) */}
              <div className="col-span-12 md:col-span-5 flex justify-center relative items-center">
                <div 
                  ref={aboutImageRef}
                  className="relative aspect-[4/5] w-full max-w-[340px] md:max-w-[400px] lg:max-w-[450px] z-10 transition-transform duration-300 ease-out overflow-hidden rounded-3xl"
                >
                  {/* Soft radial overlay to blend background naturally */}
                  <div 
                    className="absolute inset-0 z-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at center, transparent 38%, var(--background) 100%)`
                    }}
                  />
                  <div className="absolute inset-0 bg-[var(--accent)]/5 mix-blend-multiply z-20 pointer-events-none" />
                  <Image
                    src="/aakash-about.jpg"
                    alt="Aakash Jayapal Storyboard"
                    fill
                    loading="lazy"
                    quality={85}
                    decoding="async"
                    sizes="(max-w-768px) 100vw, 40vw"
                    className="object-cover filter contrast-105"
                  />
                </div>
              </div>

              {/* Right Column: Concise text + Balanced Tags row (left-aligned) */}
              <div className="col-span-12 md:col-span-7 flex flex-col gap-6 text-[var(--foreground-secondary)] font-light text-base leading-relaxed text-left items-start pl-0 md:pl-4">
                {profile.behindScreensParagraphs.map((para, idx) => (
                  <p key={idx} className="max-w-xl">{para}</p>
                ))}

                {/* Fact Tags - Two Balanced Rows with Consistent Spacing */}
                <div className="flex flex-col gap-3 w-full border-t border-[var(--border-secondary)]/50 pt-6 mt-2">
                  {/* Row 1 */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center md:justify-start">
                    {["Movie Enthusiast", "AI Explorer", "Systems Thinker", "Problem Solver"].map((tag) => (
                      <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)] px-3 py-1.5 rounded-full bg-[var(--secondary-bg)] border border-[var(--border-secondary)]/50">
                        • {tag}
                      </span>
                    ))}
                  </div>
                  {/* Row 2 */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-4 justify-center md:justify-start">
                    {["Lifelong Learner", "Detail Oriented", "Builder", "Creative Technologist"].map((tag) => (
                      <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-[var(--foreground)] px-3 py-1.5 rounded-full bg-[var(--secondary-bg)] border border-[var(--border-secondary)]/50">
                        • {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* 4. Journey Section */}
      <Section id="journey" background="default" hasDivider={true}>
        <Container>
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4 mb-16 reveal-on-scroll">
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Trajectory
              </span>
            </div>
            <Heading level={2} className="text-[var(--accent)]">My Journey</Heading>
            <p className="text-[var(--foreground-secondary)] text-sm font-light leading-relaxed">
              Academic baselines, internship sprints, mentoring logs, and product design checkpoints.
            </p>
          </div>

          <div className="max-w-4xl mx-auto reveal-on-scroll text-left">
            <Timeline items={timelineItems} />
          </div>
        </Container>
      </Section>

      {/* 5. Things I Designed Section */}
      <Section id="things-built" background="zinc" hasDivider={true}>
        <Container>
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4 mb-16 reveal-on-scroll">
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Capability Groups
              </span>
            </div>
            <Heading level={2} className="text-[var(--accent)]">Things I Designed</Heading>
            <p className="text-[var(--foreground-secondary)] text-sm font-light leading-relaxed">
              Organized design systems, responsive SaaS dashboards, software interfaces, and branding guidelines delivered to clients.
            </p>
          </div>

          <Grid columns={3} gap="lg">
            <Card accentColor="var(--accent)" className="reveal-on-scroll border border-[var(--border-secondary)] text-center flex flex-col items-center" hoverable={true}>
              <Layers3 className="h-5 w-5 text-[var(--accent)] mb-4" />
              <Heading level={3} className="mb-2 text-[var(--foreground)]">SaaS &amp; HRMS Platforms</Heading>
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                Complete Human Resource Management system covering recruitment pipelines, attendance logging, payroll tables, and enterprise analytics dashboards.
              </p>
            </Card>

            <Card accentColor="var(--accent)" className="reveal-on-scroll border border-[var(--border-secondary)] text-center flex flex-col items-center" hoverable={true}>
              <Smartphone className="h-5 w-5 text-[var(--accent)] mb-4" />
              <Heading level={3} className="mb-2 text-[var(--foreground)]">City Wash Mobile App</Heading>
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                Laundry management dashboard, client landing page, and operations tracking application built for drivers and facility staff.
              </p>
            </Card>

            <Card accentColor="var(--accent)" className="reveal-on-scroll border border-[var(--border-secondary)] text-center flex flex-col items-center" hoverable={true}>
              <CompassIcon className="h-5 w-5 text-[var(--accent)] mb-4" />
              <Heading level={3} className="mb-2 text-[var(--foreground)]">Milo Cabs Fleet Interface</Heading>
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                Operational dashboards and dispatch logistics tables mapping vehicle routes and passenger assignments.
              </p>
            </Card>

            <Card accentColor="var(--accent)" className="reveal-on-scroll border border-[var(--border-secondary)] text-center flex flex-col items-center" hoverable={true}>
              <Cpu className="h-5 w-5 text-[var(--accent)] mb-4" />
              <Heading level={3} className="mb-2 text-[var(--foreground)]">Petrol Bunk Management</Heading>
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                Mobile-first management app tracking daily fuel nozzle transactions, tank volume levels, and sales logs.
              </p>
            </Card>

            <Card accentColor="var(--accent)" className="reveal-on-scroll border border-[var(--border-secondary)] text-center flex flex-col items-center" hoverable={true}>
              <Layers className="h-5 w-5 text-[var(--accent)] mb-4" />
              <Heading level={3} className="mb-2 text-[var(--foreground)]">Brand Identity &amp; Logo Design</Heading>
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                Minimal vector logomarks, color system documentation, and comprehensive typography guidelines designed for startups.
              </p>
            </Card>

            <Card accentColor="var(--accent)" className="reveal-on-scroll border border-[var(--border-secondary)] text-center flex flex-col items-center" hoverable={true}>
              <Smartphone className="h-5 w-5 text-[var(--accent)] mb-4" />
              <Heading level={3} className="mb-2 text-[var(--foreground)]">Social Media Campaigns</Heading>
              <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                Developing visual campaign promotional slides, digital banners, marketing flyers, and AI-generated creative assets.
              </p>
            </Card>
          </Grid>
        </Container>
      </Section>

      {/* 6. Currently Building */}
      <Section id="currently-building" background="default" hasDivider={true}>
        <Container>
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-4 mb-16 reveal-on-scroll">
            <div className="flex justify-center w-full">
              <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--accent)]/5 border border-[var(--accent)]/15 text-[var(--accent)] text-[10px] font-mono uppercase tracking-widest font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
                </span>
                ACTIVE R&amp;D
              </span>
            </div>
            <Heading level={2} className="text-[var(--accent)]">Currently Building</Heading>
            <p className="text-sm sm:text-base text-[var(--foreground-secondary)] leading-relaxed font-light max-w-xl">
              Alongside client projects, I design and code long-term products to test usability rules, data models, and front-end tools.
            </p>
          </div>

          <Grid columns={2} gap="lg">
            {/* Project 01 */}
            <Card className="reveal-on-scroll border border-[var(--border-secondary)] bg-[var(--secondary-bg)]/20 rounded-3xl flex flex-col gap-4 justify-between text-center items-center p-8" hoverable={true}>
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-bold">Project 01</span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[8px] font-mono font-normal">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]"></span>
                    </span>
                    In Development
                  </span>
                </div>
                <Heading level={3} className="text-lg sm:text-xl text-[var(--foreground)]">CMS Portfolio Platform</Heading>
                <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed font-light mt-2 max-w-sm">
                  An intelligent content-driven portfolio platform designed to give creators complete control over storytelling, content management and long-term scalability without sacrificing performance or design quality.
                </p>
              </div>
            </Card>

            {/* Project 02 */}
            <Card className="reveal-on-scroll border border-[var(--border-secondary)] bg-[var(--secondary-bg)]/20 rounded-3xl flex flex-col gap-4 justify-between text-center items-center p-8" hoverable={true}>
              <div className="flex flex-col gap-3 items-center w-full">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] font-mono text-[var(--accent)] uppercase tracking-wider font-bold">Project 02</span>
                  <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[var(--accent)]/10 text-[var(--accent)] text-[8px] font-mono font-normal">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[var(--accent)]"></span>
                    </span>
                    Active R&amp;D
                  </span>
                </div>
                <Heading level={3} className="text-lg sm:text-xl text-[var(--foreground)]">AI-powered Business Operating System</Heading>
                <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed font-light mt-2 max-w-sm">
                  An AI-powered Business Operating System designed to unify CRM, project management, finance, documents, communication and workflow automation into one intelligent workspace. Built to eliminate fragmented tools and help businesses make faster, smarter decisions through AI.
                </p>
              </div>
            </Card>
          </Grid>

          {/* Game loading progress loader sweep in center */}
          <div className="flex flex-col items-center gap-3 mt-12 reveal-on-scroll">
            <span className="text-[10px] text-[var(--accent)] font-mono uppercase tracking-widest font-normal text-center">
              Coming soon
            </span>
            <div className="w-48 h-1 bg-[var(--border-secondary)] rounded-full overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-[var(--accent)] rounded-full animate-game-loader" />
            </div>
            
            {/* Self-contained CSS loading bar animation */}
            <style dangerouslySetInnerHTML={{__html: `
              @keyframes game-loader-sweep {
                0% { width: 0%; }
                100% { width: 100%; }
              }
              .animate-game-loader {
                animation: game-loader-sweep 2.2s infinite cubic-bezier(0.4, 0, 0.2, 1);
              }
            `}} />
          </div>
        </Container>
      </Section>

      {/* 7. Design Philosophy */}
      <Section id="philosophy" background="zinc" hasDivider={true}>
        <Container>
          <div className="max-w-4xl mx-auto py-8 reveal-on-scroll flex flex-col items-center gap-12 text-center">
            {/* Pill wrapper centering capsule layout without stretching */}
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Design Philosophy
              </span>
            </div>
            
            {/* Exactly 2 lines statement */}
            <p className="text-xl sm:text-3xl text-[var(--foreground)] font-light leading-relaxed text-center font-display tracking-tight">
              &ldquo;Good design removes complexity before adding aesthetics.<br />
              Consistency establishes trust at every touchpoint.&rdquo;
            </p>

            {/* Restored 3 Cards below quote */}
            <Grid columns={3} gap="lg" className="mt-6 w-full">
              <Card hoverable={true} className="border border-[var(--border-secondary)] bg-[var(--background)]/60 p-6 text-center flex flex-col items-center">
                <span className="font-display font-semibold text-xs text-[var(--accent)] uppercase tracking-wider block mb-2">CLARITY</span>
                <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                  Good design removes confusion before adding beauty.
                </p>
              </Card>

              <Card hoverable={true} className="border border-[var(--border-secondary)] bg-[var(--background)]/60 p-6 text-center flex flex-col items-center">
                <span className="font-display font-semibold text-xs text-[var(--accent)] uppercase tracking-wider block mb-2">TRUST</span>
                <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                  Consistency builds confidence through every interaction.
                </p>
              </Card>

              <Card hoverable={true} className="border border-[var(--border-secondary)] bg-[var(--background)]/60 p-6 text-center flex flex-col items-center">
                <span className="font-display font-semibold text-xs text-[var(--accent)] uppercase tracking-wider block mb-2">CRAFT</span>
                <p className="text-xs text-[var(--foreground-secondary)] leading-relaxed font-light">
                  Every detail deserves intention because small decisions shape memorable experiences.
                </p>
              </Card>
            </Grid>
          </div>
        </Container>
      </Section>

      {/* 8. Capabilities */}
      <Section id="skills" background="default" hasDivider={true}>
        <Container>
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4 mb-16 reveal-on-scroll">
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Capabilities
              </span>
            </div>
            <Heading level={2} className="text-[var(--accent)]">Services, Skills &amp; Tools</Heading>
            <p className="text-[var(--foreground-secondary)] text-sm font-light leading-relaxed">
              Specialties, visual methodologies, and design tools integrated during product design sprints.
            </p>
          </div>

          <Grid columns={3} gap="lg">
            {skillsGroups.map((group, index) => (
              <Card 
                key={index}
                className="bg-[var(--secondary-bg)]/10 border border-[var(--border-secondary)] p-6 rounded-2xl flex flex-col gap-4 reveal-on-scroll text-center items-center"
                hoverable={true}
              >
                <div className="flex flex-col gap-1 pb-3 border-b border-[var(--border-secondary)] w-full text-center">
                  <span className="font-mono text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">{group.category}</span>
                </div>
                {/* Bullets left-aligned only and off-white/gray bullet indicator colors */}
                <ul className="flex flex-col gap-2.5 font-mono text-[10px] text-[var(--foreground-secondary)] pt-4 text-left items-start w-full">
                  {group.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground-secondary)]/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* 9. Contact */}
      <Section id="contact" background="zinc" hasDivider={true}>
        <Container>
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4 mb-16 reveal-on-scroll">
            <div className="flex justify-center w-full">
              <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[var(--accent)] px-3 py-1 bg-[var(--accent)]/5 border border-[var(--accent)]/15 rounded-full font-semibold">
                Contact
              </span>
            </div>
            <Heading level={2} className="text-[var(--accent)]">Let&apos;s build something meaningful together.</Heading>
            <p className="text-xs sm:text-sm text-[var(--foreground-secondary)] leading-relaxed font-light max-w-md">
              Whether you&apos;re hiring, building a product, or exploring a new idea, I&apos;d love to hear about it.
            </p>
          </div>

          <Grid asymmetric={true} columns={12} className="items-start gap-12">
            {/* Left Column Info */}
            <div className="col-span-12 lg:col-span-5 flex flex-col items-center gap-6 reveal-on-scroll text-center mx-auto max-w-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-[var(--accent)] bg-zinc-955 shadow-md">
                  <Image
                    src="/aakash-portrait.jpg"
                    alt="Aakash Jayapal"
                    fill
                    loading="lazy"
                    quality={80}
                    decoding="async"
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-semibold text-[var(--foreground)] text-sm">Aakash Jayapal</span>
                  <span className="text-xs text-[var(--foreground-secondary)] flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-[var(--accent)]" /> {socialChannels.locationLabel}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 font-mono text-[10px] text-[var(--foreground-secondary)]">
                <span className="text-zinc-555 uppercase">Open for:</span>
                <p className="text-[var(--foreground)] text-xs font-sans">Full-time, Remote, Freelance, Contract</p>
              </div>

              {/* Action grid */}
              <div className="grid grid-cols-2 gap-3.5 w-full pt-4 border-t border-[var(--border-secondary)]">
                <a 
                  href={socialChannels.whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1 p-4 border border-[var(--accent)]/30 bg-[var(--secondary-bg)]/20 rounded-xl hover:border-[var(--accent)]/60 transition-all duration-300 group shadow-2xs relative overflow-hidden text-center items-center"
                >
                  <div className="absolute top-0 right-0 px-1.5 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-[7px] font-mono uppercase tracking-widest font-normal rounded-bl-lg">
                    Fastest
                  </div>
                  <span className="text-[8px] font-mono text-[var(--accent)] uppercase font-normal">WhatsApp</span>
                  <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                    Chat Now <PhoneCall className="h-3 w-3" />
                  </span>
                </a>

                <a 
                  href={`mailto:${socialChannels.email}`}
                  className="flex flex-col gap-1 p-4 border border-[var(--border-secondary)] bg-[var(--background)]/40 rounded-xl hover:border-[var(--accent)]/20 transition-all duration-300 group shadow-2xs text-center items-center"
                >
                  <span className="text-[8px] font-mono text-zinc-555 uppercase">Email</span>
                  <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                    Mail Direct <Mail className="h-3 w-3" />
                  </span>
                </a>

                <a 
                  href={socialChannels.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col gap-1 p-4 border border-[var(--border-secondary)] bg-[var(--background)]/40 rounded-xl hover:border-[var(--accent)]/20 transition-all duration-300 group shadow-2xs text-center items-center"
                >
                  <span className="text-[8px] font-mono text-zinc-555 uppercase">LinkedIn</span>
                  <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                    Connect <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                <a 
                  href={socialChannels.behanceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex flex-col gap-1 p-4 border border-[var(--border-secondary)] bg-[var(--background)]/40 rounded-xl hover:border-[var(--accent)]/20 transition-all duration-300 group shadow-2xs text-center items-center"
                >
                  <span className="text-[8px] font-mono text-zinc-555 uppercase">Behance</span>
                  <span className="text-xs font-medium text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors flex items-center gap-1">
                    Portfolio <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              </div>

              <div className="pt-2 w-full">
                <Button href="/resume.pdf" variant="primary" className="w-full justify-center font-medium">
                  Download Resume
                </Button>
              </div>
            </div>

            {/* Right Column Form */}
            <div className="col-span-12 lg:col-span-7 reveal-on-scroll">
              <Card hoverable={false} className="border border-[var(--border-secondary)] bg-[var(--background)]/80 p-8 rounded-3xl shadow-xs">
                <Heading level={3} className="text-[var(--accent)] mb-6 text-xl text-center">Send a Message</Heading>
                
                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 text-center flex flex-col items-center gap-4">
                    <span className="h-10 w-10 rounded-full bg-[var(--accent)] text-[var(--background)] flex items-center justify-center font-bold text-lg">✓</span>
                    <Heading level={4} className="text-[var(--foreground)]">Draft Generated Successfully</Heading>
                    <p className="text-xs text-[var(--foreground-secondary)] max-w-sm leading-relaxed">
                      Your mail client has been opened with your message. Please click &ldquo;Send&rdquo; in your email client to deliver the message directly to <strong className="text-[var(--foreground)]">uiux.aakashjayapal@gmail.com</strong>.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      type="button"
                      className="text-xs font-mono uppercase text-[var(--accent)] hover:underline mt-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="flex flex-col gap-5 text-xs text-[var(--foreground)] text-left">
                    <Grid columns={2} gap="md">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-name" className="font-mono text-[9px] uppercase tracking-wider text-[var(--foreground-secondary)]">Name *</label>
                        <input 
                          type="text" 
                          id="form-name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Your name" 
                          className="w-full px-4 py-3 bg-[var(--secondary-bg)]/40 border border-[var(--border-secondary)] rounded-xl outline-none focus:border-[var(--accent)] transition-all font-sans text-xs text-[var(--foreground)]"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-email" className="font-mono text-[9px] uppercase tracking-wider text-[var(--foreground-secondary)]">Email *</label>
                        <input 
                          type="email" 
                          id="form-email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Your email" 
                          className="w-full px-4 py-3 bg-[var(--secondary-bg)]/40 border border-[var(--border-secondary)] rounded-xl outline-none focus:border-[var(--accent)] transition-all font-sans text-xs text-[var(--foreground)]"
                        />
                      </div>
                    </Grid>

                    <Grid columns={2} gap="md">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-company" className="font-mono text-[9px] uppercase tracking-wider text-[var(--foreground-secondary)]">Company</label>
                        <input 
                          type="text" 
                          id="form-company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          placeholder="Your company name" 
                          className="w-full px-4 py-3 bg-[var(--secondary-bg)]/40 border border-[var(--border-secondary)] rounded-xl outline-none focus:border-[var(--accent)] transition-all font-sans text-xs text-[var(--foreground)]"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="form-project" className="font-mono text-[9px] uppercase tracking-wider text-[var(--foreground-secondary)]">Project Type</label>
                        <input 
                          type="text" 
                          id="form-project"
                          name="project"
                          value={formData.project}
                          onChange={handleInputChange}
                          placeholder="e.g. Mobile App, Branding" 
                          className="w-full px-4 py-3 bg-[var(--secondary-bg)]/40 border border-[var(--border-secondary)] rounded-xl outline-none focus:border-[var(--accent)] transition-all font-sans text-xs text-[var(--foreground)]"
                        />
                      </div>
                    </Grid>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="form-message" className="font-mono text-[9px] uppercase tracking-wider text-[var(--foreground-secondary)]">Message *</label>
                      <textarea 
                        id="form-message"
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell me about your project..." 
                        className="w-full px-4 py-3 bg-[var(--secondary-bg)]/40 border border-[var(--border-secondary)] rounded-xl outline-none focus:border-[var(--accent)] transition-all font-sans text-xs resize-none text-[var(--foreground)]"
                      />
                    </div>

                    <div className="pt-2">
                      <Button type="submit" variant="primary" className="w-full py-4.5! justify-center font-medium">
                        Submit Inquiry
                      </Button>
                    </div>
                  </form>
                )}
              </Card>
            </div>
          </Grid>
        </Container>
      </Section>
    </div>
  );
}
