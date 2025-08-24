"use client";
import { useEffect, useState } from "react";

/**
 * Two-state theme toggle (dark <-> light), defaults to system.
 * - Reads localStorage('theme') if user toggled before
 * - Otherwise follows system and updates on OS changes
 * - Never touches document at render; only inside effects
 */
export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("light"); // UI uses this state; dataset mirrors it in effects

  // Initial mount: compute theme and apply to <html data-theme=...>
  useEffect(() => {
    setMounted(true);

    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const mq = typeof window !== "undefined" ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    const initial = stored || (mq && mq.matches ? "dark" : "light");
    setMode(initial);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = initial;
    }

    // If user hasn't picked a preference, keep following system changes
    const onChange = (e) => {
      if (!stored) {
        const sys = e.matches ? "dark" : "light";
        setMode(sys);
        document.documentElement.dataset.theme = sys;
      }
    };
    mq?.addEventListener?.("change", onChange);
    return () => mq?.removeEventListener?.("change", onChange);
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = next;
    }
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Don’t render the control until mounted (prevents hydration mismatch)
  if (!mounted) return null;

  const isDark = mode === "dark";

  return (
    <button
      aria-label="Toggle theme"
      onClick={toggle}
      style={{
        position: "fixed",
        bottom: 20,
        left: 20,
        zIndex: 50,
        width: 68,
        height: 34,
        borderRadius: 999,
        border: "1px solid var(--border)",
        background: "var(--surface)",
        display: "inline-flex",
        alignItems: "center",
        padding: 4,
        gap: 6,
        boxShadow: "var(--shadow)",
        transition: "background .25s ease, border-color .25s ease",
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 16, marginLeft: 6 }}>
        🌙
      </span>
      <span aria-hidden="true" style={{ fontSize: 16, marginLeft: "auto", marginRight: 8 }}>
        ☀️
      </span>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: isDark ? 4 : 34,
          top: 4,
          width: 26,
          height: 26,
          borderRadius: "50%",
          background: "var(--accent)",
          boxShadow: "0 6px 18px rgba(0,0,0,.35)",
          transition: "left .28s cubic-bezier(.4,0,.2,1), transform .28s ease",
          transform: isDark ? "rotate(-8deg)" : "rotate(8deg)",
        }}
      />
    </button>
  );
}
