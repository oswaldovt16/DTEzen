/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/login',
        destination: 'https://app.dtezen.com/registro?view=login',
        permanent: false,
      },
      {
        source: '/registro',
        destination: 'https://app.dtezen.com/registro?view=signup',
        permanent: false,
      },
      {
        source: '/app/:path*',
        destination: 'https://app.dtezen.com/:path*',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig