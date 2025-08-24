
"use client";
export default function RouteError({ error, reset }){
  return (
    <div className="container" style={{padding:'96px 0', maxWidth:'760px'}}>
      <div className="fx-pop" style={{textAlign:'center'}}>
        <h1 className="section-title">Oops — something broke here</h1>
        <p className="small muted" style={{marginTop:8}}>This section failed to render. You can retry just this page.</p>
        <div className="cta" style={{justifyContent:'center', marginTop:16, gap: '10px', display: 'flex', flexWrap: 'wrap'}}>
          <button className="btn btn-primary" onClick={()=>reset()}>Try again</button>
          <a className="btn" href="/">Go home</a>
        </div>
      </div>
    </div>
  );
}
