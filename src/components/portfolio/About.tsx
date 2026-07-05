import { motion } from "framer-motion";
import { aboutFallback, useSiteContent, type AboutContent } from "@/hooks/use-portfolio";

const marquee = [
  "Full Stack",
  "AI / ML",
  "React",
  "TypeScript",
  "FastAPI",
  "Deep Learning",
  "Design Systems",
  "3D Web",
  "Product Engineering",
];

export function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-border/40 py-6">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {[...marquee, ...marquee].map((word, i) => (
          <div
            key={i}
            className="flex items-center gap-12 font-display text-3xl font-light tracking-tight md:text-5xl"
          >
            <span className={i % 2 === 0 ? "text-foreground" : "text-muted-foreground italic"}>
              {word}
            </span>
            <span className="text-[oklch(0.98_0_0)]">//</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function About() {
  const about = useSiteContent<AboutContent>("about", aboutFallback);

  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-px w-8 bg-[oklch(0.98_0_0)]" /> About
            </div>
            <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
              {about.heading}
            </h2>
          </div>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1fr_1.3fr] md:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="glass-strong relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="relative flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.85_0.05_240)]" />
                  {about.handle}
                </div>
                <div>
                  <div className="text-7xl font-bold font-display leading-none text-gradient">
                    {about.initials}
                  </div>
                  <div className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {about.location}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-6 -top-6 h-20 w-20 animate-float rounded-2xl glass-strong" />
            <div
              className="absolute -bottom-6 -left-6 h-16 w-16 animate-float rounded-full glass-strong"
              style={{ animationDelay: "-3s" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="space-y-8"
          >
            <p className="text-2xl leading-relaxed text-foreground/90 md:text-3xl font-light whitespace-pre-line">
              {about.paragraph1}
            </p>
            <p className="text-base leading-relaxed text-muted-foreground whitespace-pre-line">
              {about.paragraph2}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
