"use client";
import { useMemo } from "react";

/**
 * props.skills: [{ label: string, value: number (0..1), link?: string }]
 * - value is 0..1 (your original scale)
 * - if link is provided, axis labels are clickable and open docs
 */
export default function SkillRadar({
  skills = [
    { label: "JavaScript", value: 0.9 },
    { label: "React", value: 0.85 },
    { label: "Next.js", value: 0.8 },
    { label: "Python", value: 0.75 },
    { label: "AI/ML", value: 0.7 },
    { label: "Databases", value: 0.65 },
  ],
}) {
  const size = 360;
  const cx = size / 2;
  const cy = size / 2;
  const r = 135;

  const points = Math.max(3, skills.length);
  const angle = (i) => (Math.PI * 2 * (i / points)) - Math.PI / 2;
  const radial = (val, i) => [
    cx + Math.cos(angle(i)) * r * val,
    cy + Math.sin(angle(i)) * r * val,
  ];
  const ringPath = (val) =>
    skills.map((_, i) => radial(val, i).join(",")).join(" ");

  const polyPath = useMemo(
    () => skills.map((s, i) => radial(s.value ?? 0, i).join(",")).join(" "),
    [skills]
  );

  return (
    <div style={{ display: "grid", placeItems: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label="Radar chart of skills">
        {/* grid rings */}
        <polygon points={ringPath(1)} fill="none" stroke="rgba(255,255,255,.15)" />
        <polygon points={ringPath(0.75)} fill="none" stroke="rgba(255,255,255,.12)" />
        <polygon points={ringPath(0.5)} fill="none" stroke="rgba(255,255,255,.10)" />
        <polygon points={ringPath(0.25)} fill="none" stroke="rgba(255,255,255,.08)" />

        {/* axes */}
        {skills.map((_, i) => {
          const [x, y] = radial(1, i);
          return <line key={`axis-${i}`} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,.12)" />;
        })}

        {/* polygon */}
        <defs>
          <linearGradient id="lr-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <polygon points={polyPath} fill="rgba(189,147,249,.25)" stroke="url(#lr-grad)" strokeWidth="2" />

        {/* axis labels (clickable if link provided) */}
        {skills.map((s, i) => {
          const [x, y] = radial(1.13, i);
          const anchor =
            x < cx ? "end" : x > cx ? "start" : "middle";
          const dy = y < cy ? "-2" : "14";
          const label = (
            <text
              x={x}
              y={y}
              fill="var(--muted)"
              fontSize="11"
              textAnchor={anchor}
              dy={dy}
              style={{ pointerEvents: s.link ? "auto" : "none" }}
            >
              {s.label}
            </text>
          );
          return s.link ? (
            <a
              key={`lbl-${i}`}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ cursor: "pointer" }}
            >
              {label}
            </a>
          ) : (
            <g key={`lbl-${i}`}>{label}</g>
          );
        })}
      </svg>

      <p className="small muted" style={{ marginTop: 8 }}>
        Self-assessed proficiency (0–100).
      </p>
    </div>
  );
}
