import dynamic from 'next/dynamic'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { PageNotFound } from '@components/templates'
import { getPage } from '@lib/queries'

const Layout = dynamic(
  () => import('@components/templates/_courseLayout/Layout')
)

export default function Content({ slug, preview }: any) {
  let results: any = useQueries([
    { queryKey: slug, queryFn: () => getPage(slug), cacheTime: Infinity },
  ])

  if (!results[0].isFetching) {
    console.log(slug, ': ', results[0].data?.data[0])

    return (
      <>
        {/* {results[0].data?.data[0]?.sections?.map((section: any) => (
          <Section key={section.sort} section={section} />
        ))} */}
      </>
    )
  }

  if (results[0].isError) {
    return (
      <>
        <PageNotFound />
      </>
    )
  }

  return <></>
}

Content.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  })

  await queryClient.prefetchQuery(context.params.slug[0], () =>
    getPage(context.params.slug[0])
  )

  return {
    props: {
      slug: context.params.slug,
      // data,
      dehydratedState: dehydrate(queryClient),
      preview: context.preview ? true : null,
    }, // will be passed to the page component as props
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}

export async function getStaticPaths() {
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }
}
