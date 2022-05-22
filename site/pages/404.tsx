import type { GetStaticPropsContext } from 'next'
// import commerce from '@lib/api/commerce'
import { Layout } from '@components/templates'
import { PageNotFound } from '@components/templates'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  // const { pages } = await commerce.getAllPages({ config, preview })
  // const { categories, brands } = await commerce.getSiteInfo({ config, preview })
  return {
    props: {
      // pages,
      // categories,
      // brands,
    },
    revalidate: 200,
  }
}

export default function NotFound() {
  return (
    <>
      <PageNotFound />
    </>
  )
}

NotFound.Layout = Layout
