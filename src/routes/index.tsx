import { createFileRoute } from "@tanstack/react-router";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About, Marquee } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { heroContent } from "@/data/portfolio";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const open = () => {
    window.location.href = `mailto:${heroContent.email}`;
  };
  return (
    <div className="relative min-h-screen bg-background text-foreground md:cursor-none">
      <CustomCursor />
      <Nav onContact={open} />
      <main>
        <Hero onContact={open} />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact onContact={open} />
      </main>
      <Footer />
    </div>
  );
}
