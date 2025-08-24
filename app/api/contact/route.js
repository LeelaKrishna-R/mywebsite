
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(input) { return String(input || "").trim().slice(0, 5000); }

export async function POST(req) {
  try {
    const { name, email, message, website } = await req.json();
    if (website) return NextResponse.json({ ok: true });
    const n = clean(name), e = clean(email), m = clean(message);
    if (!n || !e || !m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }
    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "portfolio@resend.dev";
    if (!to) return NextResponse.json({ ok: false, error: "Missing CONTACT_TO_EMAIL" }, { status: 500 });
    const subject = `New message from ${n}`;
    const html = `<div style=\"font-family:Arial,Helvetica,sans-serif;line-height:1.5;color:#111\">
        <h2 style=\"margin:0 0 8px\">Portfolio Contact</h2>
        <p style=\"margin:0 0 8px\"><b>Name:</b> ${n}</p>
        <p style=\"margin:0 0 8px\"><b>Email:</b> ${e}</p>
        <p style=\"margin:0 0 8px\"><b>Message:</b></p>
        <pre style=\"background:#f4f4f4;padding:12px;border-radius:8px;white-space:pre-wrap\">${m}</pre>
      </div>`;
    const { error } = await resend.emails.send({ from, to, subject, reply_to: e, html });
    if (error) return NextResponse.json({ ok: false, error: "Email failed" }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
