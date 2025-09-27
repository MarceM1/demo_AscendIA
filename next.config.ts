import type { NextConfig } from "next";

const clerkImageHost = process.env.NEXT_PUBLIC_CLERK_IMAGE_HOST;

if (!clerkImageHost) {
  throw new Error(
    "❌ NEXT_PUBLIC_CLERK_IMAGE_HOST no está definida en tu .env.local"
  );
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: clerkImageHost,
      pathname: "/**",
    },
    ]
  }
};

export default nextConfig;
