import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ernst-William Hertz | Portfolio",
  description: "Full-Stack Developer, Entrepreneur, and Creator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-neutral-950 text-white min-h-screen pt-24 selection:bg-cyan-500/30`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}