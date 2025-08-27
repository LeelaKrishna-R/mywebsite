"use client";
import { useMemo } from "react";
import { DOCS } from "../lib/skillDocs"; // ✅ use doc links

function normalizeData(input) {
  if (!Array.isArray(input)) return [];
  if (
    input.length > 0 &&
    typeof input[0] === "object" &&
    input[0] &&
    "group" in input[0] &&
    "items" in input[0]
  ) {
    return input;
  }
  const map = new Map();
  for (const row of input) {
    if (!Array.isArray(row)) continue;
    const [group = "Other", label = "Skill", level, icon, link, evidence] = row;
    if (!map.has(group)) map.set(group, []);
    map.get(group).push({ label, level, icon, link, evidence });
  }
  return Array.from(map.entries()).map(([group, items]) => ({ group, items }));
}

export default function SkillsShowcase({ data = [], filter, setFilter, hideFilters = false }) {
  const grouped = useMemo(() => normalizeData(data), [data]);
  const groups = useMemo(() => ["All", ...grouped.map((g) => g.group)], [grouped]);

  const visible = useMemo(
    () => (filter === "All" ? grouped : grouped.filter((g) => g.group === filter)),
    [grouped, filter]
  );

  return (
    <div className="skills-wrap container">
      {!hideFilters && (
        <div className="skills-filters">
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setFilter(g)}
              aria-pressed={filter === g}
              className={`skills-filter ${filter === g ? "active" : ""}`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Skill Cards */}
      <div className="skills-grid">
        {visible.map((g) => (
          <div
            key={g.group}
            className="skill-box hoverable-card"
            onClick={() => setFilter(g.group)}
          >
            {/* Card Header (clickable → opens bars) */}
            <h4
              className="skill-box-title"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <span>{g.group}</span>
              <span style={{ fontSize: 14, opacity: 0.7 }}></span>
            </h4>

            {/* Pills (open docs) */}
            <div className="skill-pills">
              {g.items.map((s, i) => {
                const docLink = DOCS[s.label];
                return (
                  <a
                    key={i}
                    href={docLink || "#"}
                    target={docLink ? "_blank" : undefined}
                    rel={docLink ? "noopener noreferrer" : undefined}
                    className="skill-pill"
                    title={s.evidence || s.label}
                    onClick={(e) => e.stopPropagation()} // ✅ stop card click
                  >
                    {s.icon ? <i className={s.icon} aria-hidden="true" /> : null}
                    <span className="label">{s.label}</span>
                    {docLink && (
                      <span
                        style={{
                          fontSize: 12,
                          opacity: 0.7,
                          marginLeft: 4,
                        }}
                      >
                        ↗
                      </span>
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
