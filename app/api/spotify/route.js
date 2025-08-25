import { NextResponse } from "next/server";

const client_id = process.env.spotifyClientID;
const client_secret = process.env.spotifyClientSecret;
const refresh_token = process.env.spotifyRefreshToken;

// 🔧 Helper: Trim artist names
function formatArtists(artists) {
  if (!artists || artists.length === 0) return "";
  const joined = artists.map((a) => a.name).join(", ");
  if (artists.length > 1 && joined.length > 17) {
    return joined.slice(0, 17) + "...";
  }
  return joined.length > 20 ? joined.slice(0, 20) + "…" : joined;
}

// 🔧 Helper: Trim track title
function formatTitle(title) {
  if (!title) return "";
  return title.length > 30 ? title.slice(0, 30) + "…" : title;
}

async function getAccessToken() {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  return res.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    if (!access_token) {
      return NextResponse.json({ error: "Invalid access token" }, { status: 500 });
    }

    // 🎵 Try currently playing
    let res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });

    if (res.status === 200) {
      const text = await res.text();
      if (text) {
        const now = JSON.parse(text);
        const track = now?.item;
        if (track) {
          return NextResponse.json({
            name: formatTitle(track.name),
            artist: formatArtists(track.artists),
            url: track.external_urls.spotify,
            albumArt: track.album.images[0]?.url,
            isPlaying: now.is_playing,
          });
        }
      }
    }

    // 🎵 If paused (204 or empty), try /me/player
    if (res.status === 204 || res.status === 200) {
      const playerRes = await fetch("https://api.spotify.com/v1/me/player", {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: "no-store",
      });
      if (playerRes.ok) {
        const text = await playerRes.text();
        if (text) {
          const player = JSON.parse(text);
          const track = player?.item;
          if (track) {
            return NextResponse.json({
              name: formatTitle(track.name),
              artist: formatArtists(track.artists),
              url: track.external_urls.spotify,
              albumArt: track.album.images[0]?.url,
              isPlaying: player.is_playing, // false if paused
            });
          }
        }
      }
    }

    // 🎵 Fallback: recently played
    const recentRes = await fetch("https://api.spotify.com/v1/me/player/recently-played?limit=1", {
      headers: { Authorization: `Bearer ${access_token}` },
      cache: "no-store",
    });
    const recent = await recentRes.json();
    const track = recent.items?.[0]?.track;

    if (!track) return NextResponse.json({ error: "No track found" });

    return NextResponse.json({
      name: formatTitle(track.name),
      artist: formatArtists(track.artists),
      url: track.external_urls.spotify,
      albumArt: track.album.images[0]?.url,
      isPlaying: false,
    });
  } catch (e) {
    console.error("💥 Spotify API error:", e);
    return NextResponse.json({ error: "Spotify API error" }, { status: 500 });
  }
}

// 🚀 Force dynamic so Next.js never caches this route
export const dynamic = "force-dynamic";
export const revalidate = 0;
