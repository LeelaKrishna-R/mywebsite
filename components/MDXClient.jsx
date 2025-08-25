"use client";
import { MDXProvider } from "@mdx-js/react";
export default function MDXClient({ components, children }) {
  return <MDXProvider components={components}>{children}</MDXProvider>;
}
