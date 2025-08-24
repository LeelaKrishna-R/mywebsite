"use client";
import { useEffect, useState } from "react";

export default function GitHubCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    fetch("https://api.github.com/users/LeelaKrishna-R", { signal: ctrl.signal, cache: "no-store" })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  return (
    <aside
      className="gh-card"
      style={{
        display: "grid",
        gap: 10,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 14,
        boxShadow: "var(--shadow)",
        maxWidth: 360,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>GitHub</strong>
        <a className="small" href="https://github.com/LeelaKrishna-R" target="_blank" rel="noopener">
          Profile →
        </a>
      </div>

      <div
        className="muted"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}
      >
        <div>Public repos</div>
        <div style={{ textAlign: "right", fontWeight: 700 }}>{data ? data.public_repos : "—"}</div>
        <div>Followers</div>
        <div style={{ textAlign: "right", fontWeight: 700 }}>{data ? data.followers : "—"}</div>
      </div>
    </aside>
  );
}
