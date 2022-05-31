import { FC } from 'react'
import cn from 'clsx'
import { useRouter } from 'next/router'
import type { Page } from 'types/page'
import getSlug from '@lib/get-slug'
import { Logo } from '@components/atoms'
import { Container } from '@components/molecules'
import { Link } from '@components/atoms'
// import Image from "next/image";
// import { I18nWidget } from '@components/common'

const Footer = ({ data }: any) => {
  const footer = {
    footerColumns: {
      marketing: [
        { title: 'Marketing', label: 'Marketing', href: '#' },
        { name: 'Analytics', href: '#' },
        { name: 'Commerce', href: '#' },
        { name: 'Insights', href: '#' },
      ],
      support: [
        { name: 'Pricing', href: '#' },
        { name: 'Documentation', href: '#' },
        { name: 'Guides', href: '#' },
        { name: 'API Status', href: '#' },
      ],
      company: [
        { name: 'About', href: '#' },
        { name: 'Blog', href: '#' },
        { name: 'Jobs', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Partners', href: '#' },
      ],
      legal: [
        { name: 'Claim', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' },
      ],
    },
  }

  console.log(data)
  return (
    <>
      <footer className="bg-white" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <Link href="/">
                <a className="flex items-center flex-initial font-bold md:mr-24">
                  <span className="mr-2 border rounded-full border-accent-6">
                    <Logo />
                  </span>
                  <span>{'ACME PTY LTD'}</span>
                </a>
              </Link>

              {/* <p className="text-lg text-gray-500">{data.tagline}</p> */}
            </div>
            <div
              className={`grid-cols-3 mt-12 grid gap-8 xl:mt-0 xl:col-span-2`}
            >
              {/* {footer?.footerColumns.map((column: any) => {
                return (
                  <div key={column.title} className="space-y-5">
                    <h3 className="font-semibold tracking-wider uppercase text-md text-primaryColor-700">
                      {column.title}
                    </h3>
                    <ul className="space-y-4 smt-4">
                      {column.links.map((link: any) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="text-base text-gray-500 hover:text-primaryColor-700"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })} */}
            </div>
          </div>
          <div className="pt-8 mt-12 border-t border-gray-200">
            <p className="text-base text-gray-400 xl:text-center">
              {'© 2022, All rights reserved'}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
export default Footer

// function usePages(pages?: Page[]) {
//   const { locale } = useRouter()
//   const sitePages: Page[] = []

//   if (pages) {
//     pages.forEach((page) => {
//       const slug = page.url && getSlug(page.url)
//       if (!slug) return
//       if (locale && !slug.startsWith(`${locale}/`)) return
//       sitePages.push(page)
//     })
//   }

//   return {
//     sitePages: sitePages.sort(bySortOrder),
//   }
// }

// Sort pages by the sort order assigned in the BC dashboard
// function bySortOrder(a: Page, b: Page) {
//   return (a.sort_order ?? 0) - (b.sort_order ?? 0)
// }
