import { Layout } from '@components/templates'
import { PageNotFound, Section } from '@components/templates'
import { useQuery, QueryClient, dehydrate } from 'react-query'

const getdata = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Pages` +
        `?fields=id,slug,name,sections.id,sections.sort,sections.collection,sections.item.*, sections.item.buttons.*,sections.item.buttons.item.slug,sections.item.buttons.item.name` +
        `&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
        `&filter[slug][_eq]=home`
    )
  ).json()

export default function Index({ slug, preview }: any) {
  const { status, data, error, isFetching, isSuccess }: any = useQuery(
    'home',
    getdata,
    { cacheTime: Infinity, staleTime: 1000 * 60 * 10 }
  )

  console.log(data)

  if (isFetching) {
    return <div>Loading...</div>
  }
  // if (!data || data.data.length === 0) {
  //   return <PageNotFound />
  // }

  const sections = data.data[0].sections

  return (
    <>
      {sections?.map((section: any) => (
        <Section key={section.id} section={section} />
      ))}
    </>
  )
}

Index.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI.
// in DEV getStaticProps is run every time
// in PROD, this only runs once then revalidates based on the revalidate parameter
// context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
export async function getStaticProps(context: any) {
  console.log('context: ', context)
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
