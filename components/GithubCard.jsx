"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function GitHubCard() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch("/api/github?type=user", { signal: ctrl.signal, cache: "no-store" }),
          fetch("/api/github?type=repos", { signal: ctrl.signal, cache: "no-store" }),
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("GitHub API failed");
        const [uData, rData] = await Promise.all([uRes.json(), rRes.json()]);
        setUser(uData);
        setRepos(Array.isArray(rData) ? rData : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Failed to load GitHub data");
      }
    })();
    return () => ctrl.abort();
  }, []);

  const totals = useMemo(() => {
    if (!repos) return null;
    let stars = 0, forks = 0;
    for (const r of repos) {
      stars += r.stargazers_count || 0;
      forks += r.forks_count || 0;
    }
    return { stars, forks };
  }, [repos]);

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        // ✅ visible glow lives here; wrapper now has the same radius
        boxShadow:
          "0 0 22px rgba(124,58,237,.45), 0 0 50px rgba(124,58,237,.25)",
        borderColor: "var(--accent)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      style={{ maxWidth: 420, width: "100%", borderRadius: 16 }}   // ✅ radius fixes the corners
    >
      <Link
        href="/github"
        className="clip-rounded hover-glow"   // ✅ keeps CSS-based glow too
        style={{
          display: "grid",
          gap: 12,
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 16,
          boxShadow: "var(--shadow)",
          width: "100%",
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          transition: "all .25s ease",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: 16 }}>GitHub</strong>
          <span className="small muted">Click to view more →</span>
        </div>

        {err ? (
          <div className="small muted">Couldn’t load stats. Try again later.</div>
        ) : (
          <div
            className="muted"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 14 }}
          >
            <div>Public repos</div>
            <div style={{ textAlign: "right", fontWeight: 700 }}>
              {user ? user.public_repos : "—"}
            </div>

            <div>Followers</div>
            <div style={{ textAlign: "right", fontWeight: 700 }}>
              {user ? user.followers : "—"}
            </div>

            <div>Following</div>
            <div style={{ textAlign: "right", fontWeight: 700 }}>
              {user ? user.following : "—"}
            </div>

            <div>Total stars</div>
            <div style={{ textAlign: "right", fontWeight: 700 }}>
              {totals ? totals.stars : "—"}
            </div>

            <div>Total forks</div>
            <div style={{ textAlign: "right", fontWeight: 700 }}>
              {totals ? totals.forks : "—"}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}
