import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'res.cloudinary.com',  // Allow Cloudinary images
      'cloudinary.com',      // Additional Cloudinary domain
    ],
    // You can also use remotePatterns for more specific control
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
