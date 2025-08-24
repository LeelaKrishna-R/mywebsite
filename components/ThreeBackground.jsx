
"use client";
import dynamic from "next/dynamic";
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function Stars(){
  const count = 1200;
  const positions = useMemo(()=>{
    const arr = new Float32Array(count*3);
    for(let i=0;i<count*3;i++) arr[i] = (Math.random()-0.5)*6;
    return arr;
  },[]);
  return (
    <group rotation={[0,0,0]}>
      <Points positions={positions} stride={3}>
        <PointMaterial size={0.015} sizeAttenuation depthWrite={false} transparent />
      </Points>
    </group>
  );
}

export default function ThreeBackground({height=220}){
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return null;
  }
  return (
    <div aria-hidden="true" style={{position:"absolute",inset:0,top:0,height, zIndex:0, pointerEvents:"none", opacity:.35}}>
      <Canvas camera={{position:[0,0,1.5], fov:75}}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
}
