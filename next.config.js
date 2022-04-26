/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  serverRuntimeConfig: {
    secret: '4626c7660cb17cca76b21bc5a52f8de133be0f7d44cc2596f6601812d1010edacf920d0e2a90b75222e4f8e6db9b1710c885d97312f229f97189de2720fce442',
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
     ? 'http://192.168.0.3:3000/api' // dev // ip publica
     : 'http://15.228.54.217:3000/api' // production
  },
  images: {
    loader:'imgix',
    path: 'https://jmorrison.imgix.net',
  },
}
