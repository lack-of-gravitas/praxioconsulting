import { Layout } from '@components/templates'
import { PageNotFound, Section } from '@components/templates'
import { useQuery, useQueries, QueryClient, dehydrate } from 'react-query'

const getdata = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Pages` +
        `?fields=id,slug,name,sections.id,sections.sort,sections.collection,sections.item.*,sections.item.buttons.*,sections.item.buttons.item.slug,sections.item.buttons.item.name,sections.item.buttons.item.type,sections.item.items.item.id,sections.item.items.item.slug,sections.item.items.item.description,sections.item.items.item.name,sections.item.items.item.image,sections.item.items.item.type` +
        `&filter[brand][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
        `&filter[slug][_eq]=home`
    )
  ).json()

const getteam = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
        `?fields=team.id,team.sort,team.directus_users_id.first_name,team.directus_users_id.last_name,team.directus_users_id.title,team.directus_users_id.description,team.directus_users_id.avatar` +
        `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
    )
  ).json()

const getBrandColors = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
        `?fields=primaryColor,accentColor` +
        `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
    )
  ).json()

export default function Index({ slug, preview }: any) {
  // const { status, data, error, isFetching, isSuccess }: any = useQuery(
  //   'home',
  //   getdata,
  //   { cacheTime: Infinity, staleTime: 1000 * 60 * 10 }
  // )

  let results = useQueries([
    { queryKey: 'home', queryFn: getdata, cacheTime: Infinity },
    { queryKey: 'team', queryFn: getteam },
    { queryKey: 'brandColors', queryFn: getBrandColors },
  ])

  if (results[0].isFetching || results[1].isFetching || results[2].isFetching) {
    return <div>Loading...</div>
  }
  // if (!data || data.data.length === 0) {
  //   return <PageNotFound />
  // }

  console.log('home', results[0].data.data[0])
  // console.log('team', results[1].data.data[0])
  // console.log('brandColors', results[2].data.data[0])

  return (
    <>
      {results[0].data.data[0].sections?.map((section: any) => (
        <Section
          key={section.sort}
          section={section}
          genericData={{
            team: results[1].data?.data[0].team,
            brandColors: {
              accentColor: results[2].data?.data[0].accentColor,
              primaryColor: results[2].data?.data[0].primaryColor,
            },
          }}
        />
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
  // await queryClient.prefetchQuery('brand', getbrand)

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
