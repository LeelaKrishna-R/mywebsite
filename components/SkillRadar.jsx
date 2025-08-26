"use client";
import { useMemo } from "react";

/**
 * props.skills: [{ label: string, value: number (0..1), link?: string }]
 */
export default function SkillRadar({ skills = [] }) {
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
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* grid rings */}
        <polygon points={ringPath(1)} fill="none" stroke="var(--border)" />
        <polygon points={ringPath(0.75)} fill="none" stroke="var(--border)" />
        <polygon points={ringPath(0.5)} fill="none" stroke="var(--border)" />
        <polygon points={ringPath(0.25)} fill="none" stroke="var(--border)" />

        {/* axes */}
        {skills.map((_, i) => {
          const [x, y] = radial(1, i);
          return (
            <line
              key={`axis-${i}`}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="var(--border)"
            />
          );
        })}

        {/* polygon */}
        <defs>
          <linearGradient id="lr-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>
        <polygon
          points={polyPath}
          fill="rgba(189,147,249,.25)"
          stroke="url(#lr-grad)"
          strokeWidth="2"
        />

        {/* axis labels */}
        {skills.map((s, i) => {
          const [x, y] = radial(1.13, i);
          const anchor = x < cx ? "end" : x > cx ? "start" : "middle";
          const dy = y < cy ? "-2" : "14";

          return (
            <a
              key={`lbl-${i}`}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ cursor: "pointer" }}
            >
              <text
                x={x}
                y={y}
                fill="var(--muted)"
                fontSize="11"
                textAnchor={anchor}
                dy={dy}
              >
                {s.label}
              </text>
            </a>
          );
        })}
      </svg>
      <p className="small muted" style={{ marginTop: 8 }}>
        Self-assessed proficiency (0–100).
      </p>
    </div>
  );
}
