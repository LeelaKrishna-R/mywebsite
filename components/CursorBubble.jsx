"use client";
import { useEffect, useState } from "react";

export default function CursorBubble() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  // detect if desktop (hover + fine pointer)
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setIsDesktop(mq.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // mouse move
  useEffect(() => {
    if (!isDesktop) return;

    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true); // make visible again when mouse moves back in
    };
    const leave = () => setVisible(false); // fade out
    const enter = () => setVisible(true);  // fade in

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, [isDesktop]);

  // trailing motion
  useEffect(() => {
    if (!isDesktop) return;
    let raf;
    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (pos.x - prev.x) * 0.12,
        y: prev.y + (pos.y - prev.y) * 0.12,
      }));
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [isDesktop, pos]);

  if (!isDesktop) return null;

  return (
    <>
      <div
        className="cursor-main"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.35s ease-out",
        }}
      />
      <div
        className="cursor-trail"
        style={{
          left: trailPos.x,
          top: trailPos.y,
          opacity: visible ? 0.75 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      />
    </>
  );
}
