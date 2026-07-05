import {
  heroContent,
  aboutContent,
  projectsData,
  skillGroupsData,
  timelineItemsData,
} from "@/data/portfolio";

export type ProjectRow = {
  id: string;
  title: string;
  tagline: string | null;
  description: string | null;
  tech: string[];
  year: string | null;
  sort_order: number;
  featured: boolean;
  live_url: string | null;
  github_url: string | null;
  is_ongoing: boolean;
};

export type SkillGroupRow = {
  id: string;
  title: string;
  items: string[];
  sort_order: number;
};

export type TimelineRow = {
  id: string;
  year: string | null;
  title: string;
  org: string | null;
  description: string | null;
  sort_order: number;
  cgpa: string | null;
  sgpa: string | null;
  certificate_url: string | null;
};

export type HeroContent = {
  headline1: string;
  headline2: string;
  tagline: string;
  available: boolean;
  email: string;
  github: string;
  linkedin: string;
  open_for_internships?: boolean;
  open_for_full_time?: boolean;
};

export type AboutContent = {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  location: string;
  initials: string;
  handle: string;
};

export const heroFallback: HeroContent = {
  headline1: "Full Stack",
  headline2: "& AI Engineer",
  tagline:
    "Hi, I'm Aditya Tayal — I design and build scalable full-stack products, AI-powered systems, and interfaces that feel effortless to use.",
  available: true,
  email: "adityatayal2610@gmail.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
};

export const aboutFallback: AboutContent = {
  heading: "Engineer with a designer's eye",
  paragraph1:
    "I build scalable full-stack applications, AI-powered solutions, and modern web experiences — solving real-world problems through software engineering, machine learning, and intuitive user interfaces.",
  paragraph2:
    "Currently pursuing B.Tech in Electronics and Communication Engineering at Thapar Institute. I care deeply about craft — the difference between something that works and something that feels right.",
  location: "Based in India · Available globally",
  initials: "AT",
  handle: "aditya.dev",
};

export function useSiteContent<T>(key: string, fallback: T): T {
  if (key === "hero") return heroContent as unknown as T;
  if (key === "about") return aboutContent as unknown as T;
  return fallback;
}

export function useProjects() {
  return { data: projectsData as ProjectRow[], isLoading: false };
}

export function useSkillGroups() {
  return { data: skillGroupsData as SkillGroupRow[], isLoading: false };
}

export function useTimeline() {
  return { data: timelineItemsData as TimelineRow[], isLoading: false };
}
