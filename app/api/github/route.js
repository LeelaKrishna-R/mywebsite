
import { NextResponse } from "next/server";

export async function GET(){
  try{
    const res = await fetch("https://api.github.com/users/LeelaKrishna-R/repos?sort=updated&per_page=5", { next: { revalidate: 300 } });
    const data = await res.json();
    if(!Array.isArray(data)) throw new Error("Bad response");
    return NextResponse.json(data.map(r => ({ name: r.name, url: r.html_url, updated_at: r.updated_at })));
  }catch(e){
    return NextResponse.json([], { status: 200 });
  }
}
