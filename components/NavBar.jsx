"use client";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const NavItem = ({ href, children }) => (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className="nav-link"
    >
      {children}
    </Link>
  );

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="Home">
          <div className="brand-logo">LR</div>
          <span>Leelakrishna Ravuri</span>
        </Link>

        {/* Desktop nav */}
        <nav className="nav-links" aria-label="Primary">
          <NavItem href="/">Home</NavItem>
          <NavItem href="/skills">Skills</NavItem>
          <NavItem href="/projects">Projects</NavItem>
          <NavItem href="/blog">Blog</NavItem>
          <NavItem href="/resume">Resume</NavItem>
          <NavItem href="/contact">Contact</NavItem>
          <div className="toggle-wrap">
            <ThemeToggle />
          </div>
        </nav>

        {/* Mobile menu button */}
        <button
          className="menu-btn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
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
          <div className="toggle-mobile">
            <ThemeToggle />
          </div>
        </div>
      )}

      <style jsx>{`
        .nav {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(8px);
          background: rgba(15, 15, 16, 0.8);
          border-bottom: 1px solid var(--border);
        }
        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: "Space Grotesk", Inter, sans-serif;
          color: inherit;
          text-decoration: none;
        }
        .brand-logo {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--accent), var(--accent-2));
          display: grid;
          place-items: center;
          color: #0e0e11;
          font-weight: 700;
        }
        .brand span {
          font-weight: 700;
          letter-spacing: 0.3px;
        }
        .nav-links {
          display: flex;
          gap: 18px;
          align-items: center;
        }
        .nav-link {
          padding: 8px 12px;
          border-radius: 10px;
          border: 1px solid transparent;
          color: inherit;
          text-decoration: none;
        }
        .nav-link:hover,
        .nav-link[aria-current="page"] {
          border-color: var(--border);
          background: var(--surface);
        }
        .toggle-wrap {
          margin-left: 8px;
          display: flex;
          align-items: center;
        }
        .menu-btn {
          display: none;
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--text);
          padding: 8px 12px;
          border-radius: 10px;
        }
        .mobile-menu {
          display: none;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .nav-links {
            display: none;
          }
          .menu-btn {
            display: block;
          }
          .mobile-menu {
            display: grid;
            gap: 10px;
            padding-bottom: 12px;
          }
          .toggle-mobile {
            margin-top: 6px;
          }
        }
      `}</style>
    </header>
  );
}
