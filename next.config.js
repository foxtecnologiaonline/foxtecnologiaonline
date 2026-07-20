/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  async rewrites() {
    return [
      {
        source: "/mycollect",
        destination: "https://mycollect-ten.vercel.app/mycollect",
      },
      {
        source: "/mycollect/:path*",
        destination: "https://mycollect-ten.vercel.app/mycollect/:path*",
      },
    ];
  },
}

module.exports = nextConfig
