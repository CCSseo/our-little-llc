/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pure marketing site: no remote images, no optimizer needed.
  images: { unoptimized: true },
};

export default nextConfig;
