
import Link from "next/link";
import NavBar from "../../components/NavBar";

export const metadata = { title: "403 — Forbidden" };

export default function ForbiddenPage(){
  return (
    <div>
      <NavBar />
      <main>
        <section>
          <div className="container" style={{padding:'96px 0', maxWidth:'760px'}}>
            <div className="fx-pop" style={{textAlign:'center'}}>
              <img src="/images/403-illustration.svg" alt="Forbidden" style={{display:"block",margin:"0 auto 16px",width:"220px",height:"160px"}}/>
              <h1 className="section-title">403 — Forbidden</h1>
              <p className="small muted fx-fadeUp fx-delay-1" style={{marginTop:8}}>
                You don’t have permission to access this page.
              </p>
              <div className="cta" style={{justifyContent:'center', marginTop:16}}>
                <Link className="btn btn-primary fx-pop fx-delay-2" href="/">Go home</Link>
                <Link className="btn fx-pop fx-delay-3" href="/contact">Contact me</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
