export interface ProcessStage {
  stage: string;
  name: string;
  desc: string;
}

export const processStages: ProcessStage[] = [
  { stage: "01", name: "Understand", desc: "Extract the core business challenge, user behaviors, technical limitations, and growth metrics." },
  { stage: "02", name: "Question", desc: "Deconstruct requirements, challenge assumptions, and uncover hidden structural bottlenecks." },
  { stage: "03", name: "Discover", desc: "Identify systemic opportunities and workflow simplifications that competitors overlook." },
  { stage: "04", name: "Simplify", desc: "Strip away visual clutter and dense workflows until only the essential user action remains." },
  { stage: "05", name: "Design", desc: "Draft high-fidelity grids, typographical hierarchies, and responsive components using strict system models." },
  { stage: "06", name: "Validate", desc: "Deploy interactive prototypes to real environments, studying heatmaps and cognitive load." },
  { stage: "07", name: "Refine", desc: "Calibrate micro-interactions, shadow elevations, loading sequences, and motion curves." },
  { stage: "08", name: "Launch", desc: "Deliver production-ready files and design structures in absolute sync with frontend developers." },
  { stage: "09", name: "Improve", desc: "Track quantitative metrics, analyze post-launch user data, and continuously iterate the system." }
];
