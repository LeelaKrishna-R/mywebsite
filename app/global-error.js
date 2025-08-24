
"use client";
import Link from "next/link";

export default function GlobalError({ error, reset }){
  return (
    <html>
      <body>
        <main>
          <section>
            <div className="container" style={{padding:'96px 0', maxWidth:'760px'}}>
              <div className="fx-pop" style={{textAlign:'center'}}>
                <img src="/images/500-illustration.svg" alt="Server error" style={{display:"block",margin:"0 auto 16px",width:"220px",height:"160px"}}/>
                <h1 className="section-title">Something went wrong</h1>
                <p className="small muted fx-fadeUp fx-delay-1" style={{marginTop:8}}>
                  We hit an unexpected error (500). You can retry or head back home.
                </p>
                <div className="cta" style={{justifyContent:'center', marginTop:16, gap: '10px', display: 'flex', flexWrap: 'wrap'}}>
                  <button className="btn btn-primary fx-pop fx-delay-2" onClick={()=>reset()}>Try again</button>
                  <Link className="btn fx-pop fx-delay-3" href="/">Go home</Link>
                  <a className="btn fx-pop fx-delay-4" href="mailto:email@krishnar.xyz?subject=Site%20error%20report">Report issue</a>
                </div>
                <p className="small muted" style={{marginTop:14}}>Tip: in dev, errors in shared layout can block navigation. This page keeps working links available.</p>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
