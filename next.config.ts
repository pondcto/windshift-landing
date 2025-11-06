import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  // Turbopack config block (Next.js 13.4+)
  turbo: {
    // Example: enable experimental features or custom rules here
    // You can add more options as needed
    // See: https://nextjs.org/docs/app/api-reference/next-config-js/turbo
  },
};

export default nextConfig;
