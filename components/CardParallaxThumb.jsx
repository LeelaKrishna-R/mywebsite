
"use client";
import { useEffect, useRef } from "react";
export default function CardParallaxThumb({ src, alt }){
  const ref = useRef(null);
  useEffect(()=>{
    const el = ref.current;
    if(!el) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const center = window.innerHeight / 2;
      const delta = Math.max(-1, Math.min(1, (rect.top + rect.height/2 - center) / center));
      el.style.transform = `translateY(${delta*4}px)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive:true });
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  return <img ref={ref} src={src} alt={alt} style={{transition:"transform .2s ease", width:"100%", display:"block"}}/>;
}
