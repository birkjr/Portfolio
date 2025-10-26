import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: require('path').join(__dirname, '.'),
  /* config options here */
};

export default nextConfig;
