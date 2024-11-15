/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ["tailwindui.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tailwindui.com",
        pathname: "/img/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
