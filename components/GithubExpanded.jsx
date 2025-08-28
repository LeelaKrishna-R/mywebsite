"use client";
import { useEffect, useState, useCallback } from "react";
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
  const [languages, setLanguages] = useState([]);
  const [repos, setRepos] = useState([]);
  const [commits, setCommits] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState("all");
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [filterActive, setFilterActive] = useState(false);

  // Animate on mount
  useEffect(() => setMounted(true), []);

  // Escape → clear filters OR exit
  const handleEsc = useCallback((e) => {
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
  }, [from, to, filterActive, router]);
  useEffect(() => {
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [handleEsc]);

  // load user profile
  useEffect(() => {
    fetch(`https://api.github.com/users/${USER}`)
      .then(r => r.json())
      .then(setUser)
      .catch(() => {});
  }, []);

  // load repos & languages
  useEffect(() => {
    async function load() {
      const res = await fetch(`https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`);
      const data = await res.json();
      if (!Array.isArray(data)) return;

      setRepos(data);

      const langCounts = {};
      data.forEach(r => {
        if (r.language) {
          langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
      });
      const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
      setLanguages(
        Object.entries(langCounts)
          .sort((a, b) => b[1] - a[1])
          .map(([lang, count]) => ({ lang, percent: (count / total) * 100 }))
      );
    }
    load();
  }, []);

  // load commits
  useEffect(() => {
    async function loadCommits() {
      const allCommits = [];
      for (let repo of repos.slice(0, 6)) {
        try {
          const res = await fetch(`https://api.github.com/repos/${USER}/${repo.name}/commits?per_page=15`);
          const data = await res.json();
          if (Array.isArray(data)) {
            data.forEach(c => {
              allCommits.push({
                repo: repo.name,
                msg: c.commit.message.split("\n")[0],
                sha: c.sha.substring(0, 7),
                date: c.commit.author.date,
                url: c.html_url,
              });
            });
          }
        } catch {}
      }
      allCommits.sort((a, b) => new Date(b.date) - new Date(a.date));
      setCommits(allCommits);
    }
    if (repos.length) loadCommits();
  }, [repos]);

  // filter commits
  const filteredCommits = commits.filter(c => {
    if (selectedRepo !== "all" && c.repo !== selectedRepo) return false;
    if (!filterActive) return true;
    const d = new Date(c.date);
    return (!from || d >= from) && (!to || d <= to);
  });

  // theme for heatmap
  const calendarTheme = {
    dark: ["#1e1e24", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"],
    light: ["#f3f4f7", "#6366f1", "#4f46e5", "#7c3aed", "#a78bfa"],
  };

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
          {/* CLOSE BUTTON */}
          <button
            onClick={() => {
              setMounted(false);
              setTimeout(() => router.push("/"), 300);
            }}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "var(--surface-2)",
              color: "var(--text)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--surface)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface-2)";
              e.currentTarget.style.color = "var(--text)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            ×
          </button>

          {/* HEADER */}
          {user && (
            <header style={{ textAlign: "center" }}>
              <img
                src={user.avatar_url}
                alt="avatar"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: "2px solid var(--border)",
                }}
              />
              <h1 style={{ fontSize: 26, marginTop: 12 }}>{user.name || user.login}</h1>
              <p className="muted">
                {user.followers} followers · {user.following} following
              </p>
              <p className="muted">{user.public_repos} public repositories</p>
            </header>
          )}

          {/* MAIN GRID */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 32, alignItems: "start" }}>
            {/* COMMITS */}
            <section>
              <h2 style={{ marginBottom: 12 }}>Recent Commits</h2>
              <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                <select
                  value={selectedRepo}
                  onChange={e => setSelectedRepo(e.target.value)}
                  className="filter-input"
                >
                  <option value="all">All Repositories</option>
                  {repos.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
                <DatePicker
                  selected={from}
                  onChange={date => setFrom(date)}
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
                  onChange={date => setTo(date)}
                  placeholderText="To date"
                  dateFormat="yyyy-MM-dd"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  shouldCloseOnEsc
                  className="filter-input"
                />
                <button onClick={() => setFilterActive(true)} className="btn-accent">Filter</button>
                {filterActive && <button onClick={() => { setFrom(null); setTo(null); setFilterActive(false); }} className="btn-clear">Clear</button>}
              </div>

              {filteredCommits.slice(0, 8).map((c, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <a href={c.url} target="_blank" rel="noopener" style={{ fontWeight: 600, color: "var(--accent)" }}>
                    {c.msg}
                  </a>
                  <div className="small muted">
                    {c.repo} · {new Date(c.date).toLocaleString()} ·{" "}
                    <code style={{
                      fontSize: 12,
                      background: "var(--surface-2)",
                      padding: "2px 6px",
                      borderRadius: 6
                    }}>
                      {c.sha}
                    </code>
                  </div>
                </div>
              ))}
            </section>

            {/* SIDEBAR */}
            <aside style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* REPOS */}
              <section>
                <h3 style={{ marginBottom: 8 }}>Recent Repositories</h3>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {repos.slice(0, 5).map(r => (
                    <li key={r.id} style={{ marginBottom: 6 }}>
                      <a href={r.html_url} target="_blank" rel="noopener">{r.name}</a>{" "}
                      <span className="small muted">
                        {r.language ? `· ${r.language}` : ""} · updated{" "}
                        {new Date(r.updated_at).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* LANGUAGES */}
              <section>
                <h3 style={{ marginBottom: 8 }}>Languages Used</h3>
                {languages.map((l, i) => (
                  <div key={l.lang} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span>{l.lang}</span>
                      <span className="small muted">{l.percent.toFixed(1)}%</span>
                    </div>
                    <div style={{ height: 8, background: "var(--surface-2)", borderRadius: 6, overflow: "hidden" }}>
                      <div
                        style={{
                          width: `${l.percent}%`,
                          height: "100%",
                          borderRadius: 6,
                          background: "linear-gradient(90deg,var(--accent),var(--accent-2))",
                          transform: "translateX(-100%)",
                          animation: "slideFill 1.5s ease forwards",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </section>
            </aside>
          </div>

          {/* CONTRIBUTIONS */}
          <section>
            <h2 style={{ marginBottom: 12 }}>Contributions</h2>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <DatePicker
                selected={from}
                onChange={date => setFrom(date)}
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
                onChange={date => setTo(date)}
                placeholderText="To date"
                dateFormat="yyyy-MM-dd"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                shouldCloseOnEsc
                className="filter-input"
              />
              <button onClick={() => setFilterActive(true)} className="btn-accent">Search</button>
              {filterActive && (
                <button
                  onClick={() => { setFrom(null); setTo(null); setFilterActive(false); }}
                  className="btn-clear"
                >
                  Clear
                </button>
              )}
            </div>

            <GitHubCalendar
              username={USER}
              hideTotalCount={true}
              theme={calendarTheme}
              transformData={(contributions) => {
                if (!filterActive || (!from && !to)) return contributions;
                const filtered = contributions.filter(day => {
                  const d = new Date(day.date);
                  return (!from || d >= from) && (!to || d <= to);
                });
                return filtered.length > 0 ? filtered : contributions;
              }}
              style={{ width: "100%", overflowX: "auto" }}
            />
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
