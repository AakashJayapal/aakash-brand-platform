export interface MentorshipDetails {
  title: string;
  role: string;
  initiative: string;
  duration: string;
  institution: string;
  location: string;
  description: string;
  responsibilities: string[];
}

export const mentorshipData: MentorshipDetails = {
  title: "Teaching & Mentorship",
  role: "UI/UX Mentor",
  initiative: "GUVI – Naan Mudhalvan Initiative",
  duration: "Aug 2025 – Nov 2025",
  institution: "SKP Engineering College",
  location: "Tiruvannamalai, India",
  description: "Delivered a structured 12-week UI/UX Design program for third-year B.E. Computer Science students, bridge-building the gap between academic theory and active tech-industry execution parameters.",
  responsibilities: [
    "Introducing UI/UX fundamentals and human-centered heuristics",
    "Fostering Design Thinking processes and active user research models",
    "Structuring wireframing practices and high-fidelity interactive prototyping",
    "Collaborating through industry-standard Figma workflows and files setup",
    "Designing robust component architectures and reusable design systems",
    "Providing personal portfolio critiques and professional career guidance",
    "Instilling real-world collaborative practices and communication habits"
  ]
};
