import React from 'react'

import ErrorPage from 'next/error'
import { Layout } from '@components/templates'
// import * as queries from '@services/queries'
// import { Block } from '@components/blocks'
import { useRouter } from 'next/router'
import { useState } from 'react'
// import { getData, getRestaurants, getStrapiURL } from '../../utils'
// import { getLocalizedParams } from '../../utils/localize'
// import { fetchGetJSON } from '@lib/api-helpers'

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context) {
  // console.log("context (getstaticprops): ", context);
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

  const preview = context.preview
  // check if there's a slug provided, if not it's likely home page so set the slug
  let path = 'service'

  // let apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/pages?_where[0][brand.domain]=${process.env.NEXT_PUBLIC_BRAND}&_where[1][slug]=blog`
  // )

  let data = {}
  data.path = path + 's'
  // data.globalData = {
  //   name: apiResponse[0].brand.name,
  //   tagline: apiResponse[0].brand.tagline,
  //   domain: apiResponse[0].brand.domain,
  //   locale: apiResponse[0].brand.locale,
  //   themes: apiResponse[0].brand.themes,
  //   navigation: apiResponse[0].brand.navigation,
  //   footer: apiResponse[0].brand.footer,
  //   seo: apiResponse[0].brand.seo,
  //   locations: apiResponse[0].brand.locations,
  //   socials: apiResponse[0].brand.socials,
  // }
  // data.pageData = apiResponse[0]

  // apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/articles?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_sort=created_at:DESC`
  // )

  // console.log("apiResponse: ", apiResponse);

  // data.pageData.articles = apiResponse
  // console.log("data: ", data);

  // return props with data to component
  return {
    props: { data, preview: preview ? true : null }, // will be passed to the page component as props
    revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}

const Blog = ({ data, preview }) => {
  // console.log("data (Component): ", data);
  // console.log("data (Component): ", JSON.stringify(data));

  if (data === undefined) {
    return <ErrorPage statusCode={404} />
  }
  if (
    data.pageData === null ||
    data.pageData === undefined ||
    Object.keys(data.pageData).length === 0
  ) {
    return <ErrorPage statusCode={404} />
  }

  const blocks = delve(data.pageData, 'blocks')

  return (
    <Layout
      data={data.globalData}
      slug={data.pageData.slug}
      seo={data.pageData.seo ? data.pageData.seo : data.globalData.seo}
      preview={preview}
    >
      {blocks?.map((block, key) => (
        <></>
        // <Block key={key} block={block} data={data.pageData} />
      ))}
    </Layout>
  )
}

export default Blog
