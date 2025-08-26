"use client";
import { useMemo } from "react";

function normalizeData(data) {
  return data.map((g) => ({
    group: g.group,
    items: g.items.map((s) => ({
      ...s,
      level: s.level || 70, // default level if not set
    })),
  }));
}

export default function SkillsShowcase({ data = [], mode = "chips" }) {
  const grouped = useMemo(() => normalizeData(data), [data]);

  return (
    <div
      className="skills-wrap"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "16px",
        alignItems: "start",
      }}
    >
      {grouped.map((g) => (
        <div
          key={g.group}
          className="skill-card"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 16px",
            minHeight: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: 15,
              color: "var(--muted)",
              fontWeight: 700,
            }}
          >
            {g.group}
          </h4>

          {/* MODE: Progress Bars */}
          {mode === "bars" ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {g.items.map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                      fontSize: 14,
                    }}
                  >
                    <span>{s.label}</span>
                    <span>{s.level}%</span>
                  </div>
                  <div
                    style={{
                      background: "var(--border)",
                      borderRadius: 6,
                      overflow: "hidden",
                      height: 6,
                    }}
                  >
                    <div
                      style={{
                        width: `${s.level}%`,
                        background:
                          "linear-gradient(90deg, var(--accent), var(--accent-2))",
                        height: "100%",
                        borderRadius: 6,
                        transition: "width 0.6s ease", // smooth bar animation
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* MODE: Chips */
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {g.items.map((s, i) => (
                <a
  key={i}
  href={s.link || undefined}
  target={s.link ? "_blank" : undefined}
  rel={s.link ? "noopener" : undefined}
  className="chip"
  style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "4px 9px",              // 🔥 slimmer padding
    borderRadius: 10,                // 🔥 less pill, more modern rounded
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    fontSize: 13,                    // 🔥 smaller text
    fontWeight: 600,
    lineHeight: 1.3,
    color: "var(--text)",
    transition: "all 0.2s ease",
  }}
>

                  {s.icon && (
                    <i
                      className={s.icon}
                      aria-hidden="true"
                      style={{ fontSize: 16, color: "var(--accent)" }}
                    />
                  )}
                  <span>{s.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
