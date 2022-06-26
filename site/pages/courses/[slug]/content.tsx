import dynamic from 'next/dynamic'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { PageNotFound } from '@components/templates'
import { getCourseContent } from '@lib/queries'
import ReactPlayer from 'react-player/lazy'
import {
  Menu as MenuIcon,
  Plus as PlusIcon,
  Cross as CrossIcon,
} from '@components/atoms/Icons'

import { Fragment, useState } from 'react'
import { Dialog, Transition, Menu } from '@headlessui/react'

const tabs = [
  { name: 'Files & Links', href: '#', current: true },
  { name: 'Notes', href: '#', current: false },
  { name: 'Transcript', href: '#', current: false },
]

const Layout = dynamic(
  () => import('@components/templates/_courseLayout/Layout')
)

export default function Content({ slug, preview }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  let results: any = useQueries([
    {
      queryKey: slug,
      queryFn: () => getCourseContent(slug),
      cacheTime: Infinity,
    },
  ])

  if (!results[0].isFetching) {
    // console.log(slug, ': ', results[0].data)
    let { modules } = results[0].data
    return (
      <>
        <div>
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 md:hidden"
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-white">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute top-0 right-0 p-1 -mr-14">
                        <button
                          type="button"
                          className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <CrossIcon
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                          <span className="sr-only">Close sidebar</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex items-center flex-shrink-0 px-4">
                      <img
                        className="w-auto h-8"
                        src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                        alt="Easywire"
                      />
                    </div>
                    <div className="flex-1 h-0 mt-5 overflow-y-auto">
                      <nav className="flex flex-col h-full">
                        <div className="space-y-1">
                          {modules.map((module: any) => (
                            <a
                              key={module.item.name}
                              href="/" //{item.href}
                              className={classNames(
                                module.item.current
                                  ? 'bg-purple-50 border-purple-600 text-purple-600'
                                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group border-l-4 py-2 px-3 flex items-center text-base font-medium'
                              )}
                              aria-current={
                                module.item.current ? 'page' : undefined
                              }
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  module.item.current
                                    ? 'text-purple-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-3 flex-shrink-0 h-6 w-6 material-symbols-outlined'
                                )}
                              >
                                window
                              </span>

                              {module.item.name}

                              {/* <item.icon
                                className={classNames(
                                  item.current
                                    ? 'text-purple-500'
                                    : 'text-gray-400 group-hover:text-gray-500',
                                  'mr-4 flex-shrink-0 h-6 w-6'
                                )}
                                aria-hidden="true"
                              />
                              {item.name} */}
                            </a>
                          ))}
                        </div>
                        <div className="pt-10 mt-auto space-y-1">
                          <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
                            <a href="#" className="flex-shrink-0 block group">
                              <div className="flex items-center">
                                <div>
                                  <img
                                    className="inline-block w-10 h-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                                    alt=""
                                  />
                                </div>
                                <div className="ml-3">
                                  <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                                    Whitney Francis
                                  </p>
                                  <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                                    View profile
                                  </p>
                                </div>
                              </div>
                            </a>
                          </div>
                          <a
                            href="/"
                            className="flex items-center px-3 py-2 text-base font-medium text-gray-600 border-l-4 border-transparent group hover:text-gray-900 hover:bg-gray-50"
                          >
                            <span
                              aria-hidden="true"
                              className="w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500 material-symbols-outlined"
                            >
                              home
                            </span>
                            Home
                          </a>
                        </div>
                      </nav>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                  {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <nav className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto border-r border-gray-200 bg-gray-50">
              <div className="flex items-center flex-shrink-0 px-4">
                <img
                  className="w-auto h-8"
                  src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                  alt="Easywire"
                />
              </div>
              <div className="flex-grow mt-5">
                <div className="space-y-1">
                  {modules.map((module: any) => (
                    <a
                      key={module.item.name}
                      href="" //{item.href}
                      className={classNames(
                        module.item.current
                          ? 'bg-purple-50 border-purple-600 text-purple-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                        'group border-l-4 py-2 px-3 flex items-center text-sm font-medium'
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          module.item.current
                            ? 'text-purple-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6 material-symbols-outlined'
                        )}
                      >
                        window
                      </span>

                      {module.item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 block w-full">
                <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
                  <a href="#" className="flex-shrink-0 block group">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">
                          Whitney Francis
                        </p>
                        <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>

                <a
                  href="/"
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 border-l-4 border-transparent group hover:text-gray-900 hover:bg-gray-50"
                >
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 mr-3 text-gray-400 group-hover:text-gray-500 material-symbols-outlined"
                  >
                    home
                  </span>
                  Home
                </a>
              </div>
            </nav>
          </div>

          {/* Content area */}
          <div className="md:pl-64">
            <div className="flex flex-col max-w-4xl mx-auto md:px-8 xl:px-0">
              <div className="sticky top-0 z-10 flex flex-shrink-0 h-16 bg-white border-b border-gray-200 md:border-0">
                <button
                  type="button"
                  className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <span
                    aria-hidden="true"
                    className="w-6 h-6 material-symbols-outlined"
                  >
                    notes
                  </span>
                </button>

                <div className="px-4 pt-5 pb-16 sm:px-6 md:px-0">
                  <h1 className="text-xl font-extrabold text-gray-900 md:text-2xl">
                    {results[0].data.name}
                  </h1>

                  <p className="hidden max-w-4xl mt-2 text-sm text-gray-500 md:block">
                    {results[0].data.description}
                  </p>
                </div>
              </div>

              <main className="flex-1">
                <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                  <div className="pb-16 md:pt-10">
                    <div className="px-4 sm:px-6 md:px-0">
                      <div className="py-0 md:py-6">
                        {/* Tabs */}
                        <div className="bg-white">
                          <div className="">
                            {/* Image gallery */}

                            <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
                              <div className="overflow-hidden max-h-max aspect-w-16 aspect-h-9">
                                <ReactPlayer
                                  controls={true}
                                  className="react-player"
                                  url="https://www.youtube.com/watch?v=x_rDFa6kZfI" //{JSON.parse(data.video).url} //
                                  width="100%"
                                  height="100%"
                                />
                              </div>
                            </div>

                            {/* Product info */}
                            <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
                              <h1 className="font-extrabold tracking-tight prose-2xl text-gray-900 sm:prose-xl">
                                Video Name
                              </h1>
                              <div className="py-10 lg:py-5">
                                <p className="text-base text-gray-900">
                                  The colossal Toorak mansion and estate, priced
                                  at $65 million to $70 million, is a few days
                                  away from officially hitting the market and
                                  photos have not yet been released.
                                </p>
                              </div>
                            </div>

                            <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
                              <h3 className="text-lg font-medium leading-6 text-gray-900">
                                Additional Content
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                Bonus content, show notes and transcripts are
                                located here. Check back from time to time as we
                                add more material to this Course.
                              </p>
                            </div>

                            {/* TABS MOBILE */}
                            <div className="max-w-2xl px-4 pt-5 mx-auto pb-auto lg:hidden ">
                              <label htmlFor="selected-tab" className="sr-only">
                                Select a tab
                              </label>
                              <select
                                id="selected-tab"
                                name="selected-tab"
                                className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-xs focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                                defaultValue={
                                  tabs.find((tab: any) => tab.current).name
                                }
                              >
                                {tabs.map((tab) => (
                                  <option key={tab.name}>{tab.name}</option>
                                ))}
                              </select>
                            </div>

                            {/* TABS DESKTOP */}
                            <div className="hidden px-5 mx-auto lg:block pb-auto">
                              <div className="border-b border-gray-200">
                                <nav className="flex -mb-px space-x-8">
                                  {tabs.map((tab) => (
                                    <a
                                      key={tab.name}
                                      href={tab.href}
                                      className={classNames(
                                        tab.current
                                          ? 'border-purple-500 text-purple-600'
                                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                        'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                                      )}
                                    >
                                      {tab.name}
                                    </a>
                                  ))}
                                </nav>
                              </div>
                            </div>
                            <div>
                              <dl className="grid max-w-2xl grid-cols-1 px-4 pt-10 mx-auto mt-4 pb-auto sm:px-6 lg:max-w-7xl lg:py-5 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                                <>
                                  <div className="cursor-pointer hover:bg-gray-200">
                                    <dt className="font-medium text-gray-900">
                                      Huberman Lab Podcast
                                    </dt>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      Andrew Huberman, Ph.D., is a
                                      neuroscientist and tenured Professor in
                                      the Department of Neurobiology at the
                                      Stanford University School of Medicine.
                                    </dd>

                                    <dd className="mt-2 text-sm text-gray-500">
                                      <span className="font-semibold">
                                        Visit
                                      </span>{' '}
                                      <span className="align-text-bottom material-symbols-outlined">
                                        arrow_outward
                                      </span>
                                    </dd>
                                  </div>
                                </>
                                <>
                                  <div className="">
                                    <dt className="font-medium text-gray-900">
                                      100mile World Record - Aleksandr Sorokin
                                    </dt>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      Lithuania's Aleksandr Sorokin set new
                                      world records with a time of 11:14:56 for
                                      the 100-mile world record (that's 160.934
                                      kilometers).
                                    </dd>

                                    <dd className="mt-2 text-sm text-gray-500">
                                      <span className="align-text-bottom material-symbols-outlined">
                                        arrow_outward
                                      </span>
                                      <span className="">Visit</span>
                                    </dd>
                                  </div>
                                </>

                                <>
                                  <div className="">
                                    <dt className="font-medium text-gray-900">
                                      Filename 1
                                    </dt>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      Put on a heather gray tee. Want to be a
                                      trendsetter?
                                    </dd>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      <span className="align-text-bottom material-symbols-outlined">
                                        file_download
                                      </span>
                                      <span className="">Download</span>
                                    </dd>
                                  </div>
                                </>
                                <>
                                  <div>
                                    <dt className="font-medium text-gray-900">
                                      Filename 1
                                    </dt>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      Put on a heather gray tee. Want to be a
                                      trendsetter?
                                    </dd>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      <span className="align-text-bottom material-symbols-outlined">
                                        file_download
                                      </span>
                                      <span className="">Download</span>
                                    </dd>
                                  </div>
                                </>
                                <>
                                  <div>
                                    <dt className="font-medium text-gray-900">
                                      Filename 1
                                    </dt>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      Put on a heather gray tee. Want to be a
                                      trendsetter?
                                    </dd>
                                    <dd className="mt-2 text-sm text-gray-500">
                                      <span className="align-text-bottom material-symbols-outlined">
                                        file_download
                                      </span>
                                      <span className="">Download</span>
                                    </dd>
                                  </div>
                                </>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
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

  return <></>
}

Content.Layout = Layout

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

// If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
export async function getStaticProps(context: any) {
  // locally getStaticProps is run every time
  // in production, this only runs once then revalidates based on the revalidate parameter
  // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
  // console.log(context.params)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
        staleTime: 1000 * 60 * 10, // 10 minutes
      },
    },
  })

  await queryClient.prefetchQuery(context.params.slug, () =>
    getCourseContent(context.params.slug)
  )

  return {
    props: {
      slug: context.params.slug,
      // dehydratedState: dehydrate(queryClient),
      preview: context.preview ? true : null,
    }, // will be passed to the page component as props
    revalidate: 28800, // In seconds. False means page is cached until next build, 28800 = 8 hours
  }
}
export async function getStaticPaths(context: any) {
  // returns all pages that need to built at run time, ie no prebuilt paths
  return {
    paths: [], // anything not present inside will be built dynamically or return 404, if empty, all routes need to be checked in getStaticProps
    // fallback: false, // if false, will return 404 if page not in the paths array above
    // fallback: true, // if true, if page not in the paths array above, will run getStaticProps to gen page on request
    fallback: 'blocking', // doesnt send any props down and waits for getstaticprops to return before rendering page "no flashes of missing content". Con is only the 1st visitor will have a delay on pages. Use this most of the time unless getStaticProps is slow on first run (slow API calls, slow to build pages, etc)
  }
}
