// // import delve from "dlv";
// import CTA from "./cta";
// import Logo from "./logo";
// import Nav from "./nav";
import Link from 'next/link'
import Image from 'next/image'
// import { signIn, signOut, useSession } from 'next-auth/react'
import cn from 'clsx'
// ui imports
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Menu as MenuIcon,
  Cross as CrossIcon,
  User as UserIcon,
} from '@components/atoms/Icons'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

export default function CourseHeader(data: any) {
  // const { data: session, status } = useSession()
  let { name, domain, header, slug, themes } = data

  slug !== '/' ? (slug = '/' + slug) : slug

  function DesktopLogo() {
    return (
      <>
        <Link className="flex items-stretch" href="/" passHref>
          <a className="flex items-center -my-px space-x-8 text-xl font-bold text-gray-800">
            {themes[0].logo ? (
              <>
                <Image
                  className="w-full h-8 pt-5 mr-6 rounded-xs"
                  // className="hidden w-auto h-8 lg:block"

                  src={themes[0].logo.formats.xsmall.url}
                  layout="intrinsic"
                  height={42}
                  width={42}
                  alt={themes[0].logo.name}
                />
              </>
            ) : (
              <>
                <Image
                  className="w-full h-10 pt-5 rounded-xs"
                  src="https://via.placeholder.com/64/0891B2/E2E8F0?text=No+Image+Set"
                  layout="intrinsic"
                  height={48}
                  width={48}
                  alt=""
                />
              </>
            )}
            <div className="items-center justify-end md:flex">
              <span className="text-base text-prose font-strong whitespace-nowrap">
                {name}
              </span>
            </div>
          </a>
        </Link>
      </>
    )
  }
  function DesktopMenuItems() {
    return (
      <>
        <div className="justify-end hidden sm:-my-px sm:ml-32 sm:flex sm:space-x-8">
          {/* {navigation.links.map((item: any, index: any) => (
            <Link href={item.href} key={index} passHref>
              <a
                // key={index}
                // href={item.href}
                className={cn(
                  item.href === slug
                    ? 'border-primaryColor-700 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                )}
                aria-current={item.href === slug ? 'page' : undefined}
              >
                {item.label}
              </a>
            </Link>
          ))} */}
        </div>
      </>
    )
  }

  function MobileMenuItems() {
    return (
      <Disclosure.Panel className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {/* {navigation.links.map((item: any, index: any) => (
            <Link href={item.href} key={index} passHref>
              <Disclosure.Button
                // key={index}
                as="a"
                // href={item.href}
                className={cn(
                  item.href === slug
                    ? 'bg-indigo-50 border-primaryColor-700 text-primaryColor-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
                  'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
                )}
                aria-current={item.href === slug ? 'page' : undefined}
              >
                {item.label}
              </Disclosure.Button>
            </Link>
          ))} */}
        </div>
      </Disclosure.Panel>
    )
  }

  return (
    <>
      <header>
        <noscript>
          <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
        </noscript>

        {/* <div className="min-h-full ">
          <Disclosure as="nav" className="bg-white border-b border-gray-200">
            {({ open }) => (
              <>
                <div className="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                    <div className="flex flex-wrap">
                      <div className="flex items-center flex-shrink-0">
                    
                        <DesktopLogo />
                      </div>
                      <div className="flex ">
                        <DesktopMenuItems />
                      </div>
                    </div>
                  </div>
                </div>

                <MobileMenuItems />
              </>
            )}
          </Disclosure>
        </div> */}
      </header>
    </>
  )
}
