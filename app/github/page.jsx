"use client";
import Link from "next/link";
import GitHubExpanded from "../../components/GithubExpanded";

export default function GitHubPage() {
  return (
    <main className="container" style={{ padding: "40px 0", position: "relative" }}>
      <GitHubExpanded />
    </main>
  );
}
