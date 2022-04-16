/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [{
      source: '/(.*)?', // Matches all pages
      headers: [{
        key: 'X-Frame-Options',
        value: 'ALLOWALL',
      }]
    }]
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  reactStrictMode: true,
  images: {
    loader: "default",
    domains: ["localhost", "vuwunicodesjav1.vuw.ac.nz", "eoye.nz"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
}

module.exports = nextConfig