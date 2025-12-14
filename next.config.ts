import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "pdrk7hlj7x.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ]
  },
  devIndicators: false
}

export default nextConfig
