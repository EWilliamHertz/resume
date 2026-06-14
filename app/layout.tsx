import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ernst-William Hertz | Portfolio",
  description: "Full-Stack Developer, Author, and Musician.",
  themeColor: "#000000",
};

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
      <body className={`${inter.className} bg-neutral-950 text-white min-h-screen selection:bg-cyan-500/30`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
