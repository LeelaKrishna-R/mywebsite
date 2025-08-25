import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export const metadata = { title: "Blog — Leelakrishna Ravuri" };

export default function BlogIndex() {
  const posts = getAllPosts();

  function fmt(d) {
    return new Date(d).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

  return (
    <main className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>
      <ul className="space-y-4">
        {posts.map((p) => (
          <li
            key={p.slug}
            className="p-4 rounded-lg border border-zinc-800 bg-zinc-900"
          >
            <Link href={`/blog/${p.slug}`}>
              <div className="flex justify-between flex-wrap gap-2">
                <span className="font-semibold text-purple-400 hover:underline">
                  {p.title}
                </span>
                <span className="text-sm text-gray-400">
                  {fmt(p.date)} · {p.author} · {p.readingTime}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
