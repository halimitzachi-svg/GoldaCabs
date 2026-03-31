import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/taxi-aesarea',
        destination: '/taxi-caesarea',
        permanent: true,
      },
      {
        source: '/en/taxi-aesarea',
        destination: '/en/taxi-caesarea',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
