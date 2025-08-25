"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAllPosts } from "../../lib/posts";

export default function BlogIndex() {
  const [posts, setPosts] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      const allPosts = await getAllPosts();
      setPosts(allPosts);
    }
    loadPosts();
  }, []);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-extrabold mb-8">Blog</h1>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <div
            key={post.slug}
            className={`blog-card ${openIndex === index ? "open" : ""}`}
            onClick={() => toggle(index)}
          >
            {/* Title row */}
            <Link
              href={`/blog/${post.slug}`}
              className="blog-title-link"
              onClick={(e) => e.stopPropagation()} // prevent tile click
            >
              {post.title}
            </Link>

            {/* Expandable meta */}
            <div
              className={`blog-meta ${
                openIndex === index ? "expanded" : "collapsed"
              }`}
            >
              <div>✍️ {post.author}</div>
              <div>⏱ {post.readingTime}</div>
              <div>📅 {post.date}</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
