
import NavBar from "../../components/NavBar";
import BackToTop from "../../components/BackToTop";
import ContactForm from "./ContactForm";
import RootClient from "../../components/RootClient";

export const metadata = { title: "Contact — Leelakrishna Ravuri" };

export default function ContactPage(){
  return (
    <div>
      <RootClient/>
      <main>
        <section className="reveal">
          <div className="container">
            <h1 className="section-title">Send a Message</h1>
            <p className="small muted">Use the form below to reach out.</p>
            <div className="contact-card" style={{maxWidth:'680px'}}>
              <ContactForm />
              <div className="cta" style={{marginTop:'16px'}}>
                <a className="s-btn" href="mailto:email@krishnar.xyz">✉️ Email</a>
                <a className="s-btn" href="https://github.com/LeelaKrishna-R" target="_blank" rel="noopener">GitHub</a>
                <a className="s-btn" href="https://www.linkedin.com/in/leelakrishnaravuri/" target="_blank" rel="noopener">LinkedIn</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
