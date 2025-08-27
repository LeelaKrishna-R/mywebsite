// app/skills/page.js
import SkillsClient from "./SkillsClient";
import skillsData from "../../lib/skillsData";

export const metadata = { title: "Skills — Leelakrishna Ravuri" };

export default function SkillsPage() {
  return (
    <main>
      <section className="container" style={{ padding: "56px 0" }}>
        <h1 className="section-title">Skills</h1>
        <SkillsClient skillsData={skillsData} />
      </section>
    </main>
  );
}
