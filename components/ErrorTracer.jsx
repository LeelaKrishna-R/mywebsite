
"use client";
import { useEffect } from "react";
export default function ErrorTracer(){
  useEffect(()=>{
    const send = (payload) => {
      try { if(navigator.sendBeacon) navigator.sendBeacon("/api/log", JSON.stringify(payload)); }
      catch(e){ fetch("/api/log", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(payload) }); }
    };
    const onError = (event) => send({ type:"error", message:event?.message||"", href:location.href });
    const onReject = (event) => send({ type:"unhandledrejection", message:String(event?.reason||""), href:location.href });
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onReject);
    return ()=>{ window.removeEventListener("error", onError); window.removeEventListener("unhandledrejection", onReject); };
  }, []);
  return null;
}
