import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Staat toe dat de dev-server via een ngrok-tunnel bereikt wordt.
     Next blokkeert cross-origin dev-requests standaard (bescherming
     tegen DNS-rebinding) — zonder dit laadt de pagina via ngrok wel,
     maar zonder styling/interactie (assets en HMR worden geweigerd).
     Alleen actief in dev; heeft geen effect op `next build`/productie. */
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.io",
    "*.ngrok.app",
  ],
};

export default nextConfig;
