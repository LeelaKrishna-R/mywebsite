"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SkillBars({ skills = [], title, onBack }) {
  return (
    <motion.div
      className="skill-bars-box"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "24px",
        boxShadow: "var(--shadow)",
        maxWidth: "800px",
        margin: "0 auto",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: "var(--muted)",
            margin: 0,
          }}
        >
          {title}
        </h3>
        <button
          onClick={onBack}
          className="skills-filter active"
          style={{ fontSize: 13, padding: "6px 14px" }}
        >
          ← Back
        </button>
      </div>

      {/* Subtitle */}
      <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20 }}>
        My proficiency in {title} tools and technologies
      </p>

      {/* Bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {skills.map((s, i) => {
          const percent = (s.level ?? 0) > 1 ? s.level : (s.level ?? 0) * 100;

          return (
            <div key={i} style={{ width: "100%" }}>
              {/* Label + % */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <span style={{ fontWeight: 600, color: "var(--text)" }}>
                  {s.label}
                </span>
                <span style={{ fontSize: 13, color: "var(--muted)" }}>
                  {Math.round(percent)}%
                </span>
              </div>

              {/* Animated Progress Bar */}
              <motion.div
                style={{
                  height: 8,
                  borderRadius: 6,
                  background: "var(--surface-2)",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background:
                      "linear-gradient(90deg, var(--accent), var(--accent-2))",
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
