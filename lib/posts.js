"use server"; // 👈 mark file as server-only

import * as fs from "node:fs/promises"; // use promises API
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { visit } from "unist-util-visit";

const postsDirectory = path.join(process.cwd(), "app/blog/posts");

function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// 🔹 async now
export async function getAllPosts() {
  const fileNames = await fs.readdir(postsDirectory);

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
      };
    })
  );

  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// 🔹 async now
export async function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = await fs.readFile(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
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
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return {
    slug,
    contentHtml: processedContent.toString(),
    readingTime: calculateReadingTime(content),
    ...data,
  };
}
