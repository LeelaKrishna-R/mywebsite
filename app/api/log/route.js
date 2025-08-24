
import { NextResponse } from "next/server";
export async function POST(req){
  try{ const body = await req.json(); console.error("[client-log]", body); }catch{}
  return NextResponse.json({ ok: true });
}
