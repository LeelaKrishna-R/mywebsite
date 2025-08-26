"use client";
import { useEffect, useState } from "react";

export default function CursorBubble() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // detect if hover/fine pointer is supported (desktop only)
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mediaQuery.matches);

    const handleChange = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isDesktop]);

  // trail lags behind main
  useEffect(() => {
    if (!isDesktop) return;

    const id = requestAnimationFrame(function animate() {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      requestAnimationFrame(animate);
    });
    return () => cancelAnimationFrame(id);
  }, [isDesktop, pos]);

  if (!isDesktop) return null; // 🚫 don’t render on touch devices

  return (
    <>
      <div
        className="cursor-main"
        style={{ left: pos.x, top: pos.y }}
      />
      <div
        className="cursor-trail"
        style={{ left: trailPos.x, top: trailPos.y }}
      />
    </>
  );
}
