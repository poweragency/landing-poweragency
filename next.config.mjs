/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Lo shop è un'app separata su shop.poweragency.it. /shop dà un ingresso
      // brandizzato e coerente con la nav (path root): redirect al sottodominio.
      { source: "/shop", destination: "https://shop.poweragency.it", permanent: false },
      // Eredità del vecchio hub multilingua (poweragency-web, cancellato): i path
      // con prefisso /it/ erano le pagine IT a route [locale]. Ora il sito è
      // single-locale senza prefisso → 308 verso le pagine nuove, così i 404/duplicati
      // residui in Google Search Console diventano redirect puliti e decadono.
      { source: "/it", destination: "/", permanent: true },
      { source: "/it/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
