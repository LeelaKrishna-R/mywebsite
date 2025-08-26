import SkillsClient from "./SkillsClient";

export const metadata = {
  title: "Skills — Leelakrishna Ravuri",
};

export default function SkillsPage() {
  return (
    <main>
      <section className="container" style={{ padding: "56px 0" }}>
        <h1 className="section-title">Skills</h1>
        <p className="small muted">Explore my technical skills.</p>
        <SkillsClient />
      </section>
    </main>
  );
}
