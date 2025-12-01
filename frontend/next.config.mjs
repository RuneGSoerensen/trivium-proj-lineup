/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // ✅ allows ALL https domains (dev-friendly)
      },
    ],
  },
};

export default nextConfig;

/**
 * For production environments, it's recommended to specify allowed hostnames explicitly:
 * Hostnames must be fully qualified (no wildcards).
 */