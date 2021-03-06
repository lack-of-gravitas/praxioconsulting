import dynamic from 'next/dynamic'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { PageNotFound } from '@components/templates'
import { getCourseContent, getPage } from '@lib/queries'
import ReactPlayer from 'react-player/lazy'
import {
  Menu as MenuIcon,
  Plus as PlusIcon,
  Cross as CrossIcon,
} from '@components/atoms/Icons'
import Image from 'next/image'

import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Dialog, Transition, Menu } from '@headlessui/react'
import Link from 'next/link'
import { future } from 'tailwind.config'
import { ProseGeneral } from '@components/molecules'
import { link } from 'fs'

const tabs = [
  { name: 'Files & Links', href: '#', current: true },
  { name: 'Notes', href: '#', current: false },
  { name: 'Transcript', href: '#', current: false },
]

const Layout = dynamic(
  () => import('@components/templates/_courseLayout/Layout')
)
const DefaultLogo = dynamic(() => import('@components/atoms/Logo/Logo'))

export default function Content({ slug, preview }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const [activeContent, setActiveContent]: any = useState()
  const [activeExtraContent, setActiveExtraContent]: any =
    useState('Files & Links')

  let results: any = useQueries([
    {
      queryKey: slug,
      queryFn: () => getCourseContent(slug),
      cacheTime: Infinity,
    },
    { queryKey: 'home', queryFn: () => getPage('home'), cacheTime: Infinity },
  ])

  if (!results[0].isFetching && !results[1].isFetching) {
    // console.log(slug, ': ', results[0].data)
    let { modules } = results[0].data
    let { darkLogo } = results[1].data

    const Logo = () => {
      return (
        <div className="flex items-center flex-shrink-0 px-4">
          <Link className="cursor-auto" passHref href="/">
            <a className="flex items-center flex-initial font-bold md:mr-24">
              <span className="flex mr-2">
                {darkLogo ? (
                  <>
                    <DefaultLogo className="w-auto h-8" />
                  </>
                ) : (
                  <span className="flex">
                    {results[1].data.name ? results[1].data.name : 'ACME'}
                  </span>
                )}
              </span>
            </a>
            {/* <img
                      className="w-auto h-8"
                      src="https://tailwindui.com/img/logos/easywire-logo-purple-600-mark-gray-900-text.svg"
                      alt="Easywire"
                    /> */}
          </Link>
        </div>
      )
    }

    const HomeLink = () => {
      return (
        <>
          <Link className="cursor-auto" passHref href="/">
            <a className="flex items-center px-3 py-2 font-medium prose text-gray-600 border-l-4 border-transparent text-prose group hover:text-gray-900 hover:bg-gray-50">
              <span
                aria-hidden="true"
                className="w-6 h-6 mr-4 text-gray-400 group-hover:text-gray-500 material-symbols-outlined"
              >
                home
              </span>
              Home
            </a>
          </Link>
        </>
      )
    }

    const ProfileLink = () => {
      return (
        <>
          <div className="flex flex-shrink-0 p-4 border-t border-gray-200">
            <Link className="cursor-auto" passHref href="#">
              <a className="flex-shrink-0 block group">
                <div className="flex text-sm bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <Image
                    className="inline-block w-10 h-10 rounded-xs"
                    src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    layout="intrinsic"
                    width={48}
                    height={48}
                    alt={''}
                  />

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
            </Link>
          </div>
        </>
      )
    }

    const CourseMenu = () => {
      return (
        <>
          {modules.map((module: any) =>
            !module.item.content ? (
              <div key={module.item.name}>
                <a
                  href={module.item.href}
                  className={classNames(
                    module.item.current
                      ? 'bg-gray-300 text-gray-900'
                      : ' text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'ml-3 pr-5 leading-snug group w-full flex items-center pl-7 py-2 text-sm rounded-xs font-semibold prose prose-lg lg:prose-base lg:font-medium'
                  )}
                >
                  {module.item.name}
                </a>
              </div>
            ) : (
              <Disclosure as="div" key={module.item.name} className="space-y-1">
                {({ open }) => (
                  <>
                    <Disclosure.Button
                      className={classNames(
                        module.item.current
                          ? 'bg-gray-300 text-gray-900'
                          : ' text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                        'ml-3 leading-snug group w-full flex items-center pr-5 py-2 text-left rounded-xs focus:outline-none focus:ring-1 focus:bg-gray-200 font-semibold prose prose-lg lg:prose-base lg:font-medium'
                      )}
                    >
                      <svg
                        className={classNames(
                          open ? 'text-gray-600 rotate-90' : 'text-gray-600',
                          'mr-2 flex-shrink-0 h-6 w-6 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                        )}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                      >
                        <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                      </svg>
                      {module.item.name}
                    </Disclosure.Button>
                    <Disclosure.Panel className="space-y-1">
                      {module.item.content.map((subItem: any) => (
                        <Disclosure.Button
                          key={subItem.item.name}
                          as="a"
                          className="flex items-center w-full py-2 pl-10 pr-2 text-sm font-normal text-gray-600 cursor-pointer rounded-xs group hover:text-gray-900 hover:bg-gray-50"
                          onClick={(e: any) => {
                            e.preventDefault()
                            setActiveContent(subItem)
                            setActiveExtraContent('Files & Links')
                          }}
                        >
                          {subItem.item.name}
                        </Disclosure.Button>
                      ))}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            )
          )}
        </>
      )
    }

    const CourseHeading = () => {
      return (
        <>
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

            <div className="px-4 pt-5 pb-16 md:bg-white sm:px-6 md:px-0 z-99">
              <h1 className="text-xl font-extrabold text-gray-900 md:text-2xl ">
                {results[0].data.name}
              </h1>

              <p className="hidden max-w-4xl pb-6 mt-2 text-sm text-gray-500 md:bg-white md:block">
                {results[0].data.description}
              </p>
            </div>
          </div>
        </>
      )
    }

    const Video = () => {
      return (
        <>
          <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
            <div className="overflow-hidden max-h-max aspect-w-16 aspect-h-9">
              <ReactPlayer
                controls={true}
                className="react-player"
                url={activeContent.item.video} // "https://www.youtube.com/watch?v=x_rDFa6kZfI" //{JSON.parse(data.video).url} //
                width="100%"
                height="100%"
              />
            </div>
          </div>

          <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
            <h1 className="font-extrabold tracking-tight prose-2xl text-gray-900 sm:prose-xl">
              {activeContent.name}
            </h1>

            <p className="py-10 text-base text-gray-900 lg:py-5">
              {activeContent.description}
            </p>
          </div>
        </>
      )
    }

    return (
      <>
        {/* Static sidebar for mobile */}
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

                  <Logo />

                  <div className="flex-1 h-0 mt-5 overflow-y-auto">
                    <nav className="flex flex-col h-full">
                      <CourseMenu />
                      <div className="pt-10 mt-auto space-y-1">
                        <ProfileLink />
                        <HomeLink />
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
          <nav className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto border-r border-gray-200 bg-gray-50">
            <Logo />
            <div className="flex-grow mt-5">
              <CourseMenu />
            </div>
            <div className="flex-shrink-0 block w-full">
              <ProfileLink />
              <HomeLink />
            </div>
          </nav>
        </div>

        {/* Content area */}
        <div className="md:pl-64">
          <div className="flex flex-col max-w-4xl mx-auto md:px-8 xl:px-0">
            {/* Course Heading */}
            <CourseHeading />
            {/* Main Content Area */}
            <main className="flex-1">
              <div className="relative max-w-4xl px-4 pb-16 mx-auto md:px-8 xl:px-0 md:pt-10 sm:px-6 md:py-6">
                {activeContent ? (
                  <>
                    <Video />

                    <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Additional Content
                      </h3>
                      <p className="max-w-2xl text-sm text-gray-500">
                        Bonus content, show notes and transcripts are located
                        here. Check back from time to time as we add more
                        material to this Course.
                      </p>
                    </div>

                    <div className="max-w-2xl px-4 pt-5 mx-auto pb-auto lg:hidden ">
                      <label htmlFor="selected-tab" className="sr-only">
                        Select a tab
                      </label>
                      <select
                        id="selected-tab"
                        name="selected-tab"
                        className="block w-full py-2 pl-3 pr-10 mt-1 text-base border-gray-300 rounded-xs focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        onChange={(e: any) => {
                          e.preventDefault()
                          setActiveExtraContent(e.target.value)
                          // console.log(e.target.value)
                        }}
                      >
                        {tabs.map((tab) => (
                          <option key={tab.name}>{tab.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="hidden px-5 mx-auto lg:block pb-auto">
                      <div className="border-b border-gray-200">
                        <nav className="flex -mb-px space-x-8">
                          {tabs.map((tab) => (
                            <a
                              key={tab.name}
                              className={classNames(
                                tab.name === activeExtraContent
                                  ? 'border-purple-500 text-purple-600'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'cursor-pointer whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
                              )}
                              aria-current={tab.current ? 'page' : undefined}
                              onClick={(e: any) => {
                                e.preventDefault()
                                setActiveExtraContent(tab.name)
                              }}
                            >
                              {tab.name}
                            </a>
                          ))}
                        </nav>
                      </div>
                    </div>

                    {activeExtraContent === 'Files & Links' && (
                      <dl className="grid max-w-2xl grid-cols-1 px-4 pt-10 mx-auto mt-4 pb-auto sm:px-6 lg:max-w-7xl lg:py-5 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                        {activeContent.item.links.map((link: any) => {
                          return (
                            <>
                              {link.collection === 'directus_files' ? (
                                <a
                                  className="cursor-pointer"
                                  download={link.item.title}
                                  href={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${link.item.id}?download`}
                                >
                                  <div className="hover:bg-gray-200">
                                    <dt className="font-medium text-gray-900">
                                      {link.item.title}
                                    </dt>

                                    <dd className="mt-2 text-sm text-gray-500">
                                      <span className="font-semibold">
                                        Download
                                      </span>
                                      <span className="align-text-bottom material-symbols-outlined">
                                        file_download
                                      </span>
                                    </dd>
                                  </div>
                                </a>
                              ) : (
                                <Link
                                  className="cursor-pointer"
                                  key={link.item.id}
                                  passHref
                                  href={
                                    link.collection === 'Posts'
                                      ? `/blog/${link.item.slug}`
                                      : link.item.slug
                                  }
                                  prefetch={false}
                                >
                                  <a target="_blank" rel="noopener noreferrer">
                                    <div className=" hover:bg-gray-200">
                                      <dt className="font-medium text-gray-900">
                                        {link.item.name}
                                      </dt>
                                      <dd className="mt-2 text-sm text-gray-500">
                                        {link.item.description}
                                      </dd>

                                      <dd className="mt-2 text-sm text-gray-500">
                                        <span className="font-semibold">
                                          Visit
                                        </span>
                                        <span className="align-text-bottom material-symbols-outlined">
                                          arrow_outward
                                        </span>
                                      </dd>
                                    </div>
                                  </a>
                                </Link>
                              )}
                            </>
                          )
                        })}
                      </dl>
                    )}

                    {activeExtraContent != 'Files & Links' && (
                      <>
                        <div className="max-w-2xl px-4 pt-10 mx-auto pb-auto sm:px-6 lg:max-w-7xl lg:py-5 ">
                          <ProseGeneral
                            className="max-w-2xl text-sm text-gray-500"
                            content={
                              activeExtraContent === 'Notes'
                                ? activeContent.item.notes
                                : activeContent.item.transcript
                            }
                          />
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex flex-col pt-16 pb-12 bg-white ">
                      <main className="flex-col justify-center flex-grow w-full px-4 py-16 mx-auto text-center first-letter:flex max-w-7xl sm:px-6 lg:px-8">
                        <p className="text-2xl font-bold tracking-wide ">
                          <span>Hi there, welcome to the course.</span>
                        </p>

                        <p className="mt-2 text-base text-gray-500">
                          Select from one of the Modules to view and access the
                          content.
                        </p>
                      </main>
                    </div>
                  </>
                )}
              </div>
            </main>
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
