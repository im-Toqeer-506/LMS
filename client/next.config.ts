import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ✅ This disables ESLint during `next build` (important for Vercel)
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com"
      }
    ],
    domains: [
      'hebbkx1anhila5yf.public.blob.vercel-storage.com',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'randomuser.me'
    ],
  },
};

export default nextConfig;