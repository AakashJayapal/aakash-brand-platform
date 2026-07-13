export interface NavigationLink {
  name: string;
  href: string;
  isExternal?: boolean;
}

export const navigationLinks: NavigationLink[] = [
  { name: "Work", href: "#work" },
  { name: "About", href: "#behind-the-screens" },
  { name: "Journey", href: "#journey" },
  { name: "Contact", href: "#contact" },
  { name: "Resume", href: "/resume.pdf", isExternal: true }
];
