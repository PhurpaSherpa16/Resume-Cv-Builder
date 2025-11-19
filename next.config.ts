import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images:{
    remotePatterns:[
      {
        protocol : 'https',
        hostname : 'render.fineartamerica.com'
      }
    ]
  }
};

export default nextConfig;


