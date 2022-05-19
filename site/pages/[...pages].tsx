import { Layout } from '@components/templates'
import { PageNotFound } from '@components/templates'

// import { fetchGetJSON } from '@lib/api-helpers'
// import { Block } from '@components/blocks'

export async function getStaticPaths(context: any) {
  // console.log("slug gsp: ", context);
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
  const preview = context.preview
  // check if there's a slug provided, if not it's likely home page so set the slug
  let path = ''
  if (context.params.slug === undefined) {
    path = '/'
  } else {
    path = context.params.slug[context.params.slug.length - 1]
  }

  let apiResponse = ''
  // await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/pages?_where[0][brand.domain]=${process.env.NEXT_PUBLIC_BRAND}&_where[1][slug]=${path}`
  // )
  //  console.log("apiResponse: ", apiResponse);

  let data = {}
  // data.path = path
  // data.globalData = {
  //   name: apiResponse[0].brand.name,
  //   tagline: apiResponse[0].brand.tagline,
  //   domain: apiResponse[0].brand.domain,
  //   locale: apiResponse[0].brand.locale,
  //   themes: apiResponse[0].brand.themes,
  //   navigation: apiResponse[0].brand.navigation,
  //   footer: apiResponse[0].brand.footer,
  //   seo: apiResponse[0].brand.seo,
  //   locations: apiResponse[0].brand.locations,
  //   socials: apiResponse[0].brand.socials,
  // }
  // data.pageData = apiResponse[0]

  // apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/articles?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_limit=3`
  // )

  // // console.log("apiResponse: ", apiResponse);

  // data.pageData.articles = apiResponse
  // // console.log("data: ", data);

  // return props with data to component
  return {
    props: { data, preview: preview ? true : null }, // will be passed to the page component as props
    revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}

// gets paths that aren't explictly defined (i.e. /home, /about, etc)
// If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
// If the page uses an optional catch-all route, supply null, [], undefined or false to render the root-most route. For example, if you supply slug: false for pages/[[...slug]], Next.js will statically generate the page /.

const Universals = ({ data, preview }: any) => {
  // console.log("data (Component): ", data);

  if (data === undefined) {
    return (
      <Layout>
        <PageNotFound statusCode={404} />
      </Layout>
    )
  }
  if (
    data.pageData === null ||
    data.pageData === undefined ||
    Object.keys(data.pageData).length === 0
  ) {
    return (
      <Layout>
        <PageNotFound statusCode={404} />
      </Layout>
    )
  }

  // const blocks = delve(data.pageData, 'blocks')
  // console.log("blocks: ", blocks);

  return (
    <Layout
    // data={data.globalData}
    // slug={data.path}
    // seo={data.pageData.seo ? data.pageData.seo : data.globalData.seo}
    // preview={preview}
    >
      {/* {blocks?.map((block, key) => (
        <Block key={key} block={block} data={data.pageData} />
      ))} */}
    </Layout>
  )
}

export default Universals

// NEXT COMMERCE CODE
// ############################################################################

// import type {
//   GetStaticPathsContext,
//   GetStaticPropsContext,
//   InferGetStaticPropsType,
// } from 'next'
// // import commerce from '@lib/api/commerce'
// import { Text } from '@components/ui'
// import Layout from '@components/sections/Layout'

// import getSlug from '@lib/get-slug'
// import { missingLocaleInPages } from '@lib/usage-warns'
// import type { Page } from 'types'
// import { useRouter } from 'next/router'

// export async function getStaticProps({
//   preview,
//   params,
//   locale,
//   locales,
// }: GetStaticPropsContext<{ pages: string[] }>) {
//   const config = { locale, locales }
//   // const pagesPromise = commerce.getAllPages({ config, preview })
//   // const siteInfoPromise = commerce.getSiteInfo({ config, preview })
//   // const { pages } = await pagesPromise
//   // const { categories } = await siteInfoPromise
//   const path = params?.pages.join('/')
//   const slug = locale ? `${locale}/${path}` : path
//   // const pageItem = pages.find((p: Page) =>
//   //   p.url ? getSlug(p.url) === slug : false
//   // )
//   const data = {}
//   // pageItem &&
//   // (await commerce.getPage({
//   //   variables: { id: pageItem.id! },
//   //   config,
//   //   preview,
//   // }))

//   let page //= data?.page

//   if (!page) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {
//       // pages,
//       page,
//       // categories,
//     },
//     revalidate: 60 * 60, // Every hour
//   }
// }

// export async function getStaticPaths({ locales }: GetStaticPathsContext) {
//   const config = { locales }
//   let pages //: { pages: Page[] } = await commerce.getAllPages({ config })
//   const [invalidPaths, log] = missingLocaleInPages()

//   // const paths = pages
//   //   .map((page: any) => page.url)
//   //   .filter((url: any) => {
//   //     if (!url || !locales) return url
//   //     // If there are locales, only include the pages that include one of the available locales
//   //     if (locales.includes(getSlug(url).split('/')[0])) return url

//   //     invalidPaths.push(url)
//   //   })
//   // log()
//   let paths = {}

//   return {
//     // paths,
//     fallback: 'blocking',
//   }
// }

// export default function Pages({ page }: { page: any }) {
//   const router = useRouter()

//   return router.isFallback ? (
//     <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
//   ) : (
//     <div className="max-w-2xl py-20 mx-8 sm:mx-auto">
//       {page?.body && <Text html={page.body} />}
//     </div>
//   )
// }

// Pages.Layout = Layout
