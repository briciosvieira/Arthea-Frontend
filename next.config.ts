import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL ?? "http://127.0.0.1:3000"}/:path*`,
      },
    ];
  },

  images: {
    qualities: [75, 90, 100],
    remotePatterns: [
      // desenvolvimento local
      { protocol: "http",  hostname: "localhost",              port: "3000" },
      { protocol: "http",  hostname: "127.0.0.1",             port: "3000" },
      // produção — backend na mesma máquina via rewrite ou domínio próprio
      { protocol: "https", hostname: "artheaconsultorio.com.br" },
      { protocol: "https", hostname: "clinicaarthea.com.br"    },
      { protocol: "https", hostname: "arthea.com.br"           },
    ],
  },
};

export default nextConfig;
