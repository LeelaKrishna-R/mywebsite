
"use client";
export default function ExampleContact(){
  function onSubmit(e){ e.preventDefault(); alert("This is just a demo. Use the Contact page to send."); }
  return (
    <form className="contact-card" style={{maxWidth:'680px'}} onSubmit={onSubmit}>
      <div style={{display:'grid', gap:'12px'}}>
        <label><span className="small muted">Your name</span><br/>
          <input placeholder="Leelakrishna Ravuri" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)'}}/>
        </label>
        <label><span className="small muted">Email</span><br/>
          <input type="email" placeholder="you@example.com" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)'}}/>
        </label>
        <label><span className="small muted">Message</span><br/>
          <textarea rows={5} placeholder="Hello Krishna — loved your Shero bot..." style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)'}}></textarea>
        </label>
        <div className="cta"><a className="btn btn-primary" href="/contact">Open the real form →</a></div>
      </div>
    </form>
  );
}
