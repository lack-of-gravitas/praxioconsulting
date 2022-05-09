import React from 'react'
import delve from 'dlv'
import ErrorPage from 'next/error'
import Layout from '@components/sections/Layout'
import * as queries from '@services/queries'
import parse from 'html-react-parser'
import { CameraIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { fetchGetJSON } from '@lib/api-helpers'

export async function getStaticPaths() {
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }

  // get list of valid paths associated to this domain (built at runtime) can be a subset of all paths
  let dbQuery = `
  query getSlugs ( $brand: String!) {
    slugs: globals (where: {domain: $brand}) {
      articles { slug } 
    }
  }`

  let req = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `${dbQuery}`,
      variables: {
        brand: `${process.env.NEXT_PUBLIC_BRAND}`,
      },
    }),
  }

  let data = []

  fetch(`${process.env.NEXT_PUBLIC_BACKEND}/graphql`, req)
    .then((res) => res.json())
    .then((results) => {
      // process all returned slugs and build business friendly paths
      // console.log("results (getstaticpaths): ", JSON.stringify(results));

      let slugArray = []

      // generate all blog post paths
      results.data.slugs[0].articles.forEach((article) => {
        slugArray = [] // reset temp array
        slugArray.push('blog', article.slug)
        data = [...data, { params: { slug: slugArray } }]
      })

      // console.log("data (getstaticpaths):", JSON.stringify(data));
    })

  // return {
  //   paths: data, // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
  //   // fallback: false, // if false, will return 404 if page not in the paths array above
  //   // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
  //   fallback: "blocking", // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  // };
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context) {
  // console.log("context (getstaticprops): ", context);
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

  // If you request this page with the preview mode cookies set:
  //
  // - context.preview will be true
  // - context.previewData will be the same as
  //   the argument used for `setPreviewData`.

  const preview = context.preview
  // check if there's a slug provided, if not it's likely home page so set the slug

  let apiResponse = await fetchGetJSON(
    `${process.env.NEXT_PUBLIC_BACKEND}/articles?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_where[1][slug]=${context.params.slug}`
  )

  let data = {}
  data.path = context.params.slug
  data.globalData = {
    name: apiResponse[0].brands[0].name,
    tagline: apiResponse[0].brands[0].tagline,
    domain: apiResponse[0].brands[0].domain,
    locale: apiResponse[0].brands[0].locale,
    themes: apiResponse[0].brands[0].themes,
    navigation: apiResponse[0].brands[0].navigation,
    footer: apiResponse[0].brands[0].footer,
    seo: apiResponse[0].brands[0].seo,
    locations: apiResponse[0].brands[0].locations,
    socials: apiResponse[0].brands[0].socials,
  }
  data.pageData = apiResponse[0]
  // console.log("data: ", data);

  // return props with data to component
  return {
    props: { data, preview: preview ? true : null }, // will be passed to the page component as props
    revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}

const BlogPost = ({ data, preview }) => {
  // console.log("data (Component): ", JSON.stringify(data.pageData));

  if (
    data.pageData === null ||
    data.pageData === undefined ||
    Object.keys(data.pageData).length === 0
  ) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout
      data={data.globalData}
      slug={'blog'}
      seo={data.pageData.seo ? data.pageData.seo : data.globalData.seo}
      preview={preview}
    >
      {data.pageData ? (
        <div className="relative py-16 overflow-hidden bg-white">
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div
              className="relative h-full mx-auto text-lg max-w-prose"
              aria-hidden="true"
            >
              <svg
                className="absolute transform translate-x-32 top-12 left-full"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
                />
              </svg>
              <svg
                className="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
                />
              </svg>
              <svg
                className="absolute transform translate-x-32 bottom-12 left-full"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={384}
                  fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
                />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto text-lg max-w-prose">
              <h1>
                <span className="block text-base font-semibold tracking-wide text-center text-gray-700 uppercase">
                  {data.pageData.subtitle}
                </span>
                <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                  {data.pageData.title}
                </span>
              </h1>

              <p className="mt-8 mb-8 text-xl leading-8 text-gray-500">
                {data.pageData.excerpt}
              </p>

              <figure>
                {data.pageData.image ? (
                  <>
                    <Image
                      className="w-full pt-5 rounded-lg"
                      src={
                        data.pageData.image.formats.medium
                          ? data.pageData.image.formats.medium.url
                          : data.pageData.image.formats.small.url
                      }
                      layout="responsive"
                      height={
                        data.pageData.image.formats.medium
                          ? data.pageData.image.formats.medium.height
                          : data.pageData.image.formats.small.height
                      }
                      width={
                        data.pageData.image.formats.medium
                          ? data.pageData.image.formats.medium.width
                          : data.pageData.image.formats.small.height
                      }
                      alt={data.pageData.image.name}
                      priority // largest contentful paint element so prioritises load
                    />
                    {data.pageData.image.caption && (
                      <figcaption className="flex mt-3 text-sm text-gray-500">
                        <CameraIcon
                          className="flex-none w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="ml-2">
                          {data.pageData.image.caption}
                        </span>
                      </figcaption>
                    )}
                  </>
                ) : (
                  <>
                    <Image
                      className="w-full rounded-lg"
                      src="https://via.placeholder.com/150/0891B2/E2E8F0?text=No+Image+Set"
                      layout="responsive"
                      height={700}
                      width={700}
                      alt=""
                    />
                  </>
                )}
              </figure>
            </div>

            {data.pageData.content && (
              <>
                <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-cyan">
                  {parse(data.pageData.content)}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </Layout>
  )
}

export default BlogPost

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
