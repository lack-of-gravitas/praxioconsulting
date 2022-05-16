import { LockClosedIcon } from '@heroicons/react/outline'
// import { signOut, getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
// import * as queries from '@services/queries'
import { Course } from '@components/templates'
import ErrorPage from 'next/error'
import { Layout } from '@components/templates'
import Link from 'next/link'
import { fetchGetJSON } from '@lib/api-helpers'

export default function CourseContent({ data, preview }) {
  // get the session to check if the user logged in or not
  console.log('courseContent: ', data.pageData.course.modules)
  const router = useRouter()
  const { data: session, status } = useSession()

  // display content based on status and data
  if (status === 'unauthenticated') {
    return (
      <Layout
        data={data.globalData}
        slug={data.path}
        seo={data.pageData?.seo ? data.pageData.seo : data.globalData.seo}
        // preview={preview}
      >
        <div className="min-h-full px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
          <div className="mx-auto max-w-max">
            <main className="sm:flex">
              <LockClosedIcon className="h-64 font-extrabold text-primaryColor-600" />
              <div className="sm:ml-6 sm:border-l">
                <div className=" sm:border-gray-200 sm:pl-6">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                    Locked Content
                  </h1>
                  <p className="mt-1 text-base text-gray-500">
                    You need to sign in to access purchased content.
                  </p>
                </div>
                <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                  <Link href="/user/signin" passHref>
                    <a className="inline-flex items-center px-4 py-2 text-base font-medium text-white border border-transparent rounded-md shadow-sm bg-primaryColor-600 hover:bg-primaryColor-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-500">
                      Login
                    </a>
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    )
  }

  if (data === undefined) {
    return <ErrorPage statusCode={404} />
  }

  if (
    data.globalData === null ||
    data.globalData === undefined ||
    Object.keys(data.globalData).length === 0
  ) {
    return <ErrorPage statusCode={404} />
  } else {
    return (
      <>
        {/* <CourseLayout
          header={data.globalData}
          {...data.pageData}
          // course={data.pageData}
          slug={data.pageData.slug}
          //seo={data.pageData.seo ? data.pageData.seo : data.globalData.seo}
          preview={preview}
        /> */}
      </>
    )
  }
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context) {
  // console.log("course content (getstaticprops): ", context);
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

  const preview = context.preview
  let data = {}
  data.path = context.params.slug

  let apiData = await fetchGetJSON(
    `${process.env.NEXT_PUBLIC_BACKEND}/products?_where[0][brands.domain]=${process.env.NEXT_PUBLIC_BRAND}&_where[1][slug]=${context.params.slug}`
  )

  data.globalData = {
    name: apiData[0].brands[0].name,
    locale: apiData[0].brands[0].locale,
    domain: apiData[0].brands[0].domain,
    themes: apiData[0].brands[0].themes,
    navigation: apiData[0].brands[0].navigation,
    footer: apiData[0].brands[0].footer,
  }

  // set pageData
  data.pageData = {}

  apiData[0].blocks.forEach((block) => {
    if (block.__component === 'blocks.course') {
      // console.log("block] | ", block);
      data.pageData.course = block.courses[0]
    }
  })

  // get modules
  data.pageData.course.modules = await fetchGetJSON(
    // get all modules that have content and courses associated to them, sorted by sortOrder
    `${process.env.NEXT_PUBLIC_BACKEND}/modules?_where[0][courses_null]=false&_where[1][courses.id]=${data.pageData.course.id}&_sort=sortOrder:ASC`
  )
  // https://klubs.azurewebsites.net/modules?_where[0][courses_null]=false&_where[1][contents_null]=false&_where[2][courses.id]=2&_sort=sortOrder:ASC
  data.pageData.course.contentExists = false
  data.pageData.course.modules.map((module) => {
    delete module.localizations
    delete module.published_at
    delete module.created_at
    delete module.updated_at
    delete module.courses

    // check if module has content
    if (module.contents.length > 0) {
      data.pageData.course.contentExists = true
    }
  })

  // data.pageData = data.pageData[0];
  console.log('contentPage data | ', data.pageData)

  // return props with data to component
  return {
    props: { data, preview: preview ? true : null }, // will be passed to the page component as props
    revalidate: 28800, //30, // In seconds. False means page is cached until next build, 28800 = 8 hours
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
