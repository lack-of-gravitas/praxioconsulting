import { Layout } from '@components/templates'
import { Home } from '@components/templates'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
export default function Index({
  data,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("data (Component): ", data);
  // console.log("data (Component): ", JSON.stringify(data));
  // if (data === undefined) {
  //   return  <Layout>
  //   <PageNotFound statusCode={404} />
  // </Layout>;
  // }
  // if (
  //   data.pageData === null ||
  //   data.pageData === undefined ||
  //   Object.keys(data.pageData).length === 0
  // ) {
  //   return  <Layout>
  //   <PageNotFound statusCode={404} />
  // </Layout>
  // }

  // const blocks = delve(data.pageData, "blocks");

  // return (
  //   <Layout
  //     data={data.globalData}
  //     slug={data.pageData.slug}
  //     seo={data.pageData.seo ? data.pageData.seo : data.globalData.seo}
  //     preview={preview}
  //   >
  //     {blocks?.map((block, key) => (
  //       <Block key={key} block={block} data={data.pageData} />
  //     ))}
  //   </Layout>
  // );

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
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  // console.log("context (getstaticprops): ", context);

  // get data here and use react-query for magic local storage?
  let data = { header: 0 }
  // console.log("data: ", data);

  return {
    // will be passed to the page component as props
    props: { data, preview: preview ? true : null },
    // props: {
    //   products,
    //   categories,
    //   brands,
    //   pages,
    // },
    revalidate: 60, // In seconds. False = cached until next build, 28800 = 8 hours
  }
}
