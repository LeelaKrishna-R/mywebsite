import { getAllPosts, getPostBySlug } from "../../../lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <main className="container mx-auto px-4 py-10">
      <article className="max-w-3xl mx-auto p-8 rounded-2xl shadow-lg bg-zinc-900/50 backdrop-blur">
        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-8">
          {post.date} · {post.author} · {post.readingTime}
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
    </main>
  );
}
