import { FC, Fragment } from 'react'
import Link from 'next/link'
import { Logo as DefaultLogo } from '@components/atoms'
import Image from 'next/image'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
  Menu as MenuIcon,
  Plus as PlusIcon,
  Cross as CrossIcon,
} from '@components/atoms/Icons'
import { useRouter } from 'next/router'

export default function Navbar({ data, colors }: any) {
  // console.log('navbar:', data)

  return (
    <>
      {data && (
        <Disclosure as="nav" className="bg-white shadow">
          {({ open }) => (
            <>
              <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                  <div className="flex">
                    {/* Mobile menu button */}
                    <div className="flex items-center mr-2 -ml-2 md:hidden">
                      <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-xs hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <CrossIcon
                            className="block w-6 h-6"
                            style={{
                              color: data.accentColor
                                ? data.accentColor
                                : '#FFA439',
                            }}
                            aria-hidden="true"
                          />
                        ) : (
                          <MenuIcon
                            className="block w-6 h-6"
                            style={{
                              color: data.accentColor
                                ? data.accentColor
                                : '#FFA439',
                            }}
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0">
                      <Link href="/">
                        <a className="flex items-center flex-initial font-bold md:mr-24">
                          <span className="flex mr-2">
                            {data.darkLogo ? (
                              <></>
                            ) : (
                              <span className="flex">
                                {data.name ? data.name : 'ACME'}
                              </span>
                            )}
                          </span>
                        </a>
                      </Link>

                      {/* <img
                      className="block w-auto h-8 lg:hidden"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden w-auto h-8 lg:block"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    /> */}
                    </div>
                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:space-x-8">
                      {data.header?.map(({ id, item, collection }: any) => {
                        let coll = ''

                        switch (collection) {
                          case 'Posts':
                            coll = 'blog/'
                            break
                          case 'Products':
                            coll = item.type + 's/'
                            break
                        }

                        return (
                          <Link
                            key={id}
                            href={
                              ((item.slug === 'home' || item.slug === '') &&
                                '/') ||
                              (collection === 'CustomLinks'
                                ? item.slug
                                : '/' + coll + item.slug)
                            }
                            passHref
                            className="cursor-pointer"
                          >
                            <a
                              // style={{
                              //   borderColor: data.accentColor
                              //     ? data.accentColor
                              //     : '#FFA439',
                              // }}
                              className="inline-flex items-center px-2 pt-1 text-sm font-medium text-gray-800 "
                            >
                              <span>{item.name}</span>
                            </a>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex items-center">
                    {/* Sign In Button */}
                    {false && (
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          style={{
                            backgroundColor: data.accentColor
                              ? data.accentColor
                              : '#FFA439',
                          }}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white border border-transparent shadow-sm rounded-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <PlusIcon
                            className="w-5 h-5 mr-2 -ml-1"
                            aria-hidden="true"
                          />
                          <span>Sign In</span>
                        </button>
                      </div>
                    )}
                    {/* Profile dropdown */}
                    {false && (
                      <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="w-8 h-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white shadow-lg rounded-xs ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }: any) => (
                                  <a
                                    href="#"
                                    className={
                                      // classNames(
                                      // active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                      // )
                                    }
                                  >
                                    Your Profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }: any) => (
                                  <a
                                    href="#"
                                    className={
                                      // classNames(
                                      // active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                      // )
                                    }
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }: any) => (
                                  <a
                                    href="#"
                                    className={
                                      // classNames(
                                      // active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                      // )
                                    }
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                {/* Menu Options Mobile  */}
                <div className="pt-2 pb-3 space-y-1">
                  {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}

                  {data.header?.map(({ id, item, collection }: any) => {
                    let coll = ''

                    switch (collection) {
                      case 'Posts':
                        coll = 'blog/'
                        break
                      case 'Products':
                        coll = item.type + 's/'
                        break
                    }

                    return (
                      <Disclosure.Button
                        key={id}
                        as="a"
                        href={
                          ((item.slug === 'home' || item.slug === '') && '/') ||
                          (collection === 'CustomLinks'
                            ? item.slug
                            : '/' + coll + item.slug)
                        }
                        className="block py-2 pl-3 pr-4 text-base font-medium text-gray-700 border-l-4 cursor-pointer sm:pl-5 sm:pr-6"
                      >
                        <span>{item.name}</span>
                      </Disclosure.Button>
                    )
                  })}
                </div>
                {/* Profile Mobile */}
                {true && (
                  <div className="pt-4 pb-3 border-t border-gray-200">
                    <div className="flex items-center px-4 sm:px-6">
                      <div className="flex-shrink-0">
                        <img
                          className="w-10 h-10 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          Tom Cook
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          tom@example.com
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                      >
                        Your Profile
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                      >
                        Settings
                      </Disclosure.Button>
                      <Disclosure.Button
                        as="a"
                        href="#"
                        className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100 sm:px-6"
                      >
                        Sign out
                      </Disclosure.Button>
                    </div>
                  </div>
                )}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}
    </>
  )
}
