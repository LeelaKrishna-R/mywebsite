
"use client";
import { useEffect, useState } from "react";

export default function FloatingStats(){
  const [gh, setGh] = useState(null);

  useEffect(()=>{
    const ctrl = new AbortController();
    fetch("https://api.github.com/users/LeelaKrishna-R", { cache: "no-store", signal: ctrl.signal })
      .then(r=>r.json())
      .then(setGh)
      .catch(()=>{});
    return ()=> ctrl.abort();
  },[]);

  return (
    <aside aria-label="GitHub quick stats" style={{
      position: "fixed",
      right: 20,
      top: 20,
      zIndex: 40,
      display: "grid",
      gap: 10,
      maxWidth: 320
    }}>
      <div style={{
        background:"var(--surface)",
        border:"1px solid var(--border)",
        borderRadius:"16px",
        padding:"12px 14px",
        boxShadow:"var(--shadow)",
        backdropFilter:"blur(8px)"
      }}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <strong>GitHub</strong>
          <a className="small" href="https://github.com/LeelaKrishna-R" target="_blank" rel="noopener">Profile →</a>
        </div>
        <div className="small muted" style={{marginTop:6}}>
          {gh ? (
            <>
              <div>Public repos: <b>{gh.public_repos}</b></div>
              <div>Followers: <b>{gh.followers}</b></div>
            </>
          ) : "Loading..."}
        </div>
      </div>
    </aside>
  );
}
