/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  async rewrites() {
    const mycollectUrl = process.env.MYCOLLECT_CLOUD_RUN_URL;
    const mycollectKey = process.env.MYCOLLECT_APP_KEY;

    if (!mycollectUrl || !mycollectKey) {
      return [];
    }

    return [
      {
        source: "/mycollect",
        destination: `${mycollectUrl}/?key=${mycollectKey}`,
      },
      {
        source: "/mycollect/:path*",
        destination: `${mycollectUrl}/:path*?key=${mycollectKey}`,
      },
      {
        source: "/assets/:path*",
        destination: `${mycollectUrl}/assets/:path*?key=${mycollectKey}`,
      },
      {
        source: "/api-proxy",
        destination: `${mycollectUrl}/api-proxy?key=${mycollectKey}`,
      },
      {
        source: "/api-proxy/:path*",
        destination: `${mycollectUrl}/api-proxy/:path*?key=${mycollectKey}`,
      },
      {
        source: "/ws-proxy",
        destination: `${mycollectUrl}/ws-proxy?key=${mycollectKey}`,
      },
      {
        source: "/ws-proxy/:path*",
        destination: `${mycollectUrl}/ws-proxy/:path*?key=${mycollectKey}`,
      },
    ];
  },
}

module.exports = nextConfig
