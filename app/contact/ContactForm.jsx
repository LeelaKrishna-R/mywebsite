"use client";
import { useState, useEffect } from "react";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (submitting) return;

    const formEl = e.currentTarget; // keep reference before async
    const fd = new FormData(formEl);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      website: fd.get("website"),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");

      setSent(true);
      formEl.reset();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  // Handle auto-close after 5s
  useEffect(() => {
    if (sent) {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          setSent(false);
          setFadeOut(false);
          document.querySelector("#contact-form")?.scrollIntoView({ behavior: "smooth" });
        }, 800);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [sent]);

  if (sent) {
    return (
      <div
        className={`fx-pop success-card ${fadeOut ? "fade-out" : ""}`}
        style={{
          background: "var(--surface-2)",
          border: "1px solid var(--accent)",
          borderRadius: "14px",
          padding: "28px",
          textAlign: "center",
          boxShadow: "0 0 25px rgba(34,197,94,0.4)", // 🌿 green glow
        }}
      >
        <img
          src="/images/checkMark.gif"
          alt="Success"
          width={48}
          height={48}
          style={{ marginBottom: "10px" }}
        />
        <h2 style={{ margin: "0 0 8px", color: "var(--accent)" }}>
          Message Sent!
        </h2>
        <p style={{ margin: 0, fontSize: "14px", color: "var(--muted)" }}>
          Thanks for reaching out. I’ll get back to you shortly.
        </p>
      </div>
    );
  }

  return (
    <form id="contact-form" method="post" onSubmit={onSubmit}>
      <div style={{ display: "grid", gap: "12px" }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-10000px", opacity: 0 }}
          aria-hidden="true"
        />
        <label>
          <span className="small muted">Your name</span>
          <br />
          <input
            required
            name="name"
            placeholder="Leelakrishna Ravuri"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </label>
        <label>
          <span className="small muted">Email</span>
          <br />
          <input
            required
            type="email"
            name="email"
            placeholder="your@example.com"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          />
        </label>
        <label>
          <span className="small muted">Message</span>
          <br />
          <textarea
            required
            name="message"
            rows={6}
            placeholder="Hello Krishna — loved your Shero bot..."
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid var(--border)",
              background: "var(--surface)",
              color: "var(--text)",
            }}
          ></textarea>
        </label>
        {error && (
          <div className="small" style={{ color: "#ff9393" }} role="alert">
            {error}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn btn-primary"
            type="submit"
            aria-label="Send Message"
            disabled={submitting}
            style={{ minWidth: "120px" }}
          >
            {submitting ? "Sending..." : "📨 Send"}
          </button>
        </div>
      </div>
    </form>
  );
}
