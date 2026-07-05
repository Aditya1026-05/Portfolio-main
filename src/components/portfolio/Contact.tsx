import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { heroFallback, useSiteContent, type HeroContent } from "@/hooks/use-portfolio";
import { ensureAbsoluteUrl } from "@/lib/utils";

export function Contact({ onContact }: { onContact?: () => void }) {
  const hero = useSiteContent<HeroContent>("hero", heroFallback);

  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(1_0_0/0.06)] blur-3xl animate-blob" />
        <div className="absolute right-0 top-10 h-40 w-40 animate-float rounded-full border border-white/10" />
        <div
          className="absolute left-10 bottom-20 h-24 w-24 animate-float rounded-2xl glass-strong"
          style={{ animationDelay: "-2s" }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-3 rounded-full glass px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.85_0.05_240)] animate-pulse" />
            Let's build something
          </div>
          <h2 className="font-display text-[clamp(3rem,12vw,10rem)] font-bold leading-[0.9] tracking-tighter">
            Have an
            <br />
            <span className="text-white/50 font-light">idea?</span>
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">
            I'm open to full-time roles, freelance projects, and collaborations. Drop a line and
            let's make something worth remembering.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={onContact}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[oklch(0.98_0_0)] to-[oklch(0.75_0_0)] px-8 py-4 text-base font-medium text-primary-foreground shadow-[0_0_40px_-10px_oklch(0.9_0_0/0.3)] transition-shadow hover:shadow-[0_0_60px_-5px_oklch(0.98_0_0)]"
              >
                <Mail className="h-5 w-5" />
                Say hello
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              { label: "Email", value: hero.email, href: `mailto:${hero.email}`, icon: Mail },
              { label: "GitHub", value: "GitHub", href: hero.github, icon: Github },
              { label: "LinkedIn", value: "LinkedIn", href: hero.linkedin, icon: Linkedin },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noreferrer"
                className="glass group flex flex-col items-start gap-3 rounded-2xl p-5 text-left transition-all hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <c.icon className="h-5 w-5 text-[oklch(0.85_0.05_240)]" />
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {c.label}
                  </div>
                  <div className="mt-0.5 text-sm font-medium truncate">{c.value}</div>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const hero = useSiteContent<HeroContent>("hero", heroFallback);
  return (
    <footer className="relative border-t border-border/40 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div className="font-mono text-xs text-muted-foreground">
          © {year} Aditya Tayal — Crafted with care.
        </div>
        <Magnetic>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
          </a>
        </Magnetic>
        <div className="flex items-center gap-3">
          <a
            href={ensureAbsoluteUrl(hero.github)}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="group flex h-9 w-9 hover:w-[105px] items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-2.5"
          >
            <Github className="h-4 w-4 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-xs font-semibold text-white whitespace-nowrap">
              GitHub
            </span>
          </a>
          <a
            href={ensureAbsoluteUrl(hero.linkedin)}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="group flex h-9 w-9 hover:w-[115px] items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-2.5"
          >
            <Linkedin className="h-4 w-4 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-xs font-semibold text-white whitespace-nowrap">
              LinkedIn
            </span>
          </a>
          <a
            href={`mailto:${hero.email}`}
            aria-label="Email"
            className="group flex h-9 w-9 hover:w-[95px] items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-2.5"
          >
            <Mail className="h-4 w-4 shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-xs font-semibold text-white whitespace-nowrap">
              Email
            </span>
          </a>
          {hero.leetcode && (
            <a
              href={ensureAbsoluteUrl(hero.leetcode)}
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode"
              className="group flex h-9 w-9 hover:w-[115px] items-center justify-start rounded-full glass hover:text-[oklch(0.85_0.05_240)] transition-all duration-500 ease-[0.2,0.8,0.2,1] overflow-hidden pl-2.5"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a3.73 3.73 0 0 0 0 5.284l1.405 1.406a1.48 1.48 0 0 0 2.094-.006l9.024-9.025a1.48 1.48 0 0 1 2.093 2.093l-5.7 5.7a1.48 1.48 0 0 0 0 2.093l.707.707a1.48 1.48 0 0 0 2.093 0l5.7-5.7a4.43 4.43 0 0 0 0-6.28L14.444.414A1.365 1.365 0 0 0 13.483 0zm-5.787 5.7a1.48 1.48 0 0 0 0 2.093l-1.9 1.9a1.48 1.48 0 0 1-2.093-2.093l1.9-1.9a1.48 1.48 0 0 0 0-2.093l-.707-.707a1.48 1.48 0 0 0-2.093 0l-1.9 1.9a4.43 4.43 0 0 0 0 6.28l5.7 5.7a1.48 1.48 0 0 0 2.093 0l.707-.707a1.48 1.48 0 0 0 0-2.093l-5.7-5.7a1.48 1.48 0 0 1 0-2.093l1.9-1.9a1.48 1.48 0 0 0 0-2.093l-.707-.707a1.48 1.48 0 0 0-2.093 0z" />
              </svg>
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 ml-2 font-display text-xs font-semibold text-white whitespace-nowrap">
                LeetCode
              </span>
            </a>
          )}
          <a
            href="/admin"
            aria-label="Admin"
            title="Admin"
            className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/50 hover:text-foreground transition-colors ml-2"
          >
            admin?
          </a>
        </div>
      </div>
    </footer>
  );
}
