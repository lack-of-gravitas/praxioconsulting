import { Layout } from '@components/templates'
import { PageNotFound } from '@components/templates'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import { Home } from '@components/templates'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

const Universals = ({ data, preview }: any) => {
  // console.log("data (Component): ", data);

  // if (data === undefined) {
  //   return (
  //     <Layout>
  //       <PageNotFound statusCode={404} />
  //     </Layout>
  //   )
  // }
  // if (
  //   data.pageData === null ||
  //   data.pageData === undefined ||
  //   Object.keys(data.pageData).length === 0
  // ) {
  //   return (
  //     <Layout>
  //       <PageNotFound statusCode={404} />
  //     </Layout>
  //   )
  // }

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

export default function Pages(context: any) {
  const { status, data, error, isFetching, isSuccess } = useQuery(
    'home',
    async () =>
      await (
        await fetch(
          `${
            process.env.NEXT_PUBLIC_REST_API
          }/pages?fields=*,sections.*&filter[brand][domain][_eq]=${
            process.env.NEXT_PUBLIC_BRAND
          }&filter[slug][_eq]=${
            context.params.slug ? context.params.slug : 'home'
          }`
        )
      ).json(),
    { cacheTime: Infinity, staleTime: 1000 * 60 * 10 }
  )
  console.log(data)
  if (isFetching) {
    return <div>Loading...</div>
  }
  if (!data) {
    return <div>Error: No data</div>
  }

  return (
    <>
      <Home />
    </>
  )
}

Pages.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps({
  // get from context variable i.e. context.preview, context.locale etc.
  params,
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

  // check if there's a slug provided, if not it's likely home page so set the slug
  let path = ''
  if (params.slug === undefined) {
    path = '/'
  } else {
    path = params.slug[params.slug.length - 1]
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  })
  // if (!queryClient.getQueryData('home')) {
  await queryClient.prefetchQuery('home', getdata)
  // }

  return {
    props: {
      data,
      preview: preview ? true : null,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}

// gets paths that aren't explictly defined (i.e. /home, /about, etc)
// If you export an async function called getStaticPaths from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
// If the page uses an optional catch-all route, supply null, [], undefined or false to render the root-most route. For example, if you supply slug: false for pages/[[...slug]], Next.js will statically generate the page /.
export async function getStaticPaths(context: any) {
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404. If empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }
}
