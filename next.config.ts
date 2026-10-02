import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/changelog',
        destination: '/#prebook',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
