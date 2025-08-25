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
    const interval = setInterval(fetchTrack, 8000); // refresh every 8s
    return () => clearInterval(interval);
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="spotify-tile"
    >
      {track.albumArt && (
        <Image
          src={track.albumArt}
          alt={track.name}
          width={54}
          height={54}
          className="spotify-album"
        />
      )}

      <div className="spotify-info">
        {/* Status as title */}
        <span className="spotify-status-title">
          {track.isPlaying ? "Currently listening" : "Last listened"}
        </span>

        <span className="spotify-title">{track.name}</span>
        <span className="spotify-artist">{track.artist}</span>
      </div>

      {track.isPlaying && (
        <div className="spotify-equalizer">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}></span>
          ))}
        </div>
      )}
    </a>
  );
}
