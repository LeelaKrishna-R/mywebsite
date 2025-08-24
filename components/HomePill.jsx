
"use client";
import { usePathname } from "next/navigation";

export default function HomePill(){
  const pathname = usePathname();
  if(pathname === "/") return null;
  return (
    <a href="/" aria-label="Go to home" style={{
      position:"fixed", left:"20px", bottom:"24px", zIndex:60,
      padding:"10px 12px", borderRadius:"999px", border:"1px solid var(--border)",
      background:"var(--surface-2)", color:"var(--text)", boxShadow:"var(--shadow)", textDecoration:"none"
    }}>⌂ Home</a>
  );
}
