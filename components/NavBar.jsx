"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NavItem = ({ href, children, ...props }) => (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className="nav-link"
      {...props}
    >
      {children}
    </Link>
  );

  return (
    <header className="nav">
      <div className="container nav-inner">
        {/* Left: Hamburger + Brand */}
        <div className="nav-left">
          <button
            className={`menu-btn ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? "✕" : "☰"}
          </button>

          <Link href="/" className="brand" aria-label="Home">
            <div className="brand-logo">LR</div>
            <span>Leelakrishna Ravuri</span>
          </Link>
        </div>

        {/* Right: Links + ThemeToggle */}
        <div className="nav-right">
          <nav className="nav-links" aria-label="Primary">
            <NavItem href="/">Home</NavItem>
            <NavItem href="/skills">Skills</NavItem>
            <NavItem href="/projects">Projects</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/resume">Resume</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </nav>
          <div className="toggle-wrap">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div id="mobile-menu" className="container mobile-menu">
          <NavItem href="/" onClick={() => setOpen(false)}>Home</NavItem>
          <NavItem href="/skills" onClick={() => setOpen(false)}>Skills</NavItem>
          <NavItem href="/projects" onClick={() => setOpen(false)}>Projects</NavItem>
          <NavItem href="/blog" onClick={() => setOpen(false)}>Blog</NavItem>
          <NavItem href="/resume" onClick={() => setOpen(false)}>Resume</NavItem>
          <NavItem href="/contact" onClick={() => setOpen(false)}>Contact</NavItem>
        </div>
      )}
    </header>
  );
}
