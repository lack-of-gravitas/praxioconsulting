import { FC } from 'react'
import cn from 'clsx'
import { useRouter } from 'next/router'
import type { Page } from 'types/page'
import getSlug from '@lib/get-slug'
import { Logo } from '@components/atoms'
import { Container } from '@components/molecules'
import { Link } from '@components/atoms'

// import { I18nWidget } from '@components/common'
import s from './Footer.module.css'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 transition-colors duration-150 border-b lg:grid-cols-12 border-accent-2 text-primary bg-primary">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex items-center flex-initial font-bold md:mr-24">
                <span className="mr-2 border rounded-full border-accent-6">
                  <Logo />
                </span>
                <span>ACME</span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="transition duration-150 ease-in-out text-accent-9 hover:text-accent-6">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-start col-span-1 lg:col-span-2 lg:justify-end text-primary">
            <div className="flex items-center h-10 space-x-6">
              <a
                className={s.link}
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
              >
                github
              </a>
              {/* <I18nWidget /> */}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-6 pb-10 space-y-4 text-sm md:flex-row text-accent-6">
          <div>
            <span>&copy; 2020 ACME, Inc. All rights reserved.</span>
          </div>
          <div className="flex items-center text-sm text-primary">
            <span className="text-primary">Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
              className="text-primary"
            >
              Vercel
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer

// import Link from "next/link";
// import Image from "next/image";

// const Footer = ({ name, tagline, domain, themes, footer, socials }) => {
//   return (
//     <footer className="bg-white" aria-labelledby="footer-heading">
//       <h2 id="footer-heading" className="sr-only">
//         Footer
//       </h2>
//       <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
//         <div className="xl:grid xl:grid-cols-3 xl:gap-8">
//           <div className="space-y-8 xl:col-span-1">
//             {themes[0].logo ? (
//               <Image
//                 className="h-10"
//                 src={themes[0].logo.formats.xsmall.url}
//                 layout="intrinsic"
//                 height={themes[0].logo.formats.xsmall.height - 10}
//                 width={themes[0].logo.formats.xsmall.height - 10}
//                 alt={themes[0].logo.name}
//               />
//             ) : (
//               <>
//                 <Image
//                   className="block w-auto h-8 lg:hidden"
//                   src="https://via.placeholder.com/50/0891B2/E2E8F0?text=No+Image+Set"
//                   layout="intrinsic"
//                   height={48}
//                   width={48}
//                   alt=""
//                 />
//               </>
//             )}

//             <p className="text-lg text-gray-500">{tagline}</p>
//             {/* <div className="flex space-x-6">
//               <a
//                 href={socials[0].url}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <span className="sr-only">{socials[0].name}</span>
//                 <span aria-hidden="true">
//                   <svg
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </a>

//               {socials[1] && <a
//                 href={socials[1].url}
//                 className="text-gray-400 hover:text-gray-500"
//               >
//                 <span className="sr-only">{socials[1].name}</span>
//                 <span aria-hidden="true">
//                   <svg
//                     className="w-6 h-6"
//                     fill="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//               </a>}
//             </div> */}
//           </div>
//           <div
//             className={
//               `grid-cols-3 mt-12 grid gap-8 xl:mt-0 xl:col-span-2`
//             }
//           >
//             {footer.footerColumns.map((column) => {
//               return (
//                 <div key={column.title} className="space-y-5">
//                   <h3 className="font-semibold tracking-wider uppercase text-md text-primaryColor-700">
//                     {column.title}
//                   </h3>
//                   <ul className="space-y-4 smt-4">
//                     {column.links.map((link) => (
//                       <li key={link.label}>
//                         <a
//                           href={link.href}
//                           className="text-base text-gray-500 hover:text-primaryColor-700"
//                         >
//                           {link.label}
//                         </a>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//         <div className="pt-8 mt-12 border-t border-gray-200">
//           <p className="text-base text-gray-400 xl:text-center">
//             {footer.bottomText}
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// Footer.defaultProps = {};

// export default Footer;
