"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BlogCloseButton() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") router.push("/blog");
    };
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("keydown", handleEsc);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router]);

  return (
    <button
      aria-label="Close"
      onClick={() => router.push("/blog")}
      className={`blog-close ${scrolled ? "scrolled" : ""}`}
    >
      ✕
    </button>
  );
}
