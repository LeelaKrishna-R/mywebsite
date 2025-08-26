"use client";
import { useEffect, useRef, useState } from "react";

let activeEl = null;
function deactivateOthers(except) {
  if (typeof document === "undefined") return;
  document.querySelectorAll(".card.active").forEach((c) => {
    if (c !== except) {
      c.classList.remove("active", "flipped");
    }
  });
  activeEl = except || null;
}

export default function ProjectCard({
  title,
  desc,
  tags = [],
  links = [],
  backTitle = "Details",
  backText = "More details coming soon.",
}) {
  const cardRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (card) card.setAttribute("tabindex", "0");

    const onDocClick = (e) => {
      if (!card) return;
      if (active && !card.contains(e.target)) {
        card.classList.remove("active", "flipped");
        setActive(false);
        if (activeEl === card) activeEl = null;
      }
    };
    document.addEventListener("click", onDocClick, true);
    return () => document.removeEventListener("click", onDocClick, true);
  }, [active]);

  function setActiveCard(nextActive) {
    const card = cardRef.current;
    if (!card) return;
    if (nextActive) {
      deactivateOthers(card);
      card.classList.add("active", "flipped");
      setActive(true);
      activeEl = card;
    } else {
      card.classList.remove("active", "flipped");
      setActive(false);
      if (activeEl === card) activeEl = null;
    }
  }

  function onClick(e) {
    if (e.target.closest("a, button")) return;
    e.preventDefault();
    setActiveCard(!active);
  }
  function onKeyDown(e) {
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
      setActiveCard(!active);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setActiveCard(false);
    }
  }

  return (
    <article
      ref={cardRef}
      className={`card reveal${active ? " active flipped" : ""}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <div className="card-inner">
        {/* Front */}
        <div className="card-face front">
          <div className="body">
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="tags">
              {tags.map((t, i) => (
                <span className="tag" key={i}>{t}</span>
              ))}
            </div>
            <div
              style={{ marginTop: 12, display: "flex", gap: "10px", flexWrap: "wrap" }}
              onClick={(e) => e.stopPropagation()}
            >
              {links.map((l, i) => (
                <a
                  className="btn"
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="card-face back">
          <h4 style={{ marginTop: 0 }}>{backTitle}</h4>
          <p>{backText}</p>
        </div>
      </div>
    </article>
  );
}
