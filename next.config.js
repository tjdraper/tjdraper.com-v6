/** @type {import('next').NextConfig} */
const nextConfig = {
    poweredByHeader: false,
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['route.ts', 'route.tsx'],
}

module.exports = nextConfig
