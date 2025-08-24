
import NavBar from "../../../components/NavBar";
import RootClient from "../../../components/RootClient";

export const metadata = { title: "LLM experiments and notes — Blog" };

export default function Post(){
  return (
    <div>
      <RootClient/>
      <NavBar />
      <main>
        <section className="reveal">
          <div className="container">
            <h1 className="section-title">LLM experiments and notes</h1>
            <p style={{color:'var(--muted)'}}>by Leelakrishna Ravuri · {new Date().toLocaleDateString(undefined, {year:'numeric', month:'short', day:'2-digit'})}</p>
            <p>This is a test article. Replace with your content.</p>
            <p>Use this space to write about your approach, decisions, and what you learned.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
