import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CustomCursor } from "@/components/portfolio/CustomCursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About, Marquee } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Contact, Footer } from "@/components/portfolio/Contact";
import { ContactDialog } from "@/components/portfolio/ContactDialog";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [contactOpen, setContactOpen] = useState(false);
  const open = () => setContactOpen(true);
  return (
    <div className="relative min-h-screen bg-background text-foreground md:cursor-none">
      <CustomCursor />
      <Nav onContact={open} />
      <main>
        <Hero onContact={open} />
        <Marquee />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact onContact={open} />
      </main>
      <Footer />
      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />
    </div>
  );
}
