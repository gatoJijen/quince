import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: ['192.168.1.62'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lfuetkgvytrkjbbrbhsw.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
