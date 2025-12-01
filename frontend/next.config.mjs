/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.example.com', // Only allow images from images.example.com
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.org', // Also allow images from cdn.example.org
      },
    ],
  },
};

export default nextConfig;