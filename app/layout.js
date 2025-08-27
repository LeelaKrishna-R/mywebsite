import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import BodyWrapper from "../components/BodyWrapper";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Leelakrishna Ravuri — Portfolio",
  description: "AI graduate student and software developer. Projects, skills, experience, and contact.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#bd93f9" }]
  },
  openGraph: {
    title: "Leelakrishna Ravuri — Portfolio",
    description: "AI graduate student and software developer.",
    url: "https://krishnar.xyz/",
    siteName: "KrishnaR Portfolio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Leelakrishna Ravuri — Portfolio",
    description: "AI graduate student and software developer.",
    images: ["/twitter-image.png"]
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts & Devicon */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <ThemeProvider>
        <BodyWrapper>
          {children}

          {/* Footer */}
          <footer className="site-footer">
            <div className="footer-inner">
              <p>
                © {new Date().getFullYear()} Leelakrishna Ravuri. All rights reserved.{" "}
                <Link
                  href="https://github.com/LeelaKrishna-R/mywebsite/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MIT License
                </Link>
              </p>
            </div>
          </footer>
        </BodyWrapper>
      </ThemeProvider>
    </html>
  );
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0f10" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" }
  ]
};
