import type { NextConfig } from "next";
import { routeRedirects } from "./lib/navigation";

const nextConfig: NextConfig = {
  async redirects() {
    return routeRedirects.map((route) => ({
      ...route,
      permanent: false,
    }));
  },
};

export default nextConfig;
