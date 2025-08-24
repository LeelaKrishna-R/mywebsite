import SkillsShowcase from "../../components/SkillsShowcase";
import SkillRadar from "../../components/SkillRadar";
import skillsData from "../../lib/skillsData";
import { DOCS, LEVELS_0_TO_1 } from "../../lib/skillDocs";

export const metadata = { title: "Skills — Leelakrishna Ravuri" };

export default function SkillsPage() {
  // Flatten to one array for the radar: [{ label, value(0..1), link }]
  const radarSkills = Array.from(
    new Map(
      skillsData.flatMap((g) =>
        (g.items || []).map((it) => [
          it.label,
          {
            label: it.label,
            value: LEVELS_0_TO_1[it.label] ?? 0.6,
            link: DOCS[it.label],
          },
        ])
      )
    ).values()
  );

  return (
    <main>
      <section className="container" style={{ padding: "56px 0" }}>
        <h1 className="section-title">Skills</h1>

        {/* Radar / spider chart */}
        <div style={{ margin: "18px 0 28px" }}>
          <SkillRadar skills={radarSkills} />
        </div>

        {/* Your existing chips grid */}
        <SkillsShowcase data={skillsData} />
      </section>
    </main>
  );
}
