/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize for production
  swcMinify: true,
  
  // Environment variables that should be available on the client side
  env: {
    SITE_NAME: 'Démarches Simplifiées',
  },
}

module.exports = nextConfig
