import type {NextConfig} from 'next';
import withNextIntl from 'next-intl/plugin';

const withIntl = withNextIntl(
  // This is the default (and recommended) configuration for the Next Intl plugin.
  // See https://next-intl.com/docs/getting-started/app-router/configuration
  './src/i18n.ts'
);


const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withIntl(nextConfig);
