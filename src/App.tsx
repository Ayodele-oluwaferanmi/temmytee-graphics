import { useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Nav, whatsappLink } from "@/components/Nav";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Home } from "@/pages/Home";
import { Portfolio } from "@/pages/Portfolio";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { Services } from "@/pages/Services";
import { useRoute } from "@/lib/router";
import { site } from "@/data/site";

/** Keeps the document title in sync with the active view (SEO + history). */
const titles: Record<string, string> = {
  home: `${site.name} — Graphic Designer | Church, Event & Brand Design`,
  portfolio: `Portfolio — Church, Birthday, Wedding, Event & Brand Design | ${site.name}`,
  services: `Design Services — Flyers, Social Media, Logos & Brand Identity | ${site.name}`,
  about: `About the Studio — Creative Thinking. Intentional Design. | ${site.name}`,
  contact: `Start a Project — Contact ${site.name}`,
  project: `Project | ${site.name}`,
};

export default function App() {
  const route = useRoute();

  // Smooth page transition: fade the view in whenever the route changes.
  useEffect(() => {
    document.title = titles[route.name] ?? titles.home;
  }, [route.name]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Nav />

      <div key={route.name + (route.param ?? "")} className="animate-fade-in flex-1">
        {route.name === "home" && <Home />}
        {route.name === "portfolio" && <Portfolio initialCategory={route.query.c} />}
        {route.name === "services" && <Services />}
        {route.name === "about" && <About />}
        {route.name === "contact" && <Contact />}
        {route.name === "project" && <ProjectDetail id={route.param} />}
      </div>

      <Footer />

      {/* Mobile quick-contact bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t border-line bg-white/95 px-4 py-3 backdrop-blur-lg md:hidden">
        <a href="#/contact" className="btn btn-primary flex-1 py-3 text-[0.875rem]">
          Start a Project
        </a>
        <a
          href={whatsappLink("Hello Temmy Tee Graphics, I'd like to discuss a design project.")}
          target="_blank"
          rel="noreferrer"
          className="btn btn-ghost shrink-0 px-4 py-3 text-[0.875rem]"
          aria-label="Chat on WhatsApp"
        >
          WhatsApp
        </a>
      </div>
      <div className="h-[68px] md:hidden" aria-hidden />
    </div>
  );
}
