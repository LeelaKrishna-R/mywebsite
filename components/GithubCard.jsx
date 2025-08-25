"use client";
import { useEffect, useState, useMemo } from "react";

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
    <aside
      className="gh-card"
      style={{
        display: "grid",
        gap: 12,
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 16,
        boxShadow: "var(--shadow)",
        maxWidth: 420,
        width: "100%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong style={{ fontSize: 16 }}>GitHub</strong>
        <a className="small" href={`https://github.com/${USER}`} target="_blank" rel="noopener">
          Profile →
        </a>
      </div>

      {err ? (
        <div className="small muted">Couldn’t load stats (likely rate-limited). Try again later.</div>
      ) : (
        <>
          {/* top row numbers */}
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

          {/* top languages */}
          <div>
            <div className="small muted" style={{ marginBottom: 6 }}>
              Top languages (by repos)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {totals
                ? totals.topLangs.map(([lang, count]) => (
                    <span
                      key={lang}
                      className="tag"
                      style={{
                        fontSize: 12,
                        padding: "6px 10px",
                        background: "rgba(189,147,249,.12)",
                        border: "1px solid rgba(189,147,249,.35)",
                        color: "var(--accent)",
                        borderRadius: 999,
                      }}
                    >
                      {lang} · {count}
                    </span>
                  ))
                : [1, 2, 3, 4].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 70,
                        height: 20,
                        borderRadius: 999,
                        background: "var(--surface-2)",
                        border: "1px solid var(--border)",
                      }}
                    />
                  ))}
            </div>
          </div>
        </>
      )}
    </aside>
  );
}
