export interface Certification {
  title: string;
  issuer: string;
  year: string;
  credentialUrl?: string;
}

export const certificationsData: Certification[] = [
  {
    title: "UI/UX Design Specialist",
    issuer: "GUVI Geek Network",
    year: "2023"
  },
  {
    title: "Professional UX Design Certification",
    issuer: "Coursera / Google Career Certificates",
    year: "2023"
  }
];
