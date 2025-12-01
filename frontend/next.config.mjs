/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ✅ tillader ALLE https-domæner (dev-friendly)
      },
    ],
  },
};

export default nextConfig;