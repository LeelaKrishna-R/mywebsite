import Link from "next/link";
import { getAllPosts, getPostBySlug } from "../../../lib/posts";
import BlogCloseButton from "../../../components/BlogCloseButton";
import BackToTop from "../../../components/BackToTop";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main className="container mx-auto px-4 py-10 relative">
      {/* Blog Header (like navbar) */}
      <header className="sticky top-0 z-40 bg-[var(--surface)] border-b border-[var(--border)] 
                         flex items-center justify-between px-4 py-3 backdrop-blur">
        <h1 className="text-xl font-bold truncate text-[var(--text)]">{post.title}</h1>
        <BlogCloseButton />
      </header>

      {/* Blog Content */}
      <article className="max-w-3xl mx-auto p-8 rounded-2xl shadow-lg bg-zinc-900/50 backdrop-blur mt-6 relative">
        <p className="text-sm mb-8">
          <Link
            href={`/blog/${post.slug}`}
            className="text-[var(--accent)] hover:text-[var(--accent-2)] underline-offset-4 hover:underline transition-colors"
          >
            {post.date} · {post.author} · {post.readingTime}
          </Link>
        </p>

        <div
          className="prose prose-invert prose-lg max-w-none
                     prose-headings:font-bold prose-headings:tracking-tight
                     prose-p:leading-relaxed prose-p:my-4
                     prose-li:marker:text-purple-400
                     prose-code:bg-zinc-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                     prose-pre:bg-zinc-900 prose-pre:p-4 prose-pre:rounded-lg"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {/* Back to Top Button */}
      <BackToTop />
    </main>
  );
}
