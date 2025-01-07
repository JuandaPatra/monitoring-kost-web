import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer';


const isAnalyzeEnabled = false;

const bundleAnalyzer = withBundleAnalyzer({
  enabled: isAnalyzeEnabled,
});
const nextConfig: NextConfig = bundleAnalyzer({
  
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
}) 

export default nextConfig;
