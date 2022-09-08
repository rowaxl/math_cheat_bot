const isDev = process.env.NODE_ENV === 'development'

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: isDev,
  skipWaiting: false,
})

module.exports = withPWA({ })