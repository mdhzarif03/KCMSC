/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Phase 1: no real media host configured yet. Add the eventual
    // blob/CDN storage domain here in Phase 3 when media upload lands.
    remotePatterns: []
  }
};

export default nextConfig;
