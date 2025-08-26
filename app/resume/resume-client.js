"use client";

import BackToTop from "../../components/BackToTop";
import RootClient from "../../components/RootClient";
import { useTheme } from "../../components/ThemeProvider";

export default function ClientResumePage() {
  const { theme } = useTheme();

  return (
    <div>
      <RootClient />
      <main>
        <section className="reveal">
          <div className="container">
            <h1 className="section-title">Resume</h1>
            <p className="subtitle">
              Download an ATS-friendly version or grab the original PDF.
            </p>

            <div className="contact-card" style={{ marginTop: 12 }}>
              <strong>Downloads</strong>
              <div
                className="cta"
                style={{
                  marginTop: 12,
                  gap: "10px",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <a
                  className="btn btn-primary"
                  href="/resume/Leelakrishna-Ravuri-ATS.pdf"
                  download
                >
                  Download ATS PDF
                </a>
                <a className="btn" href="/resume/resume-ats.txt" download>
                  Download ATS TXT
                </a>
                <a
                  className="btn"
                  href="/resume/Leelakrishna_Ravuri_Original.pdf"
                  download
                >
                  Download original
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
