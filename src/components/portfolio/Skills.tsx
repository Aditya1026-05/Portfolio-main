import { motion } from "framer-motion";
import { useSkillGroups } from "@/hooks/use-portfolio";

const palette = [
  "oklch(0.95 0 0)",
  "oklch(0.85 0 0)",
  "oklch(0.75 0 0)",
  "oklch(0.8 0.06 240)",
  "oklch(0.7 0 0)",
];

export function Skills() {
  const { data: skillGroups } = useSkillGroups();

  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[oklch(1_0_0/0.05)] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-[oklch(0.98_0_0)]" /> Toolkit
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            A stack tuned for <span className="text-white/50 font-light">shipping</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Comfortable across the stack — from low-level algorithms and model training to
            production APIs and pixel-perfect interfaces.
          </p>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {skillGroups.map((group, gi) => {
            const color = palette[gi % palette.length];
            return (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: gi * 0.1 }}
                className={`glass-strong group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 ${
                  gi === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
                style={{ boxShadow: `0 0 0 1px oklch(1 0 0 / 0.05)` }}
              >
                <div
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70"
                  style={{ background: color }}
                />
                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="font-display text-xl font-semibold">{group.title}</h3>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <span
                        key={s}
                        data-cursor="hover"
                        className="cursor-default rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-foreground/90 backdrop-blur-md transition-all hover:scale-105 hover:border-white/30"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
