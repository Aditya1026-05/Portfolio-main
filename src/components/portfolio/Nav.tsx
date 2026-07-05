import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { heroFallback, useSiteContent, type HeroContent } from "@/hooks/use-portfolio";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { FileText } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

type NavProps = { onContact?: () => void };

export function Nav({ onContact }: NavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hero = useSiteContent<HeroContent>("hero", heroFallback);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className={`fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[min(94%,920px)]" : "w-[min(94%,1100px)]"
      }`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full px-5 py-3 md:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-sm font-bold tracking-tight"
        >
          <span className="hidden sm:grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-[oklch(0.98_0_0)] to-[oklch(0.75_0_0)] text-primary-foreground">
            AT
          </span>
          <span className="block sm:hidden text-white font-semibold text-[15px] tracking-wide">
            Aditya
          </span>
          <span className="hidden sm:inline">Aditya Tayal</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          {hero.resume_url && (
            <Magnetic>
              <a
                href={ensureAbsoluteUrl(hero.resume_url)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm font-medium text-foreground transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5" /> Resume
              </a>
            </Magnetic>
          )}

          <Magnetic className="hidden md:block">
            <button
              type="button"
              onClick={onContact}
              className="rounded-full bg-gradient-to-r from-[oklch(0.98_0_0)] to-[oklch(0.75_0_0)] px-5 py-2 text-sm font-medium text-primary-foreground transition-shadow hover:shadow-[0_0_30px_-5px_oklch(0.9_0_0/0.25)] cursor-pointer"
            >
              Let's talk
            </button>
          </Magnetic>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden grid h-9 w-9 place-items-center rounded-full glass shrink-0"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-0.5 w-4 bg-foreground transition-transform ${open ? "translate-y-1 rotate-45" : ""}`}
              />
              <span
                className={`h-0.5 w-4 bg-foreground transition-transform ${open ? "-translate-y-1 -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong mt-2 flex flex-col rounded-3xl p-3 md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            {hero.resume_url && (
              <li className="border-t border-white/5 pt-1 mt-1">
                <a
                  href={ensureAbsoluteUrl(hero.resume_url)}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-[oklch(0.85_0.05_240)] hover:bg-white/5"
                >
                  <FileText className="h-4 w-4" /> Resume / CV
                </a>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
