"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SpotifyNowPlaying() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        if (!data.error) {
          setTrack(data);
        }
      } catch (err) {
        console.error("Failed to fetch Spotify track", err);
      }
    }
    fetchTrack();
  }, []);

  if (!track) {
    return null; // Don't render empty box
  }

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotify-card"
    >
      <Image
        src="/socials/spotify.png"
        alt="Spotify"
        width={20}
        height={20}
        className="spotify-icon"
      />
      <span>
        {track.name} — <em>{track.artist}</em>
      </span>
    </a>
  );
}
