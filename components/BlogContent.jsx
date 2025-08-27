"use client";

import { useEffect } from "react";
import Prism from "prismjs";

// Prism base + extras
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

// Explicit language support
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-css";
import "prismjs/components/prism-markdown";

export default function BlogContent({ html }) {
  useEffect(() => {
    Prism.highlightAll();
  }, [html]);

  return (
    <div
      className="prose prose-invert prose-lg max-w-none
                 prose-headings:font-bold prose-headings:tracking-tight
                 prose-p:leading-relaxed prose-p:my-4
                 prose-li:marker:text-purple-400
                 prose-code:bg-zinc-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                 prose-pre:bg-zinc-900 prose-pre:p-4 prose-pre:rounded-lg line-numbers"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
