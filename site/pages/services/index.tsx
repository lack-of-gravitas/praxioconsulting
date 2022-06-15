import { Layout, Section } from '@components/templates'
import { useQueries, QueryClient, dehydrate } from 'react-query'

let getdata: any = {}

export default function Services({ slug, preview }: any) {
  let results: any = useQueries([
    { queryKey: 'services', queryFn: getdata, cacheTime: Infinity },
  ])

  if (results[0].isFetching) {
    return <div>Loading...</div>
  }

  console.log('services', results[0].data)

  return (
    <>
      {results[0].data?.data[0].sections?.map((section: any) => (
        <Section key={section.sort} section={section} />
      ))}
    </>
  )
}

Services.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // console.log("context (getstaticprops): ", context);
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
  getdata = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Pages` +
          `?fields=id,slug,name,sections.id,sections.sort,sections.collection,sections.item.*,sections.item.buttons.*,sections.item.buttons.item.slug,sections.item.buttons.item.name,sections.item.buttons.item.type,sections.item.items.item.id,sections.item.items.item.slug,sections.item.items.item.description,sections.item.items.item.name,sections.item.items.item.image,sections.item.items.item.type` +
          `&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
          `&filter[slug][_eq]=services` //+
        // `&filter[status][_eq]=published`
      )
    ).json()

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  })
  // if (!queryClient.getQueryData('home')) {
  await queryClient.prefetchQuery('services', getdata)
  // }

  return {
    props: {
      slug: 'services',
      // data,
      dehydratedState: dehydrate(queryClient),
      preview: context.preview ? true : null,
    }, // will be passed to the page component as props
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}
