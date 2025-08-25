import express from "express";
import fetch from "node-fetch";
import open from "open";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3001;

const client_id = process.env.spotifyClientID;
const client_secret = process.env.spotifyClientSecret;
const redirect_uri = "http://localhost:3001/callback";

app.get("/login", (req, res) => {
  const scope = "user-read-currently-playing user-read-recently-played";
  const auth_url = new URL("https://accounts.spotify.com/authorize");
  auth_url.searchParams.append("client_id", client_id);
  auth_url.searchParams.append("response_type", "code");
  auth_url.searchParams.append("redirect_uri", redirect_uri);
  auth_url.searchParams.append("scope", scope);
  auth_url.searchParams.append("state", "12345"); // optional but helps debug

  console.log("🔗 Opening auth URL:", auth_url.toString());
  res.redirect(auth_url.toString());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code || null;
  if (!code) {
    return res.send("❌ No code returned, check redirect URI & client settings.");
  }

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri,
    }),
  });

  const data = await response.json();
  console.log("🔑 TOKEN RESPONSE:", data);

  if (data.error) {
    return res.send(`❌ Error: ${data.error} - ${data.error_description}`);
  }

  res.send(
    `<h2>✅ Success! Copy this refresh token into your .env.local:</h2><pre>${data.refresh_token}</pre>`
  );

  console.log("Access Token:", data.access_token);
  console.log("Refresh Token:", data.refresh_token);

  process.exit(0);
});

app.listen(port, () => {
  console.log(`👉 Open http://localhost:${port}/login to get your refresh token`);
  open(`http://localhost:${port}/login`);
});
