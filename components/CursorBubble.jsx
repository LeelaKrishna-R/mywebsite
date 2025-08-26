"use client";
import { useEffect, useState } from "react";

export default function CursorBubble() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);

    const interval = setInterval(() => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.15, // lag factor
        y: prev.y + (pos.y - prev.y) * 0.15,
      }));
    }, 16);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      clearInterval(interval);
    };
  }, [pos]);

  return (
    <>
      <div className="cursor-main" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-trail" style={{ left: trailPos.x, top: trailPos.y }} />
    </>
  );
}
