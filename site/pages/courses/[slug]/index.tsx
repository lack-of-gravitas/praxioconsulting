// import { Block } from '@components/blocks'
// import { fetchGetJSON } from '@lib/api-helpers'

import { PageNotFound } from '@components/templates'
import { Layout } from '@components/templates'

const CoursePage = ({ data, preview }) => {
  // console.log("data (Component): ", JSON.stringify(data.pageData.length));

  if (data === undefined) {
    return (
      <Layout>
        <PageNotFound statusCode={404} />
      </Layout>
    )
  }
  if (
    data.pageData === null ||
    data.pageData === undefined ||
    Object.keys(data.pageData).length === 0
  ) {
    return (
      <Layout>
        <PageNotFound statusCode={404} />
      </Layout>
    )
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

export default CoursePage

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
      products { slug } 
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
        slugArray.push('products', product.slug)
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
  const preview = context.preview
  // let apiResponse = await fetchGetJSON(
  //   `${process.env.NEXT_PUBLIC_BACKEND}/products?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_where[1][slug]=${context.params.slug}`
  // )

  let data = {}
  // data.path = context.params.slug
  // data.globalData = {
  //   name: apiResponse[0].brands[0].name,
  //   tagline: apiResponse[0].brands[0].tagline,
  //   domain: apiResponse[0].brands[0].domain,
  //   locale: apiResponse[0].brands[0].locale,
  //   themes: apiResponse[0].brands[0].themes,
  //   navigation: apiResponse[0].brands[0].navigation,
  //   footer: apiResponse[0].brands[0].footer,
  //   seo: apiResponse[0].brands[0].seo,
  //   locations: apiResponse[0].brands[0].locations,
  //   socials: apiResponse[0].brands[0].socials,
  // }
  // data.pageData = apiResponse[0]

  // console.log(data);
  // return props with data to component
  return {
    props: { data, preview: preview ? true : null }, // will be passed to the page component as props
    revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}
