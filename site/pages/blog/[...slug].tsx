import dynamic from 'next/dynamic'
import { PageNotFound, Layout } from '@components/templates'
import { useQueries, QueryClient, dehydrate } from 'react-query'
const BasicContent = dynamic(() => import('@components/organisms/BasicContent'))
const HeaderPage = dynamic(
  () => import('@components/molecules/Header/HeaderPage')
)
const HeaderImage = dynamic(
  () => import('@components/molecules/Header/HeaderImage')
)

let getdata: any = {}
const getBrandColors = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
        `?fields=primaryColor,accentColor` +
        `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
    )
  ).json()

export default function BlogPost({ slug, preview }: any) {
  let results: any = useQueries([
    { queryKey: slug, queryFn: getdata, cacheTime: Infinity },
    { queryKey: 'colors', queryFn: getBrandColors, cacheTime: Infinity },
  ])

  let brand = {}

  if (!results[0].isFetching) {
    brand = results[0].data.data[0]
    // console.log('fetched brand: ', brand)
  }

  console.log(slug, results[0].data.data[0])

  return (
    <>
      <HeaderPage
        data={{
          title: results[0].data.data[0].name,
          description: results[0].data.data[0].description,
          date_created: results[0].data.data[0].date_created,
        }}
      />
      <HeaderImage
        data={{
          image: results[0].data.data[0].image
            ? results[0].data.data[0].image
            : '',
        }}
      />
      <BasicContent data={results[0].data.data[0]} />
    </>
  )
}
BlogPost.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

  getdata = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Posts` +
          `?fields=slug,name,image,description,content,status,date_created` +
          `&filter[brands][brands_id][domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}` +
          `&filter[slug][_eq]=${context.params.slug}`
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
  await queryClient.prefetchQuery(context.params.slug, getdata)
  // }

  return {
    props: {
      slug: context.params.slug[0],
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

  // return {
  //   paths: data, // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
  //   // fallback: false, // if false, will return 404 if page not in the paths array above
  //   // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
  //   fallback: "blocking", // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  // };
}
