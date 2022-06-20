import dynamic from 'next/dynamic'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { PageNotFound, Section } from '@components/templates'
import { getPage } from '@lib/queries'

const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)

export default function Index({ slug, preview }: any) {
  let results: any = useQueries([
    { queryKey: 'home', queryFn: () => getPage('home'), cacheTime: Infinity },
  ])

  if (!results[0].isFetching) {
    console.log(slug, '(received data): ', results[0].data?.data[0])

    return (
      <>
        {results[0].data?.data[0]?.sections?.map((section: any) => (
          <Section key={section.sort} section={section} />
        ))}
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
}

Index.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI.
// in DEV getStaticProps is run every time
// in PROD, this only runs once then revalidates based on the revalidate parameter
// context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
export async function getStaticProps(context: any) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  })

  await queryClient.prefetchQuery('home', () => getPage('home'))

  // return props with data to component
  return {
    props: {
      slug: 'home',
      dehydratedState: dehydrate(queryClient),
      preview: context.preview ? true : null,
    },
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
    // props: { statdata, preview: preview ? true : null },
  }
}
