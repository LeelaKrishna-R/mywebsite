import { NextResponse } from "next/server";

const GITHUB_USER = "LeelaKrishna-R";
const BASE = "https://api.github.com";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const repo = searchParams.get("repo");

  let url = null;

  switch (type) {
    case "user":
      url = `${BASE}/users/${GITHUB_USER}`;
      break;
    case "repos":
      url = `${BASE}/users/${GITHUB_USER}/repos?per_page=100&sort=updated`;
      break;
    case "commits":
      if (!repo) {
        return NextResponse.json({ error: "Missing repo param" }, { status: 400 });
      }
      url = `${BASE}/repos/${GITHUB_USER}/${repo}/commits?per_page=15`;
      break;
    default:
      return NextResponse.json({ error: "Missing or invalid type param" }, { status: 400 });
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
      "User-Agent": "nextjs-portfolio",
    },
    cache: "no-store", // avoid stale data
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "GitHub API failed" },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}
