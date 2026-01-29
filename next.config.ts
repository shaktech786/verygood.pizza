import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/MQ7zAJH6wt',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
