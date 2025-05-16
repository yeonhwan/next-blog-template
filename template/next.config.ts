import type { NextConfig } from "next";

/**
SVGR for using SVG more React way 
You can delete SVGR and configuration if you want to customize
**/

const nextConfig: NextConfig = {
  // config for parsing MD & MDX as build rescource
  transpilePackages: ["next-mdx-remote"],
  eslint: { ignoreDuringBuilds: true },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    //@ts-expect-error: type defs does not exist
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(".svg"));
    fileLoaderRule.exclude = /\.svg$/i;

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );
    return config;
  },
};

export default nextConfig;
