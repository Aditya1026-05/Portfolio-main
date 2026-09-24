import {
  heroContent,
  aboutContent,
  projectsData,
  skillGroupsData,
  timelineItemsData,
  achievementsData,
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

export type AchievementRow = {
  id: string;
  title: string;
  category?: string;
  description?: string;
  sort_order: number;
};

export type HeroContent = {
  headline1: string;
  headline2: string;
  tagline: string;
  available: boolean;
  email: string;
  phone?: string;
  location?: string;
  github: string;
  linkedin: string;
  leetcode?: string;
  resume_url?: string;
  open_for_internships?: boolean;
  open_for_full_time?: boolean;
  photo_url?: string;
  photo_scale?: number;
  photo_position_y?: number;
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
  headline1: "AI Engineer",
  headline2: "& Software Developer",
  tagline:
    "Hi, I'm Aditya Tayal — an AI/ML enthusiast and Full-Stack Developer passionate about building intelligent applications that solve real-world problems. Experienced in Python, C++, FastAPI, Django, RAG, and LLM orchestration.",
  available: true,
  email: "adityatayal2610@gmail.com",
  phone: "+91-8847660891",
  location: "Patiala, Punjab",
  github: "https://github.com/Aditya1026-05",
  linkedin: "https://www.linkedin.com/in/aditya0898/",
  leetcode: "https://leetcode.com/u/Aditya1026_/",
  photo_url: "/aditya.jpg",
  photo_scale: 1.46,
  photo_position_y: 0,
};

export const aboutFallback: AboutContent = {
  heading: "About Me",
  paragraph1:
    "I develop AI-powered applications that bridge research and real-world usability. Whether it's designing RAG pipelines with LangChain and Groq, building LLM orchestration layers with tool/function calling, or deploying production-ready APIs with FastAPI and Docker on AWS, I focus on scalable systems with measurable impact.",
  paragraph2:
    "Currently pursuing B.Tech in Electronics & Communication Engineering at Thapar Institute of Engineering and Technology (2023 – 2027). When I'm not training models or architecting backend services, I solve DSA problems, contribute to student leadership, and build tools that empower users.",
  location: "Patiala, Punjab · Available globally",
  initials: "ADITYA",
  handle: "Aditya2610_",
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

export function useAchievements() {
  return { data: ((achievementsData as AchievementRow[]) || []), isLoading: false };
}

