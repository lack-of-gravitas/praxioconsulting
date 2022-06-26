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
      queryKey: 'mediaLibrary',
      queryFn: async () => getMediaLibrary(vimeoShowcases),
      cacheTime: Infinity,
    },
  ])

  let videos: any = []
  if (!results[0].isFetching) {
    videos = results[0]
    // console.log('fetched: ', videos)
  }

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

                <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                  {videos.map((video: any) => (
                    <div key={video.uri} className="relative group">
                      <div className="relative w-full overflow-hidden bg-white rounded-xs h-80 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <div className="object-cover w-full player-wrapper aspect-video h-4/5">
                          <ReactPlayer
                            controls={true}
                            className="react-player "
                            url={video.link}
                            width="100%"
                            height="100%"
                          />
                        </div>
                        {/* <img
                          src={callout.imageSrc}
                          alt={callout.imageAlt}
                          className="object-cover object-center w-full h-full"
                        /> */}
                      </div>
                      {/* <h3 className="mt-6 text-sm text-gray-500">
                        <a href={callout.href}>
                          <span className="absolute inset-0" />
                          {video.name}
                        </a>
                      </h3> */}
                      <p className="text-base font-semibold text-gray-900">
                        {video.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Account.Layout = Layout

/* This example requires Tailwind CSS v2.0+ */
const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and powder coated steel card cover',
  },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
]

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
