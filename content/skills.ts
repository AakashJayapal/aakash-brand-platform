export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillsGroups: SkillGroup[] = [
  {
    category: "Services",
    items: [
      "Product Design",
      "UX Research",
      "Design Systems",
      "Web Design",
      "Mobile Applications",
      "Brand Identity",
      "Logo Design",
      "Creative Direction",
      "AI Creative Solutions"
    ]
  },
  {
    category: "Skills",
    items: [
      "Information Architecture",
      "Interaction Design",
      "Wireframing",
      "Prototyping",
      "Accessibility",
      "Design Strategy",
      "Visual Systems",
      "Prompt Engineering"
    ]
  },
  {
    category: "Tools",
    items: [
      "Figma",
      "Photoshop",
      "Illustrator",
      "Cursor",
      "VS Code",
      "GitHub",
      "ChatGPT",
      "Claude",
      "Gemini",
      "Antigravity"
    ]
  }
];

// Backwards compatibility declarations
export const skillsList = [];
export const skillsData = [];
