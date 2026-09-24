import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Magnetic } from "./Magnetic";
import { heroFallback, useSiteContent, type HeroContent } from "@/hooks/use-portfolio";
import { ensureAbsoluteUrl } from "@/lib/utils";
import { FileText } from "lucide-react";

const desktopLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
];

const mobileLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

type NavProps = { onContact?: () => void };

export function Nav({ onContact }: NavProps = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hero = useSiteContent<HeroContent>("hero", heroFallback);
  const photoUrl = hero.photo_url || "/aditya.jpg";
  const photoScale = hero.photo_scale ?? 1.0;
  const photoPositionY = hero.photo_position_y ?? 15;

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
        scrolled ? "w-[min(94%,960px)]" : "w-[min(94%,1100px)]"
      }`}
    >
      <div className="glass-strong flex items-center justify-between rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-6">
        <a
          href="#top"
          className="flex items-center gap-2 font-display text-sm font-bold tracking-tight shrink-0 mr-1 sm:mr-2"
        >
          <div className="relative hidden sm:grid h-8 w-8 place-items-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-[oklch(0.98_0_0)] to-[oklch(0.75_0_0)] text-primary-foreground text-xs font-bold">
            <span className="absolute">AT</span>
            <img
              src={photoUrl}
              alt="Aditya Tayal"
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                objectPosition: `center ${photoPositionY}%`,
                transform: `scale(${photoScale})`
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <span className="block sm:hidden text-white font-semibold text-[15px] tracking-wide">
            Aditya
          </span>
          <span className="hidden sm:inline">Aditya Tayal</span>
        </a>

        <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
          {desktopLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground lg:px-3.5 lg:text-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-2.5">
          {hero.resume_url && (
            <Magnetic>
              <a
                href={ensureAbsoluteUrl(hero.resume_url)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs font-medium text-foreground transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="hidden xs:inline sm:inline">Resume</span>
              </a>
            </Magnetic>
          )}

          <Magnetic className="hidden sm:block">
            <button
              type="button"
              onClick={onContact}
              className="rounded-full bg-gradient-to-r from-[oklch(0.98_0_0)] to-[oklch(0.75_0_0)] px-4 py-1.5 text-xs font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_25px_-5px_oklch(0.9_0_0/0.3)] cursor-pointer"
            >
              Let's talk
            </button>
          </Magnetic>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Menu"
            className="md:hidden grid h-8 w-8 place-items-center rounded-full glass shrink-0"
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
            {mobileLinks.map((l) => (
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
