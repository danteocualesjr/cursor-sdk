/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@cursor/sdk"],
  turbopack: {
    root: new URL(".", import.meta.url).pathname,
  },
};

export default nextConfig;
