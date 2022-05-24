import { Layout } from '@components/templates'
import { Home } from '@components/templates'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

const getdata = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/pages?fields=*,sections.*&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}&filter[slug][_eq]=home`
    )
  ).json()

export default function Index({
  // statdata,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { status, data, error, isFetching, isSuccess } = useQuery(
    'home',
    getdata,
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

Index.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI.
// in DEV getStaticProps is run every time
// in PROD, this only runs once then revalidates based on the revalidate parameter
// context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
export async function getStaticProps({
  // get from context variable i.e. context.preview, context.locale etc.
  params,
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
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
    // will be passed to the page component as props
    props: {
      dehydratedState: dehydrate(queryClient),
      preview: preview ? true : null,
    },
    // props: { statdata, preview: preview ? true : null },
  }
}
