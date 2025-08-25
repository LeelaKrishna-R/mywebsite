"use client";
import BackToTop from "../components/BackToTop";
import SocialBar from "../components/SocialBar";
import ParallaxHero from "../components/ParallaxHero";
import GitHubCard from "../components/GithubCard";

export default function HomePage() {
  return (
    <div>
      <main>
        <section className="hero">
          <div className="container" style={{ position: "relative" }}>
            <div
              className="hero-grid"
              style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 24 }}
            >
              {/* Left */}
              <div>
                <span className="kicker">AI Graduate Student · Software Developer</span>
                <h1 className="title">
                  Building thoughtful software with a focus on clarity, performance, and user experience.
                </h1>
                <p className="subtitle">
                  I’m pursuing a master’s in Artificial Intelligence at the University of North Texas.
                  My interests span AI/ML, full-stack development, and systems integration.
                  I enjoy turning ideas into reliable products.
                </p>

                <div className="cta" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <a className="btn btn-primary" href="mailto:email@krishnar.xyz">Email</a>
                  <a className="btn" href="https://github.com/LeelaKrishna-R" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>

                <div style={{ marginTop: 16 }}>
                  <SocialBar />
                </div>
              </div>

              {/* Right */}
              <aside aria-label="Profile and GitHub overview" style={{ display: "grid", gap: 16 }}>
                <div className="hero-card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <ParallaxHero src="/images/me-ghibli.png" alt="Leelakrishna Ghibli portrait" />
                    <div>
                      <div style={{ fontWeight: 700 }}>Leelakrishna Ravuri</div>
                      <div style={{ color: "var(--muted)" }}>Based in USA · from India</div>
                    </div>
                  </div>

                  <div className="meta" style={{ marginTop: 12, lineHeight: 1.5 }}>
                    <div className="m"><b>Focus</b> AI/ML, Full-stack, Dev Tools</div>
                    <div className="m"><b>Availability</b> Open to opportunities</div>
                    <div className="m"><b>Email</b> <a href="mailto:email@krishnar.xyz">email@krishnar.xyz</a></div>
                    <div className="m"><b>Social</b> <a href="/contact">Links</a></div>
                  </div>
                </div>

                <GitHubCard />
              </aside>
            </div>
          </div>
        </section>
      </main>

      <BackToTop />

      <style jsx>{`
        @media (max-width: 900px) {
          .hero :global(.hero-grid) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
