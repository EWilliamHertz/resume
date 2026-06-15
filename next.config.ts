import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Bypasses the Next.js 15 legacy flag bug during Vercel builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;