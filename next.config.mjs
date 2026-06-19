/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  async redirects() {
    return [
      // Lo shop è un'app separata su shop.poweragency.it. /shop dà un ingresso
      // brandizzato e coerente con la nav (path root): redirect al sottodominio.
      { source: "/shop", destination: "https://shop.poweragency.it", permanent: false },
    ];
  },
};

export default nextConfig;
