"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const USER = "LeelaKrishna-R";

export default function GitHubExpanded() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [commits, setCommits] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("all");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleEsc = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (from || to || filterActive) {
          setFrom(null);
          setTo(null);
          setFilterActive(false);
        } else {
          setMounted(false);
          setTimeout(() => router.push("/"), 300);
        }
      }
    },
    [from, to, filterActive, router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  // Load user profile
  useEffect(() => {
    const ac = new AbortController();
    fetch("/api/github?type=user", { signal: ac.signal })
      .then((r) => r.json())
      .then((data) => setUser(data))
      .catch(() => {});
    return () => ac.abort();
  }, []);

  // Load repos & languages
  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/github?type=repos", { signal: ac.signal });
        const data = await res.json();
        if (!Array.isArray(data)) return;
        setRepos(data);

        const langCounts = {};
        data.forEach((r) => {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        });
        const total = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
        setLanguages(
          Object.entries(langCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([lang, count]) => ({ lang, percent: (count / total) * 100 }))
        );
      } catch {}
    })();
    return () => ac.abort();
  }, []);

  // Load commits (top 6 repos by recent activity)
  useEffect(() => {
    if (!repos.length) return;
    const ac = new AbortController();

    (async () => {
      const all = [];
      for (const repo of repos.slice(0, 6)) {
        try {
          const res = await fetch(`/api/github?type=commits&repo=${repo.name}`, {
            signal: ac.signal,
          });
          const data = await res.json();
          if (Array.isArray(data)) {
            data.forEach((c) =>
              all.push({
                repo: repo.name,
                msg: (c.commit?.message || "").split("\n")[0],
                sha: (c.sha || "").substring(0, 7),
                date: c.commit?.author?.date,
                url: c.html_url,
              })
            );
          }
        } catch {}
      }
      all.sort((a, b) => new Date(b.date) - new Date(a.date));
      setCommits(all);
    })();

    return () => ac.abort();
  }, [repos]);

  const filteredCommits = useMemo(() => {
    return commits.filter((c) => {
      if (selectedRepo !== "all" && c.repo !== selectedRepo) return false;
      if (!filterActive) return true;
      const d = new Date(c.date);
      return (!from || d >= from) && (!to || d <= to);
    });
  }, [commits, selectedRepo, filterActive, from, to]);

  // Calendar theme (matches globals.css palette)
  const calendarTheme = useMemo(
    () => ({
      dark: ["#1e1e24", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"],
      light: ["#f3f4f7", "#6366f1", "#4f46e5", "#7c3aed", "#a78bfa"],
    }),
    []
  );

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ display: "grid", gap: 48, lineHeight: 1.6, position: "relative" }}
        >
          {/* TOP SECTION: CLOSE + HEADER */}
          <div className="github-top">
            <button
              aria-label="Close GitHub panel"
              className="github-close"
              onClick={() => {
                setMounted(false);
                setTimeout(() => router.push("/"), 300);
              }}
            >
              ×
            </button>

            {user && (
              <header className="github-header">
                <img src={user.avatar_url} alt={`${user.login} avatar`} />
                <h1>{user.name || user.login}</h1>
                <p className="muted">
                  {user.followers} followers · {user.following} following
                </p>
                <p className="muted">{user.public_repos} public repositories</p>
              </header>
            )}
          </div>

          {/* MAIN GRID */}
          <div className="github-grid">
            {/* COMMITS */}
            <section>
              <h2 style={{ marginBottom: 12 }}>Recent Commits</h2>

              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <select
                  value={selectedRepo}
                  onChange={(e) => setSelectedRepo(e.target.value)}
                  className="filter-input"
                >
                  <option value="all">All Repositories</option>
                  {repos.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>

                <DatePicker
                  selected={from}
                  onChange={(date) => setFrom(date)}
                  placeholderText="From date"
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  shouldCloseOnEsc
                  className="filter-input"
                />
                <DatePicker
                  selected={to}
                  onChange={(date) => setTo(date)}
                  placeholderText="To date"
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  shouldCloseOnEsc
                  className="filter-input"
                />

                <button onClick={() => setFilterActive(true)} className="btn chip btn-accent">
                  Filter
                </button>
                {filterActive && (
                  <button
                    onClick={() => {
                      setFrom(null);
                      setTo(null);
                      setFilterActive(false);
                    }}
                    className="btn chip btn-clear"
                  >
                    Clear
                  </button>
                )}
              </div>

              {filteredCommits.slice(0, 8).map((c, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontWeight: 600, color: "var(--accent)" }}
                  >
                    {c.msg || "(no message)"}
                  </a>
                  <div className="small muted">
                    {c.repo} · {new Date(c.date).toLocaleString()} ·{" "}
                    <code
                      style={{
                        fontSize: 12,
                        background: "var(--surface-2)",
                        padding: "2px 6px",
                        borderRadius: 6,
                      }}
                    >
                      {c.sha}
                    </code>
                  </div>
                </div>
              ))}
            </section>

            {/* SIDEBAR */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <section>
                <h3 style={{ marginBottom: 8 }}>Recent Repositories</h3>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {repos.slice(0, 5).map((r) => (
                    <li key={r.id} style={{ marginBottom: 6 }}>
                      <a href={r.html_url} target="_blank" rel="noopener noreferrer">
                        {r.name}
                      </a>{" "}
                      <span className="small muted">
                        {r.language ? `· ${r.language}` : ""} · updated{" "}
                        {new Date(r.updated_at).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 style={{ marginBottom: 8 }}>Languages Used</h3>
                {languages.map((l) => (
                  <div key={l.lang} className="github-lang">
                    <div className="github-lang-label">
                      <span>{l.lang}</span>
                      <span className="small muted">{l.percent.toFixed(1)}%</span>
                    </div>
                    <div className="github-lang-track">
                      <div className="github-lang-fill" style={{ width: `${l.percent}%` }} />
                    </div>
                  </div>
                ))}
              </section>
            </aside>
          </div>

          {/* CONTRIBUTIONS */}
          <section>
            <h2 style={{ marginBottom: 12 }}>Contributions</h2>
            <GitHubCalendar
              username={USER}
              hideTotalCount
              theme={calendarTheme}
              transformData={(days) => {
                if (!filterActive || (!from && !to)) return days;
                const filtered = days.filter((d) => {
                  const date = new Date(d.date);
                  return (!from || date >= from) && (!to || date <= to);
                });
                return filtered.length ? filtered : days;
              }}
              style={{ width: "100%", overflowX: "auto" }}
            />
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
