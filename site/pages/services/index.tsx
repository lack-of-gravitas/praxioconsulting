import React from 'react'
import { PageNotFound } from '@components/templates'
import { Layout } from '@components/templates'
import { Home } from '@components/templates'
import { useQuery, QueryClient, dehydrate } from 'react-query'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export default function Services({
  // statdata,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {}

;({ data, preview }: any) => {
  // console.log("data (Component): ", (data));
  // console.log("data (Component): ", JSON.stringify(data));

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

  // const blocks = data.pageData.blocks

  return (
    <Layout
    // data={data.globalData}
    // slug={data.pageData.slug}
    // seo={data.pageData.seo ? data.pageData.seo : data.globalData.seo}
    // preview={preview}
    >
      <Products />
      {/* {blocks?.map((block, key) => (
        <></>
        // <Block key={key} block={block} data={data.pageData} />
      ))} */}
    </Layout>
  )
}

Services.Layout = Layout

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // console.log("context (getstaticprops): ", context);
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
  // if (!queryClient.getQueryData('home')) {
  await queryClient.prefetchQuery('home', getdata)
  // }

  return {
    props: {
      // data,
      dehydratedState: dehydrate(queryClient),
      preview: preview ? true : null,
    }, // will be passed to the page component as props
    revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}
