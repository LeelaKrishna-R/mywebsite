
import Link from "next/link";

export default function NotFound(){
  return (
    <main>
      <section>
        <div className="container" style={{padding:'96px 0', maxWidth:'760px'}}>
          <div className="fx-pop" style={{textAlign:'center'}}>
            <img src="/images/404-illustration.svg" alt="Not found" style={{display:"block",margin:"0 auto 16px",width:"220px",height:"160px"}}/>
            <h1 className="section-title">404 — Page not found</h1>
            <p className="small muted fx-delay-1 fx-fadeUp" style={{marginTop:8}}>
              The page you’re looking for doesn’t exist or has been moved.
            </p>
            <div className="cta" style={{justifyContent:'center', marginTop:16, display:'flex'}}>
              <Link className="btn btn-primary fx-delay-2 fx-pop" href="/">Go home</Link>
              <Link className="btn fx-delay-3 fx-pop" href="/projects">See projects</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
