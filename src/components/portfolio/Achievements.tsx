import { motion } from "framer-motion";
import { Trophy, Code2, Star, Users, Sparkles, Award } from "lucide-react";
import { useAchievements, type AchievementRow } from "@/hooks/use-portfolio";

const iconsMap: Record<string, typeof Trophy> = {
  "National Hackathon": Trophy,
  "Problem Solving": Code2,
  "Certifications & Badges": Star,
  "Leadership & Management": Users,
  "Event Leadership": Sparkles,
};

const colors = [
  "oklch(0.85 0.18 85)", // Amber / Gold
  "oklch(0.72 0.24 265)", // Indigo / Violet
  "oklch(0.75 0.22 150)", // Emerald / Mint
  "oklch(0.65 0.28 300)", // Purple / Magenta
  "oklch(0.85 0.18 200)", // Cyan
];

export function Achievements() {
  const { data: achievements } = useAchievements();

  if (!achievements || achievements.length === 0) return null;

  return (
    <section id="achievements" className="relative py-32 overflow-hidden">
      {/* Background glow orb */}
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-[550px] w-[550px] -translate-y-1/2 rounded-full bg-[oklch(0.85_0.18_85/0.04)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-[oklch(0.98_0_0)]" /> Honors & Impact
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            Leadership & <span className="text-white/50 font-light">achievements</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Recognition from national hackathons, competitive problem-solving milestones, and campus leadership initiatives.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = iconsMap[item.category || ""] || Award;
            const accentColor = colors[i % colors.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl glass-strong p-8 transition-all duration-300 hover:border-white/20"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
              >
                {/* Subtle radial glow corner */}
                <div
                  className="absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                  style={{ background: accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-2xl glass-strong border border-white/10"
                      style={{ boxShadow: `0 0 25px -8px ${accentColor}` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: accentColor }} />
                    </div>
                    {item.category && (
                      <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/5 font-mono text-[11px] text-white/30">
                  <span>#{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-white/5" />
                  <span className="text-white/40">Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
