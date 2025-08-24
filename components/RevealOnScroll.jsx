
"use client";
import { useEffect } from "react";
export default function RevealOnScroll(){
  useEffect(()=>{
    if(typeof window === 'undefined') return;
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('fx-fadeUp'); } });
    }, { threshold:.1 });
    els.forEach(el=>io.observe(el));
    return ()=>io.disconnect();
  },[]);
  return null;
}
