import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function clean(input) {
  return String(input || "").trim().slice(0, 5000);
}

export async function POST(req) {
  try {
    const { name, email, message, website } = await req.json();
    if (website) return NextResponse.json({ ok: true });

    const n = clean(name), e = clean(email), m = clean(message);
    if (!n || !e || !m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    if (!to) return NextResponse.json({ ok: false, error: "Missing CONTACT_TO_EMAIL" }, { status: 500 });

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: `New message from ${n}`,
      reply_to: e,
      html: `
        <h2>Portfolio Contact</h2>
        <p><b>Name:</b> ${n}</p>
        <p><b>Email:</b> ${e}</p>
        <p><b>Message:</b></p>
        <pre>${m}</pre>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: error.message || "Email failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
