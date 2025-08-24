"use client";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/LeelaKrishna-R",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 3h4.7l5.2 6.9L17.6 3H21l-6.9 9.1L21 21h-4.7l-5.3-7.1L6.4 21H3l7-9.1L3 3z"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://twitter.com/leelakr90136330",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.9 7.5c.01.18.01.36.01.54 0 5.5-4.2 11.8-11.8 11.8-2.3 0-4.5-.7-6.3-1.9 3.2.4 6.4-.5 8.9-2.5-2.8-.05-5.1-1.9-5.9-4.4a5 5 0 0 0 2.3-.09c-2.9-.6-5-3.2-5-6.2v-.08a6.1 6.1 0 0 0 2.7.75C3.3 3.6 4.9 1.9 7 1.9c1.4 0 2.7.6 3.6 1.5a10.8 10.8 0 0 0 3.9-1.5 5 5 0 0 1-2.2 2.8 10.8 10.8 0 0 0 3-.84 11 11 0 0 1-2.5 2.6z"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/krishhbyte",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.8-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/leelakrishnaravuri/",
    svg: (
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.5 1.1 2.5 2.5zM.4 8.3h4.2V24H.4V8.3zM8.6 8.3h4v2.1h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V24h-4.2v-7.5c0-1.8 0-4.2-2.6-4.2s-3 2-3 4v7.7H8.6V8.3z"
        />
      </svg>
    ),
  },
];

export default function SocialBar() {
  return (
    <div className="social-bar" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {socials.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="social-btn"
          aria-label={s.name}
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            borderRadius: "50%",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            transition: "all 0.2s ease",
          }}
        >
          {s.svg}
        </a>
      ))}
    </div>
  );
}
