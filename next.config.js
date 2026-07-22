/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  async rewrites() {
    // URL base do mycollect — pode ser Vercel ou Cloud Run
    const mycollectUrl = process.env.MYCOLLECT_CLOUD_RUN_URL;
    if (!mycollectUrl) return [];

    return [
      {
        source: "/mycollect",
        destination: `${mycollectUrl}/mycollect`,
      },
      {
        source: "/mycollect/:path*",
        destination: `${mycollectUrl}/mycollect/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
