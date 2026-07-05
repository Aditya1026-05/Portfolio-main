import { motion } from "framer-motion";
import { GraduationCap, Sparkles, Code2, Circle, ArrowUpRight } from "lucide-react";
import { useTimeline } from "@/hooks/use-portfolio";

const icons = [GraduationCap, Sparkles, Code2, Circle];
const colors = [
  "oklch(0.72 0.24 265)",
  "oklch(0.65 0.28 300)",
  "oklch(0.85 0.18 200)",
  "oklch(0.75 0.15 180)",
];

export function Experience() {
  const { data: timeline } = useTimeline();

  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px w-8 bg-[oklch(0.98_0_0)]" /> Journey
          </div>
          <h2 className="font-display text-5xl font-bold tracking-tight md:text-7xl">
            Experience & <span className="text-white/50 font-light">education</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/20 to-transparent md:left-1/2" />

          <div className="space-y-16">
            {timeline.map((item, i) => {
              const Icon = icons[i % icons.length];
              const color = colors[i % colors.length];
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`relative grid gap-6 md:grid-cols-2 md:gap-16 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}
                >
                  <div
                    className={`ml-16 md:ml-0 [direction:ltr] ${i % 2 === 1 ? "md:pl-16" : "md:pr-16"}`}
                  >
                    <div className="glass-strong group rounded-3xl p-8 transition-all hover:-translate-y-1">
                      {item.year && (
                        <div
                          className="mb-3 font-mono text-xs uppercase tracking-widest"
                          style={{ color }}
                        >
                          {item.year}
                        </div>
                      )}
                      <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
                      {item.org && (
                        <div className="mt-1 text-sm text-[oklch(0.85_0.05_240)]">{item.org}</div>
                      )}
                      {item.description && (
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      )}

                      {/* CGPA, SGPA & Certificate Inclusion Box */}
                      {(item.cgpa || item.sgpa || item.certificate_url) && (
                        <div className="mt-5 flex flex-wrap items-center gap-2.5 pt-4 border-t border-white/5">
                          {item.cgpa && (
                            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-foreground/80">
                              CGPA: {item.cgpa}
                            </span>
                          )}
                          {item.sgpa && (
                            <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 font-mono text-[11px] text-foreground/80">
                              SGPA: {item.sgpa}
                            </span>
                          )}
                          {item.certificate_url && (
                            <a
                              href={item.certificate_url}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-full bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-1 text-xs font-semibold text-white transition-all inline-flex items-center gap-1.5 hover:scale-[1.02]"
                            >
                              Certificate <ArrowUpRight className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="absolute left-0 top-4 flex items-center md:left-1/2 md:-translate-x-1/2">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-full glass-strong"
                      style={{ boxShadow: `0 0 30px -5px ${color}` }}
                    >
                      <Icon className="h-5 w-5" style={{ color }} />
                    </div>
                  </div>

                  <div className="hidden md:block" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
