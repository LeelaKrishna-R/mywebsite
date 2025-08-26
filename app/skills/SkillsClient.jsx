"use client";
import { useState } from "react";
import SkillsShowcase from "../../components/SkillsShowcase";
import SkillRadar from "../../components/SkillRadar";
import skillsData from "../../lib/skillsData";
import { DOCS, LEVELS_0_TO_1 } from "../../lib/skillDocs";

export default function SkillsClient() {
  const [filter, setFilter] = useState("All");

  // Flatten all skills for radar
  const radarSkills = Array.from(
    new Map(
      skillsData.flatMap((g) =>
        (g.items || []).map((it) => [
          it.label,
          {
            label: it.label,
            value: (it.level ?? LEVELS_0_TO_1[it.label] ?? 70) / 100,
            link: it.link || DOCS[it.label],
          },
        ])
      )
    ).values()
  );

  return (
    <>
      {/* Filter chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, margin: "20px 0" }}>
        {["All", ...skillsData.map((g) => g.group)].map((g) => (
          <button
            key={g}
            onClick={() => setFilter(g)}
            className={`chip ${filter === g ? "active" : ""}`}
          >
            {g}
          </button>
        ))}
      </div>

      {/* Top graph */}
      {filter === "All" ? (
        <div style={{ margin: "18px 0 28px" }}>
          <SkillRadar skills={radarSkills} />
        </div>
      ) : (
        <SkillsShowcase
          data={skillsData.filter((g) => g.group === filter)}
          mode="bars"
        />
      )}

      {/* Tiles (only when "All") */}
      {filter === "All" && <SkillsShowcase data={skillsData} mode="chips" />}
    </>
  );
}
