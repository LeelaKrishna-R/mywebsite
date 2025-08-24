
"use client";
import { useEffect, useRef } from "react";
export default function ParallaxHero(){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    const onScroll = ()=>{
      const y = window.scrollY;
      el.style.transform = `translateY(${Math.min(20, y*0.05)}px) scale(1.02)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  return <img ref={ref} src="/images/me-ghibli.png" alt="Leelakrishna Ghibli portrait" className="pfp"/>;
}
