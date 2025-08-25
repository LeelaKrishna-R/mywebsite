"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState("system");

  useEffect(() => {
    setMounted(true);

    let next = "system";
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        next = stored;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        next = "dark";
      } else {
        next = "light";
      }
    } catch {}

    setMode(next);
    document.documentElement.dataset.theme = next;
  }, []);

  const toggle = () => {
    const next = mode === "dark" ? "light" : "dark";
    setMode(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  if (!mounted) return null;

  return (
    <button
      className={`theme-toggle ${mode}`}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <span className="knob">
        {mode === "dark" ? (
          <span className="icon-moon">🌙</span>
        ) : (
          <span className="icon-sun">☀️</span>
        )}
      </span>
    </button>
  );
}
