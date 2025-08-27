"use client";
import { useState } from "react";
import { DOCS, LEVELS_0_TO_1 } from "../../lib/skillDocs";
import SkillsShowcase from "../../components/SkillsShowcase";
import SkillRadar from "../../components/SkillRadar";
import SkillBars from "../../components/SkillBars";

export default function SkillsClient({ skillsData }) {
  const [filter, setFilter] = useState("All");

  // Flatten skills based on filter
  const filteredSkills =
    filter === "All"
      ? skillsData.flatMap((g) => g.items)
      : skillsData.find((g) => g.group === filter)?.items ?? [];

  // Add docs + levels
  const skillsWithMeta = filteredSkills.map((s) => ({
    ...s,
    link: DOCS[s.label] ?? null,
    level: LEVELS_0_TO_1[s.label] ?? 0.6,
  }));

  // Radar data (all skills)
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
    <div>
      {/* Graph Slot */}
      <div style={{ margin: "18px 0 28px" }}>
        {filter === "All" ? (
          <SkillRadar skills={radarSkills} />
        ) : (
          <SkillBars
            skills={skillsWithMeta}
            title={filter}
            onBack={() => setFilter("All")}
          />
        )}
      </div>

      {/* Filters + all cards when All is selected */}
      {filter === "All" && (
        <SkillsShowcase data={skillsData} filter={filter} setFilter={setFilter} />
      )}

      {/* Other cards only when category selected */}
      {filter !== "All" && (
        <SkillsShowcase
          data={skillsData.filter((g) => g.group !== filter)}
          filter={filter}
          setFilter={setFilter}
          hideFilters
        />
      )}
    </div>
  );
}
