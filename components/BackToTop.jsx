
"use client";
import { useEffect, useState } from "react";
export default function BackToTop(){
  const [show, setShow] = useState(false);
  useEffect(()=>{
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  if(!show) return null;
  return (
    <button aria-label="Back to top" onClick={()=>window.scrollTo({top:0, behavior:'smooth'})}
      style={{position:'fixed', right:'20px', bottom:'24px', zIndex:60, padding:'10px 12px', borderRadius:'999px', border:'1px solid var(--border)', background:'var(--surface-2)', color:'var(--text)', boxShadow:'var(--shadow)'}}>
      ↑ Top
    </button>
  );
}
