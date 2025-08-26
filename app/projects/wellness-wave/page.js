import NavBar from "../../../components/NavBar";
import BackToTop from "../../../components/BackToTop";
import RootClient from "../../../components/RootClient";

export const metadata = { title: "Wellness Wave — Case Study" };

export default function CaseStudy() {
  return (
    <div>
      <RootClient />
      <NavBar />
      <main>
        <section className="reveal">
          <div className="container case-study">
            <h1 className="section-title">Wellness Wave</h1>
            <p className="small muted">Problem → Approach → Stack → Results</p>

            <div className="cs-section">
              <h3>Problem</h3>
              <p>Describe the challenge this project solves.</p>
            </div>

            <div className="cs-section">
              <h3>Approach</h3>
              <p>Key decisions, architecture, and trade-offs.</p>
            </div>

            <div className="cs-section">
              <h3>Stack</h3>
              <ul>
                <li>List the primary technologies used.</li>
              </ul>
            </div>

            <div className="cs-section">
              <h3>Results</h3>
              <p>Outcomes, metrics, or screenshots.</p>
            </div>

            <div className="cta" style={{ marginTop: 14 }}>
              <a className="btn" href="/projects">← Back to projects</a>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
