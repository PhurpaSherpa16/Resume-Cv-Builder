import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images:{
    remotePatterns:[
      {
        protocol : 'https',
        hostname : 'sb.kaleidousercontent.com'
      },
      {
        protocol : 'https',
        hostname : 'render.fineartamerica.com'
      }
    ]
  }
};

export default nextConfig;


