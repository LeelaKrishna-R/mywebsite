"use client";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggle}
      aria-label="Toggle theme"
    >
      <span className="knob">{theme === "dark" ? "🌙" : "☀️"}</span>
    </button>
  );
}
