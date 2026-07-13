export interface JourneyNode {
  role: string;
  focusArea: string;
  period: string;
  impactDescription: string;
  type: "experience" | "education";
}

export const journeyTimeline: JourneyNode[] = [
  {
    role: "Freelance Product Designer",
    focusArea: "Self-Employed",
    period: "Nov 2025 – Present",
    impactDescription: "Currently working with startups, founders, and growing businesses to design digital products, websites, brand identities, and AI-assisted creative solutions.\n\nRecent client work includes designing the complete brand identity for Ayur OG, creating the logo and brand guidelines for WebXode, designing the Aishwarya Art Gallery website, and producing social media creatives and AI-generated promotional videos for Zeal Globe Technologies.\n\nAlongside client projects, I continue exploring AI-powered workflows, building scalable design systems, and developing long-term software products that reflect my vision for the future of digital experiences.",
    type: "experience"
  },
  {
    role: "UI/UX Mentor",
    focusArea: "GUVI • Naan Mudhalvan Scheme",
    period: "Aug 2025 – Nov 2025",
    impactDescription: "Mentored third-year Computer Science students from SKP Engineering College through a 12-week UI/UX Design Program. Guided students in Design Thinking, User Experience, Figma, Wireframing, Prototyping, and real-world product design workflows while helping them understand industry-standard design practices.",
    type: "experience"
  },
  {
    role: "UI/UX Design Intern",
    focusArea: "Least Action",
    period: "May 2025 – Aug 2025",
    impactDescription: "Designed and improved digital experiences across Milo Cabs, City Wash, Tvaster, and the Genkalp website. Collaborated closely with developers and stakeholders to transform business requirements into intuitive user interfaces, responsive layouts, and scalable design solutions while gaining hands-on experience in real-world product development.",
    type: "experience"
  }
];

// Backwards compatibility declarations
export const experience = [];
export const experienceJourney = [];
export const educationData = [];
export const certificationsData = [];
