import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ['lucide-react', 'idb'],
  },
};

export default nextConfig;
