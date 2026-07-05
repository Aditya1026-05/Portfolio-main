import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { heroFallback, useSiteContent, type HeroContent } from "@/hooks/use-portfolio";

export function Hero({ onContact }: { onContact?: () => void }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const hero = useSiteContent<HeroContent>("hero", heroFallback);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      el.style.setProperty("--mx", `${x * 40}px`);
      el.style.setProperty("--my", `${y * 40}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={sceneRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-32 pb-24"
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full bg-white/[0.03] blur-3xl"
        style={{ transform: "translate(var(--mx,0), var(--my,0))" }}
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[560px] w-[560px] rounded-full bg-[oklch(0.7_0.08_240/0.08)] blur-3xl"
        style={{ transform: "translate(calc(var(--mx,0)*-1), calc(var(--my,0)*-1))" }}
      />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[15%] bottom-[20%] h-40 w-40 animate-spin-slow rounded-full border border-dashed border-white/10">
          <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-white/60" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        {(hero.open_for_full_time || hero.open_for_internships || hero.available) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.85_0.05_240)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[oklch(0.85_0.05_240)]" />
            </span>
            <span className="text-muted-foreground">
              {hero.open_for_full_time && hero.open_for_internships
                ? "Open for Full-time & Internships"
                : hero.open_for_full_time
                  ? "Open for Full-time roles"
                  : hero.open_for_internships
                    ? "Open for Internships"
                    : "Available for opportunities"}
            </span>
          </motion.div>
        )}

        <h1 className="font-display text-[clamp(2.75rem,10vw,9rem)] font-bold leading-[0.9] tracking-tighter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {hero.headline1}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-light text-white/60"
          >
            {hero.headline2}
          </motion.div>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-8 grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center"
        >
          <div className="space-y-8">
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              {hero.tagline.includes("Aditya Tayal") ? (
                <>
                  {hero.tagline.split("Aditya Tayal")[0]}
                  <span className="text-white font-semibold">Aditya Tayal</span>
                  {hero.tagline.split("Aditya Tayal")[1]}
                </>
              ) : (
                hero.tagline
              )}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-shadow hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.5)]"
                >
                  View my work
                  <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  type="button"
                  onClick={onContact}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-white/5"
                >
                  Get in touch
                </button>
              </Magnetic>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:justify-end">
            <a
              href={hero.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="group flex h-10 w-10 hover:w-28 items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-3.5"
            >
              <Github className="h-4 w-4 shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-sm font-semibold text-white whitespace-nowrap">
                GitHub
              </span>
            </a>
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group flex h-10 w-10 hover:w-32 items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-3.5"
            >
              <Linkedin className="h-4 w-4 shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-sm font-semibold text-white whitespace-nowrap">
                LinkedIn
              </span>
            </a>
            <a
              href={`mailto:${hero.email}`}
              aria-label="Email"
              className="group flex h-10 w-10 hover:w-[105px] items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-3.5"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-sm font-semibold text-white whitespace-nowrap">
                Email
              </span>
            </a>
            {hero.leetcode && (
              <a
                href={hero.leetcode}
                target="_blank"
                rel="noreferrer"
                aria-label="LeetCode"
                className="group flex h-10 w-10 hover:w-[125px] items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-3.5"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.73 3.73 0 0 0 0 5.284l1.405 1.406a1.48 1.48 0 0 0 2.094-.006l9.024-9.025a1.48 1.48 0 0 1 2.093 2.093l-5.7 5.7a1.48 1.48 0 0 0 0 2.093l.707.707a1.48 1.48 0 0 0 2.093 0l5.7-5.7a4.43 4.43 0 0 0 0-6.28L14.444.414A1.365 1.365 0 0 0 13.483 0zm-5.787 5.7a1.48 1.48 0 0 0 0 2.093l-1.9 1.9a1.48 1.48 0 0 1-2.093-2.093l1.9-1.9a1.48 1.48 0 0 0 0-2.093l-.707-.707a1.48 1.48 0 0 0-2.093 0l-1.9 1.9a4.43 4.43 0 0 0 0 6.28l5.7 5.7a1.48 1.48 0 0 0 2.093 0l.707-.707a1.48 1.48 0 0 0 0-2.093l-5.7-5.7a1.48 1.48 0 0 1 0-2.093l1.9-1.9a1.48 1.48 0 0 0 0-2.093l-.707-.707a1.48 1.48 0 0 0-2.093 0z" />
                </svg>
                <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-sm font-semibold text-white whitespace-nowrap">
                  LeetCode
                </span>
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-16 flex items-center justify-end border-t border-border/40 pt-6"
        >
          <div className="hidden font-mono text-xs uppercase tracking-widest text-muted-foreground md:block">
            Scroll to explore ↓
          </div>
        </motion.div>
      </div>
    </section>
  );
}
