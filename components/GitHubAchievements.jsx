"use client";

export default function GitHubAchievements() {
  // GitHub doesn’t expose achievements directly via REST easily,
  // so we’ll mock / manually list for now.
  const badges = [
    { name: "Pull Shark", emoji: "🦈" },
    { name: "YOLO Merged", emoji: "⚡" },
    { name: "Quickdraw", emoji: "🎯" },
  ];

  return (
    <section style={{ marginBottom: 40 }}>
      <h2 style={{ marginBottom: 12 }}>Achievements</h2>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        {badges.map((b, i) => (
          <div
            key={i}
            style={{
              padding: "8px 12px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: 12,
            }}
          >
            <span style={{ fontSize: 18, marginRight: 6 }}>{b.emoji}</span>
            {b.name}
          </div>
        ))}
      </div>
    </section>
  );
}
