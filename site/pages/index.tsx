import { Layout } from '@components/templates'
import { Hero } from '@components/organisms'

import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { Button } from '@components/atoms'
import { Footer } from '@components/organisms'
export default function Home({
  data,
  preview,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("data (Component): ", data);
  // console.log("data (Component): ", JSON.stringify(data));
  // if (data === undefined) {
  //   return <ErrorPage statusCode={404} />;
  // }
  // if (
  //   data.pageData === null ||
  //   data.pageData === undefined ||
  //   Object.keys(data.pageData).length === 0
  // ) {
  //   return <ErrorPage statusCode={404} />;
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
      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
      <Button variant="primary">Test</Button>
      <Footer />
    </>
  )
}

Home.Layout = Layout

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

  // ****************************************************************************************
  // NEXTJS COMMERCE EXAMPLE
  // const config = { locale, locales }
  // const productsPromise = commerce.getAllProducts({
  //   variables: { first: 6 },
  //   config,
  //   preview,
  //   // Saleor provider only
  //   ...({ featured: true } as any),
  // })
  // const pagesPromise = commerce.getAllPages({ config, preview })
  // const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  // const { products } = await productsPromise
  // const { pages } = await pagesPromise
  // const { categories, brands } = await siteInfoPromise
  // ****************************************************************************************

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
