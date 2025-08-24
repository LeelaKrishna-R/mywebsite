
"use client";
import { useEffect, useState } from "react";
export default function ScrollProgress(){
  const [w, setW] = useState(0);
  useEffect(()=>{
    const onScroll = () => {
      const st = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setW(h > 0 ? Math.min(100, Math.max(0, (st/h)*100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return ()=> window.removeEventListener('scroll', onScroll);
  },[]);
  return <div style={{position:'fixed',top:0,left:0,height:'3px',width:`${w}%`,background:'linear-gradient(90deg,var(--accent),var(--accent-2))',zIndex:80,transition:'width .1s ease'}} aria-hidden="true" />;
}
