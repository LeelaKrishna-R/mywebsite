"use client";

import RevealOnScroll from "../../components/RevealOnScroll";
import ProjectCard from "../../components/ProjectCard";
import BackToTop from "../../components/BackToTop";
import SectionGraphic from "../../components/SectionGraphic";
import ThreeBackground from "../../components/ThreeBackground";
import RootClient from "../../components/RootClient";
import { useTheme } from "../../components/ThemeProvider";

export default function ClientProjectsPage() {
  const { theme } = useTheme();

  return (
    <div>
      <RootClient />
      <main>
        <RevealOnScroll />
        <section
          className="reveal"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <SectionGraphic variant="grid" />
          <SectionGraphic variant="blob" style={{ bottom: "-160px", top: "auto" }} />
          <ThreeBackground height={260} />

          <div className="container">
            <h1 className="section-title">Projects</h1>
            <p className="small muted">
              Click a card to flip. Only one card opens at a time.
            </p>
            <div className="projects">
              <ProjectCard
                title="Dynamic Trivia Content Generation"
                desc="Trivia game content generated programmatically; experimentation with Prolog for rule-based logic."
                image="/images/project-trivia.svg"
                tags={["Prolog", "CLI", "Game"]}
                links={[
                  {
                    label: "Repository",
                    href: "https://github.com/LeelaKrishna-R/Dynamic-Trivia-Content-Generation",
                  },
                  { label: "Case study", href: "/projects/dynamic-trivia" },
                ]}
                backTitle="Under the hood"
                backText="Rule-based question generation, category weighting, difficulty scaling, and deterministic seeding for reproducible sets."
              />
              <ProjectCard
                title="Shero — Discord Bot"
                desc="Feature-rich Discord bot with sharding, Redis integration, and performance monitoring."
                image="/images/project-shero.svg"
                tags={["Node.js", "Redis", "Discord.js"]}
                links={[
                  { label: "Code", href: "https://github.com/LeelaKrishna-R" },
                  { label: "Case study", href: "/projects/shero" },
                ]}
                backTitle="Highlights"
                backText="Sharded architecture with broadcastEval, Redis-backed queues and metrics, structured logging, and health dashboards."
              />
              <ProjectCard
                title="Wellness Wave"
                desc="Mental-wellness mobile app concepts and prototypes with focus on privacy and simple UX."
                image="/images/project-wellness.svg"
                tags={["React Native", "Expo"]}
                links={[
                  { label: "Code", href: "https://github.com/LeelaKrishna-R" },
                  { label: "Case study", href: "/projects/shero" },
                ]}
                backTitle="Concepts"
                backText="Local-first journaling, on-device embeddings for habit insights, and minimalistic mood tracking."
              />
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
