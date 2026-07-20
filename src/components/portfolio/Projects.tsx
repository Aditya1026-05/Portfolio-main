import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { useProjects, type ProjectRow } from "@/hooks/use-portfolio";
import { ensureAbsoluteUrl } from "@/lib/utils";

export function Projects() {
  const { data: projects } = useProjects();

  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px w-8 bg-[oklch(0.98_0_0)]" /> Selected work
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              Things I've <span className="text-white/50 font-light">built</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A mix of production products and research explorations across full-stack, AI/ML, and
            design.
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          {projects.length === 0 && (
            <div className="glass-strong rounded-3xl p-12 text-center text-muted-foreground">
              No projects yet.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: ProjectRow; index: number }) {
  const featured = project.featured;
  const displayId = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      className="group glass-strong relative overflow-hidden rounded-[2rem] transition-all duration-700 hover:-translate-y-1"
      data-cursor="hover"
    >
      <div
        className={`grid gap-0 ${featured ? "md:grid-cols-[1.2fr_1fr]" : "md:grid-cols-[1fr_1.2fr]"} ${index % 2 === 1 ? "md:[direction:rtl]" : ""}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto [direction:ltr]">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-white/5 transition-transform duration-1000 group-hover:scale-110" />
          <div className="absolute inset-0 grid-bg opacity-20 mix-blend-overlay" />
          <div className="absolute inset-8 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-xl p-6 flex flex-col justify-between opacity-90 transition-transform duration-700 group-hover:scale-[1.02]">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/40" />
            </div>
            <div>
              <div className="font-display text-6xl font-bold text-white/95 leading-none md:text-8xl">
                {displayId}
              </div>
              <div className="mt-3 h-1 w-16 rounded-full bg-white/40" />
            </div>
          </div>
          {project.year && (
            <div className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 font-mono text-xs text-white/80 backdrop-blur">
              {project.year}
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between gap-8 p-8 md:p-12 [direction:ltr]">
          <div>
            <div className="mb-3 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>{featured ? "Featured" : `Project ${displayId}`}</span>
              {project.is_ongoing && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[9px] uppercase tracking-wider text-emerald-400 border border-emerald-500/20 backdrop-blur">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                  Ongoing
                </span>
              )}
            </div>
            <h3 className="font-display text-3xl font-bold leading-tight md:text-5xl">
              {project.title}
            </h3>
            {project.tagline && (
              <p className="mt-3 text-base text-[oklch(0.85_0.05_240)]">{project.tagline}</p>
            )}
            {project.description && (
              <DescriptionWithToggle description={project.description} />
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Live Demo and GitHub Repo Buttons */}
            {(project.live_url || project.github_url) && (
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {project.live_url && (
                  <a
                    href={ensureAbsoluteUrl(project.live_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background transition-all hover:bg-foreground/90 hover:shadow-[0_0_20px_-3px_rgba(255,255,255,0.3)]"
                  >
                    Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={ensureAbsoluteUrl(project.github_url)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground transition-all hover:bg-white/5"
                  >
                    GitHub <Github className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}



function isBulletDescription(text: string) {
  return text.trimStart().startsWith("•");
}

function parseBullets(text: string): string[] {
  return text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("•"))
    .map((line) => line.replace(/^•\s*/, ""));
}

function DescriptionWithToggle({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);

  if (isBulletDescription(description)) {
    const bullets = parseBullets(description);
    const HALF_BULLET_LIMIT = 60; // chars to show for the "half" bullet
    const isLong = bullets.length > 1;

    // Build visible items: 1 full + 1 clipped (the "0.5")
    let visibleBullets: { text: string; clipped: boolean }[];
    if (!isLong || expanded) {
      visibleBullets = bullets.map((b) => ({ text: b, clipped: false }));
    } else {
      const half = bullets[1] ?? "";
      visibleBullets = [
        { text: bullets[0], clipped: false },
        {
          text: half.length > HALF_BULLET_LIMIT ? half.slice(0, HALF_BULLET_LIMIT).trimEnd() + "…" : half,
          clipped: half.length > HALF_BULLET_LIMIT,
        },
      ];
    }

    return (
      <div className="mt-5">
        <ul className="space-y-2 text-base leading-relaxed text-muted-foreground">
          {visibleBullets.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
              <span className={item.clipped ? "opacity-60" : ""}>{item.text}</span>
            </li>
          ))}
        </ul>
        {isLong && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white focus:outline-none"
            style={{ textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.25)" }}
          >
            {expanded ? "Show less" : `Show ${bullets.length - 1} more…`}
          </button>
        )}
      </div>
    );

  }

  // Plain-text description fallback
  const isLong = description.length > 220;
  return (
    <p className="mt-5 text-base leading-relaxed text-muted-foreground">
      {isLong && !expanded ? description.slice(0, 220).trimEnd() + "…" : description}
      {isLong && (
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="ml-2 inline-flex items-center gap-0.5 font-medium text-white/70 underline-offset-2 transition-colors hover:text-white focus:outline-none"
          style={{ textDecoration: "underline", textDecorationColor: "rgba(255,255,255,0.3)" }}
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </p>
  );
}
