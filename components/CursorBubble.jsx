"use client";
import { useEffect } from "react";

export default function CursorBubble() {
  useEffect(() => {
    // Disable entirely on touch devices (iOS/Android)
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;

    if (isTouch) return; // do not run cursor on mobile/tablet

    const main = document.createElement("div");
    const trail = document.createElement("div");
    main.className = "cursor-main";
    trail.className = "cursor-trail";
    document.body.appendChild(main);
    document.body.appendChild(trail);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let trailX = mouseX;
    let trailY = mouseY;

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", move);

    const animate = () => {
      // linear interpolation (smooth follow)
      trailX += (mouseX - trailX) * 0.15;
      trailY += (mouseY - trailY) * 0.15;

      main.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      trail.style.transform = `translate(${trailX}px, ${trailY}px) translate(-50%, -50%)`;

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", move);
      main.remove();
      trail.remove();
    };
  }, []);

  return null;
}
