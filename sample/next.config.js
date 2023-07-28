/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["shared-ui", "lodash-es"],
};

module.exports = nextConfig;
