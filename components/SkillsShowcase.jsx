"use client";
import { useMemo, useState } from "react";

function normalizeData(input){
  if (!Array.isArray(input)) return [];
  if (input.length > 0 && typeof input[0] === "object" && input[0] && "group" in input[0] && "items" in input[0]) {
    return input;
  }
  const map = new Map();
  for (const row of input){
    if (!Array.isArray(row)) continue;
    const [group='Other', label='Skill', level, icon, link, evidence] = row;
    if (!map.has(group)) map.set(group, []);
    map.get(group).push({ label, level, icon, link, evidence });
  }
  return Array.from(map.entries()).map(([group, items]) => ({ group, items }));
}

export default function SkillsShowcase({ data = [] }){
  const grouped = useMemo(() => normalizeData(data), [data]);
  const groups = useMemo(() => ['All', ...grouped.map(g => g.group)], [grouped]);
  const [filter, setFilter] = useState('All');
  const visible = useMemo(() => filter === 'All' ? grouped : grouped.filter(g => g.group === filter), [grouped, filter]);

  return (
    <div className="skills-wrap">
      <div style={{display:'flex',flexWrap:'wrap',gap:8,marginBottom:16}}>
        {groups.map(g => (
          <button key={g} onClick={()=>setFilter(g)} aria-pressed={filter===g} className="chip"
            style={{border: filter===g ? '1px solid var(--accent)' : '1px solid var(--border)',
              background: filter===g ? 'rgba(189,147,249,.12)' : 'var(--chip-bg)',
              padding:'8px 10px',borderRadius:999,fontWeight:600}}>{g}</button>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,minmax(0,1fr))',gap:20}}>
        {visible.map(g => (
          <div key={g.group} className="skill-card" style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,padding:18}}>
            <h4 style={{margin:'0 0 12px',fontSize:16,color:'var(--muted)',fontWeight:700,letterSpacing:'.3px'}}>{g.group}</h4>
            <div className="chips" style={{display:'flex',flexWrap:'wrap',gap:10}}>
              {g.items.map((s,i)=>(
                <a key={i} href={s.link||undefined} target={s.link?'_blank':undefined} rel={s.link?'noopener':undefined}
                  className="chip" title={s.evidence||s.label}
                  style={{display:'inline-flex',alignItems:'center',gap:8,padding:'8px 10px',borderRadius:999,background:'var(--chip-bg)',border:'1px solid var(--border)',textDecoration:'none',color:'inherit'}}>
                  {s.icon ? <i className={s.icon} aria-hidden="true" style={{fontSize:18,color:'var(--accent)'}} /> : null}
                  <span style={{fontWeight:600}}>{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
