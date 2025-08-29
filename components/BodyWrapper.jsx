"use client";
import { useTheme } from "./ThemeProvider";
import NavBar from "./NavBar";
import CursorBubble from "./CursorBubble";
import { usePathname } from "next/navigation";

export default function BodyWrapper({ children }) {
  const { theme } = useTheme();
  const pathname = usePathname();

  // Detect if we’re on a blog post detail page
  const isBlogPost = pathname.startsWith("/blog/") && pathname.split("/").length > 2;

  return (
    <body key={theme}>
      {/* Hide NavBar on blog detail pages */}
      {!isBlogPost && <NavBar />}
      {children}
      <CursorBubble />
    </body>
  );
}
