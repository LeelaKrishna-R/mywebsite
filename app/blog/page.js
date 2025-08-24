
import NavBar from "../../components/NavBar";
import Link from "next/link";
import RootClient from "../../components/RootClient";

export const metadata = { title: "Blog — Leelakrishna Ravuri" };

const posts = [
  { slug: "how-i-built-this", title: "How I built this portfolio", date: "2025-08-20", author: "Leelakrishna Ravuri", tags:["Web","Next.js","Design"], minutes: 4 },
  { slug: "portfolio-architecture", title: "The architecture of this site", date: "2025-08-24", author: "Leelakrishna Ravuri", tags:["Architecture","Next.js"], minutes: 3 },
  { slug: "llm-notes", title: "LLM experiments and notes", date: "2025-08-22", author: "Leelakrishna Ravuri", tags:["AI","LLM"], minutes: 5 },

  { slug: "how-i-built-this", title: "How I built this portfolio", date: "2025-08-20", author: "Leelakrishna Ravuri" },
  { slug: "portfolio-architecture", title: "The architecture of this site", date: "2025-08-24", author: "Leelakrishna Ravuri" },
  { slug: "llm-notes", title: "LLM experiments and notes", date: "2025-08-22", author: "Leelakrishna Ravuri" },
];

function fmt(d){ return new Date(d).toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' }); }

export default function BlogIndex(){
  return (
    <div>
      <RootClient/>
      <main>
        <section className="reveal">
          <div className="container">
            <h1 className="section-title">Blog</h1>
            <ul style={{listStyle:'none', padding:0, display:'grid', gap:'12px'}}>
              {posts.map(p => (
                <li key={p.slug} style={{border:'1px solid var(--border)', borderRadius:'12px', padding:'14px', background:'var(--surface)'}}>
                  <Link href={`/blog/${p.slug}`}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'baseline', gap:'12px', flexWrap:'wrap'}}>
                      <span style={{fontWeight:700}}>{p.title}</span>
                      <span style={{color:'var(--muted)', fontSize:'14px'}}>{fmt(p.date)} · {p.author} · {p.minutes} min</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
