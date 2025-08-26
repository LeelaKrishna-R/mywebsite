import NavBar from "../../../components/NavBar";
import BackToTop from "../../../components/BackToTop";
import RootClient from "../../../components/RootClient";

export const metadata = { title: "Shero — Discord Bot — Case Study" };

export default function CaseStudy() {
  return (
    <div>
      <RootClient />
      <NavBar />
      <main>
        <section className="reveal">
          <div className="container">
            <article className="case-study">
              <h1 className="section-title">Shero — Discord Bot</h1>
              <p className="small muted">
                Problem → Approach → Stack → Results
              </p>

              <div className="cs-section">
                <h3>Problem</h3>
                <p>
                  Describe the challenge this project solves (e.g., scaling bot
                  features, handling millions of events across shards, ensuring
                  reliability).
                </p>
              </div>

              <div className="cs-section">
                <h3>Approach</h3>
                <p>
                  Key decisions, architecture, and trade-offs (e.g., using
                  Redis-backed queues, sharding with broadcastEval, structured
                  logging).
                </p>
              </div>

              <div className="cs-section">
                <h3>Stack</h3>
                <ul>
                  <li>Node.js</li>
                  <li>Redis</li>
                  <li>Discord.js</li>
                </ul>
              </div>

              <div className="cs-section">
                <h3>Results</h3>
                <p>
                  Outcomes, metrics, or screenshots (e.g., reduced event lag,
                  stable uptime, scalable architecture).
                </p>
              </div>

              <div className="cta" style={{ marginTop: 24 }}>
                <a className="btn" href="/projects">
                  ← Back to projects
                </a>
              </div>
            </article>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
