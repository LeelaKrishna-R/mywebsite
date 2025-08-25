"use client";
import Image from "next/image";

const socials = [
  { name: "Spotify", href: "https://open.spotify.com/user/pz4y1pm74kjnteb9mz0lglgik", icon: "/socials/spotify.png" },
  { name: "Twitter", href: "https://twitter.com/leelakr90136330", icon: "/socials/twitter.png" },
  { name: "Instagram", href: "https://www.instagram.com/krishhbyte", icon: "/socials/instagram.png" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/leelakrishnaravuri/", icon: "/socials/linkedin.png" },
  { name: "Email", href: "mailto:email@krishnar.xyz", icon: "/socials/email.png" },
];

export default function SocialBar() {
  return (
    <div className="social-wrap">
      {/* Just the icons row */}
      <div className="social-icons">
        {socials.map((s) => (
          <a 
            key={s.name} 
            href={s.href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-icon"
          >
            <Image src={s.icon} alt={s.name} width={22} height={22} />
          </a>
        ))}
      </div>
    </div>
  );
}
