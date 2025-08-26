"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function SpotifyCard() {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        if (!data.error) setTrack(data);
      } catch (err) {
        console.error("Failed to fetch Spotify track", err);
      }
    }

    fetchTrack();
    const interval = setInterval(fetchTrack, 8000);
    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotify-tile compact"
    >
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt={track.name}
          width={44}
          height={44}
          className="spotify-album"
        />
      )}

      <div className="spotify-info">
        <span className="spotify-status-title">
          {track.isPlaying ? "Currently listening" : "Last listened"}
        </span>
        <span className="spotify-title">{track.name}</span>
        <span className="spotify-artist">{track.artist}</span>
      </div>

      {track.isPlaying && (
        <div className="spotify-equalizer small">
          {Array.from({ length: 15 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
      )}
    </a>
  );
}
