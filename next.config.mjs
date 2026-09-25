/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_BUILD_DIR || ".next",
  // Pure marketing site: no remote images, no optimizer needed.
  images: { unoptimized: true },
};

export default nextConfig;
