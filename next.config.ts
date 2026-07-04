import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin(
  // Path to request config file
  './i18n/request.ts'
);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // R3F and Three.js package configurations for Transpile
  transpilePackages: ['three'],
};

export default withNextIntl(nextConfig);
