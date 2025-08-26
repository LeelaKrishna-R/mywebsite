"use client";
import { useTheme } from "./ThemeProvider";
import NavBar from "./NavBar";
import CursorBubble from "./CursorBubble";

export default function BodyWrapper({ children }) {
  const { theme } = useTheme();

  return (
    <body key={theme}>
      <NavBar />
      {children}
      <CursorBubble />
    </body>
  );
}
