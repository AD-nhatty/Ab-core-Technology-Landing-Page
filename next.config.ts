import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    // 90 for the logo's fine circuit lines; 75 (the default) for everything else.
    qualities: [75, 90],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Browsers that prefer Arabic land on /ar; everyone else on /en.
      {
        source: "/",
        has: [{ type: "header", key: "accept-language", value: "ar(?:[-_;,].*)?" }],
        destination: "/ar",
        permanent: false,
      },
      { source: "/", destination: "/en", permanent: false },
    ];
  },
};

export default nextConfig;
