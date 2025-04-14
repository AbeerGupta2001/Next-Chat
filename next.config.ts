import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    async redirects() {
        return [
            {
                source: '/',
                destination: '/conversations',
                permanent: false,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                hostname: 'img.clerk.com',
                protocol: "https"
            },
        ],
    },
}

export default nextConfig
