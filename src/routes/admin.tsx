import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  ArrowUp,
  ArrowDown,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Briefcase,
  Layers,
  GraduationCap,
  User,
  Check,
  Lock,
  Loader2,
} from "lucide-react";
import {
  heroContent as initialHero,
  aboutContent as initialAbout,
  projectsData as initialProjects,
  skillGroupsData as initialSkills,
  timelineItemsData as initialTimeline,
} from "@/data/portfolio";
import { savePortfolioData } from "@/lib/editor.functions";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Local Editor — Portfolio" }, { name: "robots", content: "noindex,nofollow" }],
  }),
});

function AdminPage() {
  const savePortfolio = useServerFn(savePortfolioData);

  // States initialized from local static files
  const [hero, setHero] = useState(initialHero);
  const [about, setAbout] = useState(initialAbout);
  const [projects, setProjects] = useState(initialProjects);
  const [skills, setSkills] = useState(initialSkills);
  const [timeline, setTimeline] = useState(initialTimeline);

  // Auth states
  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_code_v1");
    if (stored === "Aditya0898_") {
      setIsAuthorized(true);
    }
    setReady(true);

    // Auto-lock when exiting or navigating away from the page
    return () => {
      localStorage.removeItem("admin_code_v1");
    };
  }, []);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (passcode === "Aditya0898_") {
      localStorage.setItem("admin_code_v1", "Aditya0898_");
      setIsAuthorized(true);
      toast.success("Unlocked successfully!");
    } else {
      toast.error("Incorrect passcode. Access denied.");
    }
  }

  function handleLock() {
    localStorage.removeItem("admin_code_v1");
    setIsAuthorized(false);
    setPasscode("");
    toast.success("Locked admin panel.");
  }

  // Editor states
  const [editingProjectIndex, setEditingProjectIndex] = useState<number | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: "",
    tagline: "",
    description: "",
    techCsv: "",
    year: "",
    featured: false,
    live_url: "",
    github_url: "",
    is_ongoing: false,
  });

  const [editingSkillIndex, setEditingSkillIndex] = useState<number | null>(null);
  const [skillForm, setSkillForm] = useState({
    title: "",
    itemsCsv: "",
  });

  const [editingTimelineIndex, setEditingTimelineIndex] = useState<number | null>(null);
  const [timelineForm, setTimelineForm] = useState({
    year: "",
    title: "",
    org: "",
    description: "",
    cgpa: "",
    sgpa: "",
    certificate_url: "",
  });

  const [busy, setBusy] = useState(false);

  // Global Save function to write to disk
  async function handleSave() {
    setBusy(true);
    try {
      const res = await savePortfolio({
        data: {
          heroContent: hero,
          aboutContent: about,
          projectsData: projects,
          skillGroupsData: skills,
          timelineItemsData: timeline,
        },
      });
      if (res.ok) {
        toast.success("Changes saved directly to src/data/portfolio.ts!", {
          description: "Vite will automatically hot-reload the changes.",
          duration: 4000,
        });
      } else {
        toast.error("Failed to write to file.");
      }
    } catch (e) {
      toast.error("Error saving: Dev server must be running to save changes.");
    } finally {
      setBusy(false);
    }
  }

  // --- Projects helper actions ---
  function handleAddOrUpdateProject() {
    if (!projectForm.title.trim()) return;

    const newProject = {
      id: editingProjectIndex !== null ? projects[editingProjectIndex].id : crypto.randomUUID(),
      title: projectForm.title,
      tagline: projectForm.tagline,
      description: projectForm.description,
      tech: projectForm.techCsv
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      year: projectForm.year,
      sort_order:
        editingProjectIndex !== null
          ? projects[editingProjectIndex].sort_order
          : (projects.length + 1) * 10,
      featured: projectForm.featured,
      live_url: projectForm.live_url,
      github_url: projectForm.github_url,
      is_ongoing: projectForm.is_ongoing,
    };

    if (editingProjectIndex !== null) {
      const updated = [...projects];
      updated[editingProjectIndex] = newProject;
      setProjects(updated);
      setEditingProjectIndex(null);
      toast.success("Project updated in memory. Click 'Save to Disk' to persist.");
    } else {
      setProjects([...projects, newProject]);
      toast.success("Project added in memory. Click 'Save to Disk' to persist.");
    }

    setProjectForm({
      title: "",
      tagline: "",
      description: "",
      techCsv: "",
      year: "",
      featured: false,
      live_url: "",
      github_url: "",
      is_ongoing: false,
    });
  }

  function startEditProject(index: number) {
    const p = projects[index];
    setEditingProjectIndex(index);
    setProjectForm({
      title: p.title,
      tagline: p.tagline ?? "",
      description: p.description ?? "",
      techCsv: (p.tech ?? []).join(", "),
      year: p.year ?? "",
      featured: p.featured ?? false,
      live_url: p.live_url ?? "",
      github_url: p.github_url ?? "",
      is_ongoing: p.is_ongoing ?? false,
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  }

  function deleteProject(index: number) {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setProjects(projects.filter((_, i) => i !== index));
    toast.success("Project removed from list.");
  }

  function moveProject(index: number, direction: "up" | "down") {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= projects.length) return;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;

    // Auto-update sort_orders based on array indices
    const resorted = updated.map((p, i) => ({ ...p, sort_order: (i + 1) * 10 }));
    setProjects(resorted);
  }

  // --- Skills helper actions ---
  function handleAddOrUpdateSkill() {
    if (!skillForm.title.trim()) return;

    const newGroup = {
      id: editingSkillIndex !== null ? skills[editingSkillIndex].id : crypto.randomUUID(),
      title: skillForm.title,
      items: skillForm.itemsCsv
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      sort_order:
        editingSkillIndex !== null
          ? skills[editingSkillIndex].sort_order
          : (skills.length + 1) * 10,
    };

    if (editingSkillIndex !== null) {
      const updated = [...skills];
      updated[editingSkillIndex] = newGroup;
      setSkills(updated);
      setEditingSkillIndex(null);
    } else {
      setSkills([...skills, newGroup]);
    }

    setSkillForm({ title: "", itemsCsv: "" });
    toast.success("Skill group updated in list.");
  }

  function moveSkill(index: number, direction: "up" | "down") {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= skills.length) return;
    const updated = [...skills];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    const resorted = updated.map((s, i) => ({ ...s, sort_order: (i + 1) * 10 }));
    setSkills(resorted);
  }

  // --- Timeline helper actions ---
  function handleAddOrUpdateTimeline() {
    if (!timelineForm.title.trim()) return;

    const newItem = {
      id: editingTimelineIndex !== null ? timeline[editingTimelineIndex].id : crypto.randomUUID(),
      year: timelineForm.year,
      title: timelineForm.title,
      org: timelineForm.org,
      description: timelineForm.description,
      sort_order:
        editingTimelineIndex !== null
          ? timeline[editingTimelineIndex].sort_order
          : (timeline.length + 1) * 10,
      cgpa: timelineForm.cgpa,
      sgpa: timelineForm.sgpa,
      certificate_url: timelineForm.certificate_url,
    };

    if (editingTimelineIndex !== null) {
      const updated = [...timeline];
      updated[editingTimelineIndex] = newItem;
      setTimeline(updated);
      setEditingTimelineIndex(null);
    } else {
      setTimeline([...timeline, newItem]);
    }

    setTimelineForm({
      year: "",
      title: "",
      org: "",
      description: "",
      cgpa: "",
      sgpa: "",
      certificate_url: "",
    });
    toast.success("Timeline entry updated.");
  }

  function moveTimeline(index: number, direction: "up" | "down") {
    const nextIndex = direction === "up" ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= timeline.length) return;
    const updated = [...timeline];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    const resorted = updated.map((t, i) => ({ ...t, sort_order: (i + 1) * 10 }));
    setTimeline(resorted);
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-background text-foreground grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6 selection:bg-white/10 selection:text-white">
        <div className="glass-strong border-white/10 w-full max-w-[400px] rounded-3xl p-8 space-y-6 text-center shadow-[0_0_50px_rgba(255,255,255,0.02)]">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-white/5 border border-white/10 grid place-items-center text-white relative">
            <Lock className="h-5 w-5 animate-pulse" />
            <div className="absolute inset-0 rounded-2xl bg-white/5 border border-white/20 animate-pulse pointer-events-none" />
          </div>
          <div className="space-y-1.5">
            <h2 className="font-display text-xl font-bold text-white">Enter Access Code</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This area is restricted. Enter your passcode to unlock the editor.
            </p>
          </div>
          <form onSubmit={handleUnlock} className="space-y-4">
            <div className="space-y-1.5 text-left">
              <Label htmlFor="passcode-input" className="text-white/80">
                Passcode
              </Label>
              <Input
                id="passcode-input"
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="••••••••"
                className="bg-white/5 border-white/10 rounded-xl text-white placeholder:text-muted-foreground/40 text-center tracking-widest focus-visible:ring-1 focus-visible:ring-white/20"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-all hover:bg-white/90 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:scale-[1.01]"
            >
              Unlock Dashboard
            </button>
          </form>
          <div className="pt-2">
            <Link
              to="/"
              className="text-xs text-muted-foreground hover:text-white underline transition-colors"
            >
              Back to Portfolio
            </Link>
          </div>
        </div>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/10 selection:text-white pb-20">
      {/* Top Header Controls */}
      <header className="border-b border-white/5 sticky top-0 z-40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <h1 className="font-display font-bold text-sm sm:text-lg flex items-center gap-1.5 leading-none">
                Portfolio Editor <Sparkles className="h-4 w-4 text-amber-400" />
              </h1>
              <p className="text-[10px] text-muted-foreground font-mono mt-0.5 hidden sm:block">
                Static local developer mode
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLock}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-white/10 transition-colors cursor-pointer text-muted-foreground hover:text-white"
              title="Lock admin panel"
            >
              <Lock className="h-4 w-4" />
            </button>
            <button
              onClick={handleSave}
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold text-black transition-all hover:bg-white/90 hover:scale-[1.02] disabled:opacity-60 cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              {busy ? (
                <span className="h-3.5 w-3.5 border-2 border-black border-t-transparent animate-spin rounded-full" />
              ) : (
                <Save className="h-3.5 w-3.5" />
              )}
              <span className="hidden sm:inline">Save to Code File</span>
              <span className="sm:hidden">Save</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Editor Warning / Details Card */}
        <div className="mb-8 rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur flex items-start gap-4">
          <div className="rounded-2xl bg-white/5 p-3 text-white shrink-0">
            <Sparkles className="h-6 w-6 text-amber-300" />
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-white">Direct File Editing Panel</h4>
            <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">
              This editor connects directly to your local file{" "}
              <span className="font-mono text-white">src/data/portfolio.ts</span>. Fill in your
              details, order your projects using the arrows, and click{" "}
              <strong className="text-white">Save to Code File</strong>. Your portfolio will
              immediately hot-reload with the updates.
            </p>
          </div>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="glass-strong mb-8 flex w-full overflow-x-auto gap-1 p-1 rounded-full md:max-w-fit scrollbar-none">
            <TabsTrigger value="hero" className="rounded-full px-4 py-2 text-xs font-medium">
              <User className="h-3.5 w-3.5 mr-1" /> Bio
            </TabsTrigger>
            <TabsTrigger value="projects" className="rounded-full px-4 py-2 text-xs font-medium">
              <Briefcase className="h-3.5 w-3.5 mr-1" /> Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="rounded-full px-4 py-2 text-xs font-medium">
              <Layers className="h-3.5 w-3.5 mr-1" /> Skills
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-full px-4 py-2 text-xs font-medium">
              <GraduationCap className="h-3.5 w-3.5 mr-1" /> Timeline
            </TabsTrigger>
          </TabsList>

          {/* BIO TAB */}
          <TabsContent value="hero">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="glass-strong rounded-3xl p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white mb-2">Hero Header Text</h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="headline1">Headline (Line 1)</Label>
                    <Input
                      id="headline1"
                      value={hero.headline1}
                      onChange={(e) => setHero({ ...hero, headline1: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="headline2">Headline (Line 2)</Label>
                    <Input
                      id="headline2"
                      value={hero.headline2}
                      onChange={(e) => setHero({ ...hero, headline2: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="tagline">Bio Tagline</Label>
                    <Textarea
                      id="tagline"
                      rows={4}
                      value={hero.tagline}
                      onChange={(e) => setHero({ ...hero, tagline: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 pt-1">
                    <label className="flex items-center gap-2 text-sm text-muted-foreground select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hero.open_for_full_time ?? false}
                        onChange={(e) => setHero({ ...hero, open_for_full_time: e.target.checked })}
                        className="rounded bg-white/5 border-white/10"
                      />
                      Open for full-time roles
                    </label>
                    <label className="flex items-center gap-2 text-sm text-muted-foreground select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hero.open_for_internships ?? false}
                        onChange={(e) => setHero({ ...hero, open_for_internships: e.target.checked })}
                        className="rounded bg-white/5 border-white/10"
                      />
                      Open for internships
                    </label>
                    <label className="flex items-center gap-2 text-xs text-muted-foreground/60 select-none cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hero.available}
                        onChange={(e) => setHero({ ...hero, available: e.target.checked })}
                        className="rounded bg-white/5 border-white/10"
                      />
                      Show fallback "Available for opportunities" badge
                    </label>
                  </div>
                </div>
              </div>

              <div className="glass-strong rounded-3xl p-6 space-y-4">
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  Socials & Biography
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={hero.email}
                      onChange={(e) => setHero({ ...hero, email: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={hero.github}
                      onChange={(e) => setHero({ ...hero, github: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="linkedin">LinkedIn URL</Label>
                    <Input
                      id="linkedin"
                      value={hero.linkedin}
                      onChange={(e) => setHero({ ...hero, linkedin: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="leetcode">LeetCode URL</Label>
                    <Input
                      id="leetcode"
                      value={hero.leetcode || ""}
                      onChange={(e) => setHero({ ...hero, leetcode: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="resume">Resume URL</Label>
                    <Input
                      id="resume"
                      value={hero.resume_url || ""}
                      onChange={(e) => setHero({ ...hero, resume_url: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="border-t border-white/5 pt-4 my-2" />
                  <div className="space-y-1.5">
                    <Label htmlFor="about-heading">About Paragraph Header</Label>
                    <Input
                      id="about-heading"
                      value={about.heading}
                      onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="about-p1">About Text (Paragraph 1)</Label>
                    <Textarea
                      id="about-p1"
                      rows={3}
                      value={about.paragraph1}
                      onChange={(e) => setAbout({ ...about, paragraph1: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="about-p2">About Text (Paragraph 2)</Label>
                    <Textarea
                      id="about-p2"
                      rows={3}
                      value={about.paragraph2}
                      onChange={(e) => setAbout({ ...about, paragraph2: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="initials">Initials Logo</Label>
                      <Input
                        id="initials"
                        value={about.initials}
                        onChange={(e) => setAbout({ ...about, initials: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="handle">Handle Username</Label>
                      <Input
                        id="handle"
                        value={about.handle}
                        onChange={(e) => setAbout({ ...about, handle: e.target.value })}
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={about.location}
                      onChange={(e) => setAbout({ ...about, location: e.target.value })}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PROJECTS TAB */}
          <TabsContent value="projects" className="space-y-8">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              {/* Form panel */}
              <div className="glass-strong rounded-3xl p-6 h-fit space-y-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center justify-between">
                  <span>
                    {editingProjectIndex !== null ? "Edit Project Details" : "Add New Project"}
                  </span>
                  {editingProjectIndex !== null && (
                    <button
                      onClick={() => {
                        setEditingProjectIndex(null);
                        setProjectForm({
                          title: "",
                          tagline: "",
                          description: "",
                          techCsv: "",
                          year: "",
                          featured: false,
                          live_url: "",
                          github_url: "",
                          is_ongoing: false,
                        });
                      }}
                      className="text-xs text-muted-foreground hover:text-white underline cursor-pointer"
                    >
                      Cancel Edit
                    </button>
                  )}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="p-title">Project Title</Label>
                    <Input
                      id="p-title"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. AI SaaS Dashboard"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-tagline">Short Tagline</Label>
                    <Input
                      id="p-tagline"
                      value={projectForm.tagline}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      placeholder="e.g. Multi-agent analytics pipeline"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-desc">Description Paragraph</Label>
                    <Textarea
                      id="p-desc"
                      rows={4}
                      value={projectForm.description}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      placeholder="Write a detailed explanation of the project..."
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-tech">Technologies used (comma separated)</Label>
                    <Input
                      id="p-tech"
                      value={projectForm.techCsv}
                      onChange={(e) => setProjectForm({ ...projectForm, techCsv: e.target.value })}
                      placeholder="e.g. React, Node, PyTorch"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="p-year">Year</Label>
                      <Input
                        id="p-year"
                        value={projectForm.year}
                        onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                        placeholder="e.g. 2025"
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="p-empty">&nbsp;</Label>
                      <div className="flex flex-col gap-2 mt-1">
                        <label className="flex items-center gap-2 text-xs text-muted-foreground select-none cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.featured}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, featured: e.target.checked })
                            }
                            className="rounded bg-white/5 border-white/10"
                          />
                          Featured / Large Card
                        </label>
                        <label className="flex items-center gap-2 text-xs text-muted-foreground select-none cursor-pointer">
                          <input
                            type="checkbox"
                            checked={projectForm.is_ongoing}
                            onChange={(e) =>
                              setProjectForm({ ...projectForm, is_ongoing: e.target.checked })
                            }
                            className="rounded bg-white/5 border-white/10"
                          />
                          Ongoing Project (Pulsing Light)
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-live">Live Demo Link</Label>
                    <Input
                      id="p-live"
                      value={projectForm.live_url}
                      onChange={(e) => setProjectForm({ ...projectForm, live_url: e.target.value })}
                      placeholder="https://..."
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="p-git">GitHub URL</Label>
                    <Input
                      id="p-git"
                      value={projectForm.github_url}
                      onChange={(e) =>
                        setProjectForm({ ...projectForm, github_url: e.target.value })
                      }
                      placeholder="https://github.com/..."
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <button
                    onClick={handleAddOrUpdateProject}
                    disabled={!projectForm.title.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-60 cursor-pointer mt-2"
                  >
                    {editingProjectIndex !== null ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    {editingProjectIndex !== null
                      ? "Update Project in Memory"
                      : "Add Project to List"}
                  </button>
                </div>
              </div>

              {/* List / Order panel */}
              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Project Order & List</h3>
                <p className="text-xs text-muted-foreground">
                  Use the Up and Down arrows to sort the display order. Order #1 will come first on
                  your site.
                </p>

                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {projects.map((p, index) => (
                      <motion.div
                        key={p.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="glass flex flex-col sm:flex-row sm:items-center justify-between rounded-2xl p-4 gap-4"
                      >
                        <div className="min-w-0 flex-1 w-full">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-muted-foreground bg-white/5 px-2 py-0.5 rounded">
                              #{index + 1}
                            </span>
                            <span className="font-display font-semibold text-white truncate">
                              {p.title}
                            </span>
                            {p.is_ongoing && (
                              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-1">
                            {p.tagline || p.description}
                          </p>
                          <div className="flex items-center gap-1.5 mt-2">
                            {p.tech.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/60"
                              >
                                {t}
                              </span>
                            ))}
                            {p.tech.length > 3 && (
                              <span className="text-[9px] text-muted-foreground">
                                +{p.tech.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Order & Edit buttons */}
                        <div className="flex items-center gap-1.5 shrink-0 w-full sm:w-auto justify-end sm:justify-start border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                          <button
                            onClick={() => moveProject(index, "up")}
                            disabled={index === 0}
                            className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => moveProject(index, "down")}
                            disabled={index === projects.length - 1}
                            className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => startEditProject(index)}
                            className="p-2 rounded-full hover:bg-white/5 text-muted-foreground hover:text-white cursor-pointer"
                            title="Edit details"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteProject(index)}
                            className="p-2 rounded-full hover:bg-red-500/10 text-muted-foreground hover:text-red-400 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* SKILLS TAB */}
          <TabsContent value="skills">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="glass-strong rounded-3xl p-6 h-fit space-y-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center justify-between">
                  <span>{editingSkillIndex !== null ? "Edit Skill Group" : "Add Skill Group"}</span>
                  {editingSkillIndex !== null && (
                    <button
                      onClick={() => {
                        setEditingSkillIndex(null);
                        setSkillForm({ title: "", itemsCsv: "" });
                      }}
                      className="text-xs text-muted-foreground hover:text-white underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="s-title">Group Title</Label>
                    <Input
                      id="s-title"
                      value={skillForm.title}
                      onChange={(e) => setSkillForm({ ...skillForm, title: e.target.value })}
                      placeholder="e.g. Backend Tools"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="s-items">Skills (comma separated)</Label>
                    <Textarea
                      id="s-items"
                      rows={4}
                      value={skillForm.itemsCsv}
                      onChange={(e) => setSkillForm({ ...skillForm, itemsCsv: e.target.value })}
                      placeholder="e.g. Node.js, Express, PostgreSQL"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <button
                    onClick={handleAddOrUpdateSkill}
                    disabled={!skillForm.title.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-60 cursor-pointer mt-2"
                  >
                    {editingSkillIndex !== null ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    {editingSkillIndex !== null ? "Update Group" : "Add Skill Group"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Skill Groups</h3>
                <div className="space-y-3">
                  {skills.map((s, index) => (
                    <div
                      key={s.id}
                      className="glass p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <span className="font-display font-semibold text-white">{s.title}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {s.items.map((it) => (
                            <span
                              key={it}
                              className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-white/75"
                            >
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto justify-end sm:justify-start border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                        <button
                          onClick={() => moveSkill(index, "up")}
                          disabled={index === 0}
                          className="p-2 text-muted-foreground hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveSkill(index, "down")}
                          disabled={index === skills.length - 1}
                          className="p-2 text-muted-foreground hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingSkillIndex(index);
                            setSkillForm({ title: s.title, itemsCsv: s.items.join(", ") });
                          }}
                          className="p-2 text-muted-foreground hover:text-white cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete group?"))
                              setSkills(skills.filter((_, i) => i !== index));
                          }}
                          className="p-2 text-muted-foreground hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TIMELINE TAB */}
          <TabsContent value="timeline">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="glass-strong rounded-3xl p-6 h-fit space-y-4">
                <h3 className="font-display text-lg font-bold text-white flex items-center justify-between">
                  <span>
                    {editingTimelineIndex !== null ? "Edit Timeline Entry" : "Add Timeline Entry"}
                  </span>
                  {editingTimelineIndex !== null && (
                    <button
                      onClick={() => {
                        setEditingTimelineIndex(null);
                        setTimelineForm({
                          year: "",
                          title: "",
                          org: "",
                          description: "",
                          cgpa: "",
                          sgpa: "",
                          certificate_url: "",
                        });
                      }}
                      className="text-xs text-muted-foreground hover:text-white underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="t-year">Year Span</Label>
                    <Input
                      id="t-year"
                      value={timelineForm.year}
                      onChange={(e) => setTimelineForm({ ...timelineForm, year: e.target.value })}
                      placeholder="e.g. 2024 — Present"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="t-title">Title / Role</Label>
                    <Input
                      id="t-title"
                      value={timelineForm.title}
                      onChange={(e) => setTimelineForm({ ...timelineForm, title: e.target.value })}
                      placeholder="e.g. Software Engineer Intern"
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="t-org">Organization / Institution</Label>
                    <Input
                      id="t-org"
                      value={timelineForm.org}
                      onChange={(e) => setTimelineForm({ ...timelineForm, org: e.target.value })}
                      placeholder="e.g. Stripe Inc."
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="t-desc">Description</Label>
                    <Textarea
                      id="t-desc"
                      rows={3}
                      value={timelineForm.description}
                      onChange={(e) =>
                        setTimelineForm({ ...timelineForm, description: e.target.value })
                      }
                      placeholder="Describe what you worked on or studied..."
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="t-cgpa">CGPA (Optional)</Label>
                      <Input
                        id="t-cgpa"
                        value={timelineForm.cgpa}
                        onChange={(e) => setTimelineForm({ ...timelineForm, cgpa: e.target.value })}
                        placeholder="e.g. 9.2"
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="t-sgpa">SGPA (Optional)</Label>
                      <Input
                        id="t-sgpa"
                        value={timelineForm.sgpa}
                        onChange={(e) => setTimelineForm({ ...timelineForm, sgpa: e.target.value })}
                        placeholder="e.g. 9.5"
                        className="bg-white/5 border-white/10"
                      />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="t-cert">Certificate URL (Optional)</Label>
                    <Input
                      id="t-cert"
                      value={timelineForm.certificate_url}
                      onChange={(e) =>
                        setTimelineForm({ ...timelineForm, certificate_url: e.target.value })
                      }
                      placeholder="https://..."
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <button
                    onClick={handleAddOrUpdateTimeline}
                    disabled={!timelineForm.title.trim()}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90 disabled:opacity-60 cursor-pointer mt-2"
                  >
                    {editingTimelineIndex !== null ? (
                      <Save className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                    {editingTimelineIndex !== null ? "Update Entry" : "Add Entry"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-display text-lg font-bold text-white">Timeline Events</h3>
                <div className="space-y-3">
                  {timeline.map((t, index) => (
                    <div
                      key={t.id}
                      className="glass p-4 rounded-2xl flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                    >
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-muted-foreground">
                            #{index + 1}
                          </span>
                          <span className="text-xs font-semibold text-white/50">{t.year}</span>
                          <span className="font-display font-semibold text-white">{t.title}</span>
                        </div>
                        <p className="text-xs text-amber-300 font-mono mt-1">{t.org}</p>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          {t.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 w-full sm:w-auto justify-end sm:justify-start border-t border-white/5 pt-2 sm:border-t-0 sm:pt-0">
                        <button
                          onClick={() => moveTimeline(index, "up")}
                          disabled={index === 0}
                          className="p-2 text-muted-foreground hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveTimeline(index, "down")}
                          disabled={index === timeline.length - 1}
                          className="p-2 text-muted-foreground hover:text-white disabled:opacity-30 cursor-pointer"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingTimelineIndex(index);
                            setTimelineForm({
                              year: t.year ?? "",
                              title: t.title,
                              org: t.org ?? "",
                              description: t.description ?? "",
                              cgpa: t.cgpa ?? "",
                              sgpa: t.sgpa ?? "",
                              certificate_url: t.certificate_url ?? "",
                            });
                          }}
                          className="p-2 text-muted-foreground hover:text-white cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm("Delete entry?"))
                              setTimeline(timeline.filter((_, i) => i !== index));
                          }}
                          className="p-2 text-muted-foreground hover:text-red-400 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}
