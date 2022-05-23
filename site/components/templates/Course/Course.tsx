import { SEO } from '@components/atoms'
import dynamic from 'next/dynamic'

import cn from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
// import { signOut, getSession, useSession } from 'next-auth/react'
import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Dialog, Menu, Transition } from '@headlessui/react'
import {
  Collection as CollectionIcon,
  Logout as LogoutIcon,
  Academic as AcademicCapIcon,
  Menu as MenuIcon,
  User as UserIcon,
  Cross as CrossIcon,
} from '@components/atoms/Icons'

// const CourseHeader = dynamic(() => import('../../organisms/CourseHeader'))
// const CourseFooter = dynamic(() => import('../../organisms/CourseFooter'))
// const MainContent = dynamic(() => import('./blocks/CourseContent/mainContent'))

const Course = ({ header, course, children, preview }: any) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  //   const { data: session, status } = useSession()
  const { themes, navigation } = header

  const [activeContent, setActiveContent] = useState(null)
  const [modules, setModules] = useState()

  // useEffect
  useEffect(() => {
    // console.log("CourseLayout content | ", course);
    setModules(course.modules)
    // setActiveContent(modules[0].contents[0]);
    // console.log("CourseLayout activeContent | ", activeContent);
  })

  // if moron business users havent set content items for modules
  if (course.contentExists === false) {
    return (
      <div className="min-h-full px-4 py-16 bg-white sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="text-center">
                <p className="text-2xl font-bold tracking-wide text-primaryColor-700">
                  Oops!
                </p>
                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                  Content not available.
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Sorry, we couldn’t find the content you selected. If you think
                  this is a mistake, please contact us.
                </p>
                <div className="mt-6">
                  <a
                    href="/"
                    className="text-base font-medium text-primaryColor-600 hover:text-primaryColor-500"
                  >
                    Go home
                    <span aria-hidden="true"> &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* <Seo seo={seo} /> */}
      {/* {preview && <Banner />} */}

      {/* <CourseHeader {...header} slug={slug} /> */}

      <>
        <div>
          {/* Mobile Sidebar */}
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 z-50 flex md:hidden"
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
                <Dialog.Overlay className="fixed inset-0 bg-gray-800 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-700">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 pt-2 -mr-12">
                      <button
                        type="button"
                        className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <CrossIcon
                          className="w-10 h-10 text-primaryColor-500 "
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>

                  {/* Course Heading */}
                  <div className="flex flex-wrap items-center flex-shrink-0 h-16 px-4 prose text-primaryColor-500 prose-xs">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                    <span className="ml-2 text-lg font-bold tracking-tight text-primaryColor-500 sm:text-xl">
                      {course.name}
                    </span>
                  </div>

                  <div className="flex-1 h-0 mt-5 overflow-y-auto">
                    <nav className="px-2 space-y-1">
                      {/* {modules?.map((module: any) =>
                        !module.contents ? (
                          <div key={module.title}>
                            <a
                              className={cn(
                                module.current
                                  ? 'bg-gray-900 text-white'
                                  : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'group flex items-center px-2 py-2 text-base font-medium rounded-sm  cursor-pointer'
                              )}
                              onClick={(e) => {
                                e.preventDefault()
                                // no children so should return sad face

                                setActiveContent(module)
                                // setSidebarOpen(false);
                              }}
                            >
                              {module.title}
                            </a>
                          </div>
                        ) : (
                          <Disclosure
                            as="div"
                            key={module.title}
                            className="space-y-1"
                          >
                            {({ open }) => (
                              <>
                                <Disclosure.Button
                                  className={cn(
                                    module.current
                                      ? 'bg-primaryColor-700 text-white'
                                      : ' text-white hover:bg-gray-50 hover:text-gray-900',
                                    'group w-full flex items-center pr-2 py-2 text-left text-md font-bold rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor-800'
                                  )}
                                >
                                  <svg
                                    className={cn(
                                      open
                                        ? 'text-gray-400 rotate-90'
                                        : 'text-gray-300',
                                      'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                    )}
                                    viewBox="0 0 20 20"
                                    aria-hidden="true"
                                  >
                                    <path
                                      d="M6 6L14 10L6 14V6Z"
                                      fill="currentColor"
                                    />
                                  </svg>
                                  {module.title}
                                </Disclosure.Button>
                                <Disclosure.Panel className="space-y-1">
                                  {module.contents.map((subItem: any) => (
                                    <button
                                      type="button"
                                      key={subItem.title}
                                      // as="a"
                                      className="flex items-center w-full py-2 pl-10 pr-2 text-sm font-light text-white rounded-sm group hover:text-gray-900 hover:bg-gray-50"
                                      onClick={(e) => {
                                        e.preventDefault()
                                        setActiveContent(subItem)
                                        setSidebarOpen(false)
                                      }}
                                    >
                                      {subItem.title}
                                    </button>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        )
                      )} */}
                    </nav>

                    <div className="flex flex-shrink-0 p-4 mt-5 border-t border-primaryColor-800">
                      <Link href="/user/profile" passHref>
                        <a className="flex-shrink-0 block w-full group">
                          <div className="flex items-center">
                            <div>
                              {/* {session?.user?.image ? (
                                <Image
                                  className="inline-block rounded-full h-9 w-9"
                                  src={session.user.image}
                                  layout="intrinsic"
                                  height={32}
                                  width={32}
                                  alt=""
                                />
                              ) : (
                                <>
                                  <UserIcon className=" h-9 w-9 text-primaryColor-700" />
                                </>
                              )} */}
                            </div>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-white">
                                {/* {session?.user?.name || session?.user?.email} */}
                              </p>

                              <span className="text-xs font-medium text-primaryColor-200 group-hover:text-white">
                                View Account
                              </span>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </div>
                    <div className="flex flex-shrink-0 pb-3 ml-3">
                      <button
                        type="button"
                        className="flex-wrap items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-sm shadow-sm bg-primaryColor-700 hover:bg-primaryColor-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-500"
                        // href={`/api/auth/signout`}
                        onClick={(e) => {
                          e.preventDefault()
                          //   signOut({ callbackUrl: '/' })
                        }}
                      >
                        <LogoutIcon className="inline h-6 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Desktop Sidebar */}
          <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col flex-1 min-h-0 bg-gray-800">
              <div className="flex flex-wrap items-center h-16 px-4 prose text-primaryColor-500 flex-shrink-0k prose-xs ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
                <span className="ml-2 font-bold tracking-tight text-primaryColor-500 text-md sm:text-xl">
                  {course.name}
                </span>
              </div>

              <div className="flex flex-col flex-1 overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1 cursor-pointer">
                  {/* {modules?.map((module: any) =>
                    !module.contents ? (
                      <div key={module.title}>
                        <a
                          className={cn(
                            module.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-sm cursor-pointer'
                          )}
                          onClick={(e) => {
                            // console.log(module);
                            e.preventDefault()
                            setActiveContent(module)
                            // setSidebarOpen(false);
                          }}
                        >
                          {module.title}
                        </a>
                      </div>
                    ) : (
                      <Disclosure
                        as="div"
                        key={module.title}
                        className="space-y-1"
                      >
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={cn(
                                module.current
                                  ? 'bg-primaryColor-700 text-white'
                                  : ' text-white hover:bg-gray-50 hover:text-gray-900',
                                'group w-full flex items-center pr-2 py-2 text-left text-prose font-bold rounded-sm focus:outline-none focus:ring-2 focus:ring-primaryColor-800'
                              )}
                            >
                              <svg
                                className={cn(
                                  open
                                    ? 'text-gray-400 rotate-90'
                                    : 'text-gray-300',
                                  'mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150'
                                )}
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6 6L14 10L6 14V6Z"
                                  fill="currentColor"
                                />
                              </svg>
                              {module.title}
                            </Disclosure.Button>
                            <Disclosure.Panel className="space-y-1">
                              {module.contents.map((subItem: any) => (
                                <a
                                  key={subItem.title}
                                  //   as="a"
                                  className="flex items-center w-full py-2 pl-10 pr-2 font-light text-white rounded-sm text-prose group hover:text-gray-900 hover:bg-gray-50"
                                  onClick={(e) => {
                                    e.preventDefault()
                                    // console.log(subItem);
                                    setActiveContent(subItem)

                                    // setSidebarOpen(false);
                                  }}
                                >
                                  {subItem.title}
                                </a>
                              ))}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    )
                  )} */}
                </nav>

                {/* User Section */}
                <div className="flex flex-shrink-0 p-4 border-t border-primaryColor-800">
                  <Link href="/user/profile" passHref>
                    <a className="flex-shrink-0 block w-full group">
                      <div className="flex items-center">
                        <div>
                          {/* {session?.user?.image ? (
                            <Image
                              className="inline-block rounded-full h-9 w-9"
                              layout="intrinsic"
                              src={session.user.image}
                              height={32}
                              width={32}
                              alt=""
                            />
                          ) : (
                            <>
                              <UserIcon className=" h-9 w-9 text-primaryColor-700" />
                            </>
                          )} */}
                        </div>

                        <div className="ml-3">
                          <p className="text-sm font-medium text-white">
                            {/* {session?.user?.name || session?.user?.email} */}
                          </p>

                          <span className="text-xs font-medium text-primaryColor-200 group-hover:text-white">
                            View Account
                          </span>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex flex-shrink-0 pb-3 ml-3">
                  <button
                    type="button"
                    className="flex-wrap items-center px-4 py-2 text-sm font-medium text-white border border-transparent rounded-sm shadow-sm bg-primaryColor-700 hover:bg-primaryColor-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-500"
                    // href={`/api/auth/signout`}
                    onClick={(e) => {
                      e.preventDefault()
                      //   signOut({ callbackUrl: '/' })
                    }}
                  >
                    <LogoutIcon className="inline h-6 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* main area */}
          <div className="flex flex-col md:pl-64">
            <Disclosure as="nav" className="z-50 bg-gray-800">
              {({ open }) => (
                <>
                  <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}

                        <div className="inline-flex items-center justify-center p-2 text-gray-400 rounded-sm hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                          <button
                            type="button"
                            className="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primaryColor-500 md:hidden"
                            onClick={() => setSidebarOpen(true)}
                          >
                            <span className="sr-only">Open sidebar</span>
                            <AcademicCapIcon
                              className="w-10 h-10 text-primaryColor-600"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                        <div className="flex items-center flex-shrink-0">
                          {themes[0].logo ? (
                            <Image
                              className="block w-auto h-8 invert lg:hidden"
                              src={themes[0].logo.formats.xsmall.url}
                              layout="intrinsic"
                              height={themes[0].logo.formats.xsmall.height - 15}
                              width={themes[0].logo.formats.xsmall.height - 15}
                              alt={themes[0].logo.name}
                            />
                          ) : (
                            <>
                              <Image
                                className="block w-auto h-8 lg:hidden"
                                src="https://via.placeholder.com/50/0891B2/E2E8F0?text=No+Image+Set"
                                layout="intrinsic"
                                height={48}
                                width={48}
                                alt=""
                              />
                            </>
                          )}
                        </div>
                        <div className="hidden align-middle sm:block sm:ml-6">
                          <div className="flex items-center mt-3 space-x-4 align-middle prose-invert">
                            {navigation.links.map((item: any) => (
                              <Link href={item.href} key={item.href} passHref>
                                <a
                                  //   key={item.name}
                                  //   href={item.href}
                                  className="inline-flex items-center px-3 pt-1 text-base font-medium align-middle border-b-2 border-transparent text-primaryColor-500 hover:border-primaryColor-300 hover:text-white-700"
                                  // aria-current={
                                  //   item.href === slug ? "page" : undefined
                                  // }
                                >
                                  {/* <item.icon
                            className={cn(
                              item.current
                                ? "text-gray-300"
                                : "text-gray-400 group-hover:text-gray-300",
                              "mr-4 flex-shrink-0 h-6 w-6"
                            )}
                            aria-hidden="true"
                          /> */}
                                  {item.label}
                                </a>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>

                              {/* {session?.user?.image ? (
                                <Image
                                  className="inline-block rounded-full h-9 w-9"
                                  layout="intrinsic"
                                  src={session.user.image}
                                  height={32}
                                  width={32}
                                  alt=""
                                />
                              ) : (
                                <>
                                  <UserIcon className=" h-9 w-9 text-primaryColor-700" />
                                </>
                              )} */}
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }: any) => (
                                  <Link href="/user/profile" passHref>
                                    <a
                                      className={cn(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      Account
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                              {/* <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={cn(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item> */}
                              <Menu.Item>
                                {({ active }: any) => (
                                  <Link href={`/api/auth/signout`} passHref>
                                    <a
                                      className={cn(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                      onClick={(e) => {
                                        e.preventDefault()
                                        // signOut()
                                      }}
                                    >
                                      Sign out
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Disclosure>

            <main className="flex-1">
              <div className="py-6">
                <div className="max-w-full px-4 mx-auto sm:px-6 md:px-8">
                  <div className="py-4">
                    {activeContent ? (
                      <>{/* <MainContent data={activeContent} /> */}</>
                    ) : (
                      <>
                        <div className="flex flex-col pt-16 pb-12 bg-white ">
                          <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                            <div className="py-16">
                              <div className="text-center">
                                <p className="text-2xl font-bold tracking-wide text-primaryColor-700">
                                  Hi there, welcome to the Course.
                                </p>
                                <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                                  Select a module to start
                                </h1>
                                <p className="mt-2 text-base text-gray-500">
                                  Select from one of the Modules (Hint: it's the
                                  Hat Icon) to view and access the content.
                                </p>
                                <div className="mt-6">
                                  <a
                                    href="/"
                                    className="text-base font-medium text-primaryColor-600 hover:text-primaryColor-500"
                                  >
                                    Home Page
                                    <span aria-hidden="true"> &rarr;</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </main>
                        </div>
                      </>
                    )}
                  </div>
                  {/* /End replace */}
                </div>
              </div>
            </main>
          </div>
        </div>
      </>

      {/* <CourseFooter {...header} /> */}
    </div>
  )
}

export default Course
