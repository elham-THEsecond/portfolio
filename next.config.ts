import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  reactStrictMode: true,
  outputFileTracingRoot: path.join(__dirname),
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
