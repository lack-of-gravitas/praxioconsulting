const isProd = process.env.NODE_ENV === 'production'

module.exports =
  // withCommerceConfig(
  {
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      nextScriptWorkers: true,
    },
    images: {
      domains: [
        'fillmurray.com',
        'dummyimage.com',
        'praxio.azureedge.net',
        // 'praxio.blob.core.windows.net',
        'lh3.googleusercontent.com', // for google user profiles
      ],
    },
    async headers() {
      return [
        {
          // matching all API routes
          source: '/api/auth/:path*',
          headers: [
            { key: 'Access-Control-Allow-Credentials', value: 'true' },
            { key: 'Access-Control-Allow-Origin', value: '*' },
            {
              key: 'Access-Control-Allow-Methods',
              value: 'GET, OPTIONS, POST',
            },
            { key: 'Access-Control-Allow-Headers', value: '*' },
          ],
        },
      ]
    },

    // commerce,
    // i18n: {
    // turning this on will add locale (default locale if you dont supply one) to the url path
    // use with caution, as it will break the url path
    // https://nextjs.org/docs/advanced-features/i18n-routing
    // These are all the locales you want to support in your application
    // locales: ['en-US'],
    // locales: ["en-US", "fr"],
    // This is the default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    // defaultLocale: 'en-US',
    // This is a list of locale domains and the default locale they
    // should handle (these are only required when setting up domain routing)
    // Note: subdomains must be included in the domain value to be matched e.g. "fr.example.com".
    // By using domain routing you can configure locales to be served from different domains:
    // domains: [
    //   {
    //     domain: 'example.com',
    //     defaultLocale: 'en-US',
    //   },
    //   {
    //     domain: 'example.nl',
    //     defaultLocale: 'nl-NL',
    //   },
    //   {
    //     domain: 'example.fr',
    //     defaultLocale: 'fr',
    //     // an optional http field can also be used to test
    //     // locale domains locally with http instead of https
    //     http: true,
    //   },
    // ],
    // },
    // rewrites() {
    //   return [
    //     (isBC || isShopify || isSwell || isVendure || isSaleor) && {
    //       source: '/checkout',
    //       destination: '/api/checkout',
    //     },
    //     // The logout is also an action so this route is not required, but it's also another way
    //     // you can allow a logout!
    //     isBC && {
    //       source: '/logout',
    //       destination: '/api/logout?redirect_to=/',
    //     },
    //     // For Vendure, rewrite the local api url to the remote (external) api url. This is required
    //     // to make the session cookies work.
    //     isVendure &&
    //       process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL && {
    //         source: `${process.env.NEXT_PUBLIC_VENDURE_LOCAL_URL}/:path*`,
    //         destination: `${process.env.NEXT_PUBLIC_VENDURE_SHOP_API_URL}/:path*`,
    //       },
    //   ].filter(Boolean)
    // },
  }
// )

// Don't delete this console log, useful to see the commerce config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))
