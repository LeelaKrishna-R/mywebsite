"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const USER = "LeelaKrishna-R";

export default function GitHubCard() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function load() {
      try {
        const [uRes, rRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`, { signal: ctrl.signal, cache: "no-store" }),
          fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`, {
            signal: ctrl.signal,
            cache: "no-store",
          }),
        ]);

        if (!uRes.ok || !rRes.ok) throw new Error("GitHub API rate-limited or unreachable");
        const [uData, rData] = await Promise.all([uRes.json(), rRes.json()]);
        setUser(uData);
        setRepos(Array.isArray(rData) ? rData : []);
      } catch (e) {
        if (e.name !== "AbortError") setErr(e.message || "Failed to load GitHub data");
      }
    }

    load();
    return () => ctrl.abort();
  }, []);

  const totals = useMemo(() => {
    if (!repos) return null;
    let stars = 0;
    let forks = 0;
    const langs = new Map();

    for (const r of repos) {
      stars += r.stargazers_count || 0;
      forks += r.forks_count || 0;
      const lang = r.language || "Other";
      langs.set(lang, (langs.get(lang) || 0) + 1);
    }

    const topLangs = Array.from(langs.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4);

    return { stars, forks, topLangs };
  }, [repos]);

  return (
    <motion.div
      whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4), 0 0 40px rgba(124, 58, 237, 0.2)", borderColor: "var(--accent)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 250, damping: 15 }}
      style={{ maxWidth: 420, width: "100%" }}
    >
      <Link
        href="/github"
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
          transition: "all 0.2s ease",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <strong style={{ fontSize: 16 }}>GitHub</strong>
          <span className="small muted">Click to view more →</span>
        </div>

        {err ? (
          <div className="small muted">Couldn’t load stats (likely rate-limited). Try again later.</div>
        ) : (
          <>
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
          </>
        )}
      </Link>
    </motion.div>
  );
}
