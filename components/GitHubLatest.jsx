
"use client";
import { useEffect, useState } from "react";

export default function GitHubLatest(){
  const [repos, setRepos] = useState([]);
  useEffect(()=>{
    fetch("/api/github").then(r=>r.json()).then(setRepos).catch(()=>{});
  },[]);
  if(!repos.length) return null;
  return (
    <div className="contact-card" style={{marginTop:16}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center', marginBottom:8}}>
        <strong>Latest on GitHub</strong>
        <a className="small" href="https://github.com/LeelaKrishna-R" target="_blank" rel="noopener">View profile →</a>
      </div>
      <ul style={{margin:0,paddingLeft:16}}>
        {repos.map((r,i)=> <li key={i}><a href={r.url} target="_blank" rel="noopener">{r.name}</a> <span className="small muted">· updated {new Date(r.updated_at).toLocaleDateString()}</span></li>)}
      </ul>
    </div>
  );
}
