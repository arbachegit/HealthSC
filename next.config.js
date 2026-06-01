/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  output: 'standalone',
  ...(isProd
    ? { basePath: '/discoveryhealth', assetPrefix: '/discoveryhealth' }
    : {}),
}
module.exports = nextConfig
