import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig = {
  allowedDevOrigins: ['192.168.0.179'],
}

export default withNextIntl(nextConfig)
