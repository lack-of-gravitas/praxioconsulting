import dynamic from 'next/dynamic'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { getAccount, getMediaLibrary } from '@lib/queries'
import { useState, useEffect, useRef, Fragment } from 'react'
import ReactPlayer from 'react-player/lazy'

const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)

const PageNotFound = dynamic(() => import('@components/templates/PageNotFound'))

export default function Account({ slug, preview }: any) {
  // console.log(data.collection, '(received data) ', data)
  let vimeoShowcases: any = ['9313461', '8498518'] //product.videoLibraryFolders.split(",");
  let results: any = useQueries([
    {
      queryKey: 'videoLibrary',
      queryFn: async () => getMediaLibrary(vimeoShowcases),
      cacheTime: Infinity,
    },
  ])

  if (!results[0].isFetching) {
    // videos = results
    // console.log('fetched->', results)

    // placeholder UI
    return (
      <>
        <div className="bg-white">
          <div className="grid items-center max-w-2xl grid-cols-1 px-4 py-8 mx-auto gap-y-16 gap-x-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 lg:grid-cols-1">
            <div className="">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Media Library
              </h2>
              <p className="mt-4 text-gray-500">
                Great news, your purchases give you access to Bonus Content
                including this media library.
              </p>
            </div>
            <div className="bg-gray-100">
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="max-w-2xl py-4 mx-auto sm:py-4 lg:py-4 lg:max-w-none">
                  {/* <h2 className="text-2xl font-extrabold text-gray-900">
                  Collections
                </h2> */}

                  <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (results[0].isError) {
    return (
      <>
        <PageNotFound />
      </>
    )
  }

  return <>Loading</>
}

Account.Layout = Layout

// // If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
// export async function getStaticProps(context: any) {
//   // locally getStaticProps is run every time
//   // in production, this only runs once then revalidates based on the revalidate parameter
//   // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
//   // console.log(context.params)
//   let vimeoShowcases: any = ['9313461', '8498518'] //product.videoLibraryFolders.split(",");

//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
//         staleTime: 1000 * 60 * 10, // 10 minutes
//       },
//     },
//   })

//   await queryClient.prefetchQuery('videoLibrary', () =>
//     getMediaLibrary(vimeoShowcases)
//   )

//   return {
//     props: {
//       slug: context.params.slug,
//       dehydratedState: dehydrate(queryClient),
//       preview: context.preview ? true : null,
//     }, // will be passed to the page component as props
//     revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
//   }
// }

const callouts = [
  {
    name: 'Desk and Office',
    description: 'Work from home accessories',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt:
      'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Self-Improvement',
    description: 'Journals and note-taking',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt:
      'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Travel',
    description: 'Daily commute essentials',
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]

export function Example() {
  return (
    <div className="bg-gray-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-2xl py-16 mx-auto sm:py-24 lg:py-32 lg:max-w-none">
          <h2 className="text-2xl font-extrabold text-gray-900">Collections</h2>

          <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
            {callouts.map((callout) => (
              <div key={callout.name} className="relative group">
                <div className="relative w-full overflow-hidden bg-white rounded-lg h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="object-cover object-center w-full h-full"
                  />
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <a href={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {callout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
