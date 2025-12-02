/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // matches all hosts
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;

/**
 * For production environments, it's recommended to specify allowed hostnames explicitly:
 * Hostnames must be fully qualified (no wildcards).
 */