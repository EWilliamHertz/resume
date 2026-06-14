import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows Google Cloud Shell's web preview to connect for Hot Module Reloading
  allowedDevOrigins: [
    "3000-cs-553118797525-default.cs-europe-west4-pear.cloudshell.dev"
  ],
};

export default nextConfig;