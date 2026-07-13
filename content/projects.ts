export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  behanceUrl: string;
  accentColor: string;
  thumbnailType: "hrms" | "wash" | "cabs" | "petrol" | "brand";
  tags: string[];
  context: string;
  challenge: string;
  role: string;
  approach: string;
  outcome: string;
  techUsed: string[];
}

export const projects: Project[] = [
  {
    id: "hrms-platform",
    title: "HRMS Platform",
    category: "SaaS Platforms",
    year: "2025",
    behanceUrl: "https://www.behance.net/aakashjayapaluiux",
    accentColor: "#52B788",
    thumbnailType: "hrms",
    tags: ["Product Design", "UX Systems", "Admin Dashboards"],
    context: "An enterprise employee workspace simplifying administrative, attendance, and payroll tasks.",
    challenge: "Fragmented spreadsheet tracking led to double-entry payroll discrepancies and reporting delays.",
    role: "Lead UX Researcher & Interaction Designer (User testing, layout grids, components)",
    approach: "Designed a centralized visual workspace with calendar updates and state indication rows.",
    outcome: "Eliminated payroll entry errors by 98% and reduced monthly auditing cycles from days to hours.",
    techUsed: ["Figma", "Design Systems", "Component Libraries"]
  },
  {
    id: "city-wash",
    title: "City Wash Mobile App",
    category: "Mobile Applications",
    year: "2025",
    behanceUrl: "https://www.behance.net/aakashjayapaluiux",
    accentColor: "#F26A2E",
    thumbnailType: "wash",
    tags: ["Mobile UI/UX", "Interaction Design", "Prototyping"],
    context: "On-demand laundry ecosystem connecting consumers, drivers, and cleaning facilities.",
    challenge: "Operational gaps in driver dispatching caused transit delays and high order cancellation rates.",
    role: "Mobile UI/UX & Interaction Designer (Journey mapping, wireframes, user testing)",
    approach: "Mapped separate user journeys for drivers and dispatchers, designing large touch target screens.",
    outcome: "Cut order dispatch delays by 35% and increased driver route efficiency.",
    techUsed: ["Figma", "Interaction Design", "Prototyping"]
  },
  {
    id: "milo-cabs",
    title: "Milo Cabs Platform",
    category: "Product Design",
    year: "2024",
    behanceUrl: "https://www.behance.net/aakashjayapaluiux",
    accentColor: "#52B788",
    thumbnailType: "cabs",
    tags: ["Interface Design", "Dashboard Systems", "Usability"],
    context: "Logistics and dispatch interface for city cab operators.",
    challenge: "Dispatcher fatigue due to cluttered visual maps and delayed trip assignments.",
    role: "Interface & Product Designer (Usability testing, wireframes, style guides)",
    approach: "Structured a high-density operator workspace prioritizing active status queues and map layouts.",
    outcome: "Improved trip dispatch time by 22% and reduced operator report overhead.",
    techUsed: ["Figma", "Dashboard Design", "Usability Testing"]
  },
  {
    id: "petrol-bunk-management",
    title: "Petrol Bunk Management",
    category: "Mobile Design",
    year: "2024",
    behanceUrl: "https://www.behance.net/aakashjayapaluiux",
    accentColor: "#F26A2E",
    thumbnailType: "petrol",
    tags: ["Mobile App UI", "UX Research", "Figma Design"],
    context: "Mobile sales and inventory diagnostics utility for petrol stations.",
    challenge: "Station operators lost transaction hours entering pump volumes manually at shift transitions.",
    role: "Mobile UI Designer (Grid layouts, workflow visualisations)",
    approach: "Designed a single-screen layout with large touch targets for shift logs and pump tallies.",
    outcome: "Reduced shift transition log times to under 3 minutes.",
    techUsed: ["Figma", "Mobile UI", "Information Architecture"]
  },
  {
    id: "brand-identity-design",
    title: "Brand Identity & Design",
    category: "Brand & Visual Design",
    year: "2023",
    behanceUrl: "https://www.behance.net/aakashjayapaluiux",
    accentColor: "#52B788",
    thumbnailType: "brand",
    tags: ["Visual Design", "Logo Design", "Corporate Identity"],
    context: "Visual corporate style guidelines and vector assets for new ventures.",
    challenge: "Inconsistent visual assets across portals reduced client brand recall and trust.",
    role: "Brand & Visual Identity Designer (Vector systems, color guidelines, assets)",
    approach: "Defined minimal vector logomarks, typography scales, and a responsive asset framework.",
    outcome: "Increased unified brand recall by 40% across client communication touchpoints.",
    techUsed: ["Adobe Illustrator", "Photoshop", "Brand Guidelines"]
  }
];
