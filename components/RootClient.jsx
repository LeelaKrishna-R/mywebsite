
"use client";
import { useEffect } from "react";
export default function RootClient(){
  useEffect(()=>{
    const stored = localStorage.getItem("theme");
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const mode = stored || (mq.matches ? "dark" : "light");
    document.documentElement.dataset.theme = mode;
  },[]);
  return null;
}
