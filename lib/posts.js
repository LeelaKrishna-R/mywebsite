"use server";

import * as fs from "node:fs/promises";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";
import { visit } from "unist-util-visit";
import removeMd from "remove-markdown";

const postsDirectory = path.join(process.cwd(), "app/blog/posts");

/**
 * Estimate reading time based on words per minute.
 */
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Get all blog posts for the index.
 */
export async function getAllPosts() {
  // ✅ Filter to only .md files
  const fileNames = (await fs.readdir(postsDirectory)).filter((file) =>
    file.endsWith(".md")
  );

  const posts = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = await fs.readFile(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        ...data,
        readingTime: calculateReadingTime(content),
        excerpt: removeMd(content).slice(0, 180) + "...",
      };
    })
  );

  // ✅ Sort newest first
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get a single blog post by slug.
 */
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  let fileContents;
  try {
    fileContents = await fs.readFile(fullPath, "utf8");
  } catch {
    // ✅ Graceful error if slug not found
    throw new Error(`Post not found: ${slug}`);
  }

  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm) // ✅ tables, strikethrough, task lists
    .use(remarkRehype, { allowDangerousHtml: false }) // 🚫 safer than rehypeRaw
    // Custom transformer: wrap images in <figure> + <figcaption>
    .use(() => (tree) => {
      visit(tree, "element", (node, index, parent) => {
        if (node.tagName === "img") {
          const alt = node.properties.alt || "";
          const src = node.properties.src;

          const finalSrc = src.startsWith("http")
            ? src
            : "/" + src.replace(/^\/+/, "");

          const figureNode = {
            type: "element",
            tagName: "figure",
            properties: { className: ["blog-img-wrap"] },
            children: [
              {
                type: "element",
                tagName: "img",
                properties: {
                  src: finalSrc,
                  alt,
                  className: ["blog-img"],
                  loading: "lazy",
                },
              },
            ],
          };

          if (alt) {
            figureNode.children.push({
              type: "element",
              tagName: "figcaption",
              properties: { className: ["blog-img-caption"] },
              children: [{ type: "text", value: alt }],
            });
          }

          parent.children[index] = figureNode;
        }
      });
    })
    .use(rehypePrism, { showLineNumbers: true, ignoreMissing: true }) // ✅ Prism for JSX, Python, etc.
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    slug,
    contentHtml: processedContent.toString(),
    readingTime: calculateReadingTime(content),
    ...data,
  };
}
