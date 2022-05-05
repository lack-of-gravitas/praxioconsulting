import { Layout } from '@components/common'
import { Hero } from '@components/ui'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

// supabase imports
// import Pricing from '../../examples/nextjs-subs/Pricing'
// import { getActiveProductsWithPrices } from '@lib/supabase-client'
// import { Product } from 'types'
// import { GetStaticPropsResult } from 'next'
// end supabase imports

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
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

  return {
    props: {
      // products,
      // categories,
      // brands,
      // pages,
    },
    revalidate: 60,
  }
}

export default function Home({}: // products,
InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Hero
        headline=" Dessert dragée halvah croissant."
        description="Cupcake ipsum dolor sit amet lemon drops pastry cotton candy. Sweet carrot cake macaroon bonbon croissant fruitcake jujubes macaroon oat cake. Soufflé bonbon caramels jelly beans. Tiramisu sweet roll cheesecake pie carrot cake. "
      />
    </>
  )
}

Home.Layout = Layout
