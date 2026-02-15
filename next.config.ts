
import { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    domains: process.env.NEXT_PUBLIC_API_BASE_URL
      ? [new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname]
      : ['192.168.10.10'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
