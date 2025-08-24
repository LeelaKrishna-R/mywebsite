
"use client";
import { useState } from "react";

export default function ContactForm(){
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e){
    e.preventDefault();
    setError("");
    if(submitting) return;
    const fd = new FormData(e.currentTarget);
    const payload = { name: fd.get("name"), email: fd.get("email"), message: fd.get("message"), website: fd.get("website") };
    if(!payload.name || !payload.email || !payload.message){ setError("Please fill in all fields."); return; }
    setSubmitting(true);
    try{
      const res = await fetch("/api/contact", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(payload) });
      const data = await res.json();
      if(!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setSent(true); e.currentTarget.reset();
    }catch(err){ setError(err.message || "Something went wrong"); }
    finally{ setSubmitting(false); }
  }

  if(sent){ return <div className="fx-pop">Thanks! Your message has been sent. I’ll get back to you soon.</div>; }

  return (
    <form method="post" onSubmit={onSubmit}>
      <div style={{display:'grid', gap:'12px'}}>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{position:'absolute',left:'-10000px',opacity:0}} aria-hidden="true" />
        <label><span className="small muted">Your name</span><br/>
          <input required name="name" placeholder="Ada Lovelace" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)'}}/>
        </label>
        <label><span className="small muted">Email</span><br/>
          <input required type="email" name="email" placeholder="you@example.com" style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)'}}/>
        </label>
        <label><span className="small muted">Message</span><br/>
          <textarea required name="message" rows={6} placeholder="Hello Krishna — loved your Shero bot..." style={{width:'100%',padding:'12px',borderRadius:'10px',border:'1px solid var(--border)',background:'var(--surface)',color:'var(--text)'}}></textarea>
        </label>
        {error && <div className="small" style={{color:'#ff9393'}} role="alert">{error}</div>}
        <button className="btn btn-primary" type="submit" aria-label="Send Message" disabled={submitting}>
          {submitting ? "Sending..." : "📨 Send"}
        </button>
      </div>
    </form>
  );
}
