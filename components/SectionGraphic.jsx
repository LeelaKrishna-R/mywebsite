
export default function SectionGraphic({ variant = "blob", style = {} }){
  if(variant === "grid"){
    return (
      <div aria-hidden="true" style={{position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:.18, ...style}}>
        <svg width="100%" height="100%">
          <defs>
            <pattern id="tinyGrid" width="28" height="28" patternUnits="userSpaceOnUse">
              <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--border)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tinyGrid)" />
        </svg>
      </div>
    );
  }
  return (
    <div aria-hidden="true" style={{position:"absolute", right:"-140px", top:"-120px", width:"420px", height:"420px", filter:"blur(80px)", zIndex:0, pointerEvents:"none", opacity:.2, ...style}}>
      <div style={{width:"100%", height:"100%", background:"conic-gradient(from 0deg, var(--accent), var(--accent-2), var(--accent))", borderRadius:"50%"}}/>
    </div>
  );
}
