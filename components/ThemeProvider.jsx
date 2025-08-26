"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Detect system / stored theme
  useEffect(() => {
    let next = "light";
    try {
      const stored = localStorage.getItem("theme");
      if (stored) {
        next = stored;
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        next = "dark";
      }
    } catch {}
    setTheme(next);
    document.documentElement.dataset.theme = next;
  }, []);

  // Sync <html data-theme> + localStorage when theme changes
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ✅ Correct named export
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return ctx;
}
