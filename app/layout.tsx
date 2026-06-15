import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MusicPlayer from "@/components/MusicPlayer";
import { MusicProvider } from "@/context/MusicContext";

const inter = Inter({ subsets: ["latin"] });

import type { Viewport } from "next";

export const metadata: Metadata = {
  title: "Ernst-William Hertz | Portfolio",
  description: "Full-Stack Developer, Author, and Entrepreneur.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};
// Global song playlist - in correct album order
const globalSongs = [
  { id: "1", title: "Cardboard Crack (The Origin)", artist: "Hatake Hugo", url: "/music/Cardboard Crack.mp3", duration: 0 },
  { id: "2", title: "The Anchor (Gloria)", artist: "Hatake Hugo", url: "/music/The Anchor (Gloria).mp3", duration: 0 },
  { id: "3", title: "The Deep End (The Hustle)", artist: "Hatake Hugo", url: "/music/The Deep End.mp3", duration: 0 },
  { id: "4", title: "Exile (Faddah Mission)", artist: "Hatake Hugo", url: "/music/The Exile.mp3", duration: 0 },
  { id: "5", title: "The Bleed (Belgium)", artist: "Hatake Hugo", url: "/music/The Bleed.mp3", duration: 0 },
  { id: "6", title: "Burritos & Brothels (London)", artist: "Hatake Hugo", url: "/music/Burritos & Brothels (London).mp3", duration: 0 },
  { id: "7", title: "14 Days (Skara)", artist: "Hatake Hugo", url: "/music/14 Days (Skara).mp3", duration: 0 },
  { id: "8", title: "Maximum to Medical (The Ward)", artist: "Hatake Hugo", url: "/music/Maximum to Medical (The Ward).mp3", duration: 0 },
  { id: "9", title: "Nine Hours (Acceptance)", artist: "Hatake Hugo", url: "/music/Nine Hours (Acceptance).mp3", duration: 0 },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <meta name="color-scheme" content="dark" />
        <style>{`html, body { background-color: rgb(5, 5, 5); }`}</style>
      </head>
      {/* Added pt-32 to push all page content down below the Navbar */}
    <body className={`${inter.className} bg-neutral-950 text-white min-h-screen pt-32 pb-24 selection:bg-cyan-500/30`}>
    <MusicProvider initialSongs={globalSongs}>
      <Navbar />
      {children}

      {/* Persistent Floating Music Player */}
      <div className="fixed bottom-6 right-6 z-50">
         <MusicPlayer compact={true} />
      </div>
    </MusicProvider>
  </body>
    </html>
  );
}