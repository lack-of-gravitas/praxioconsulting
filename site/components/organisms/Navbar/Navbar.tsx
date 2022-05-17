import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Logo } from '@components/atoms'
import { Container } from '@components/molecules'
import { UserNav } from '@components/organisms'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
}

const Navbar: FC<NavbarProps> = ({ links }) => (
  <NavbarRoot>
    <Container clean className="px-6 mx-auto max-w-8xl">
      <div className={s.nav}>
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
          <nav className={s.navMenu}>
            <Link href="/search">
              <a className={s.link}>All</a>
            </Link>
            {links?.map((l) => (
              <Link href={l.href} key={l.href}>
                <a className={s.link}>{l.label}</a>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </div>
    </Container>
  </NavbarRoot>
)

export default Navbar

// // // import delve from "dlv";
// // import CTA from "./cta";
// // import Logo from "./logo";
// // import Nav from "./nav";
// import Link from 'next/link'
// import Image from 'next/image'
// // import { signIn, signOut, useSession } from 'next-auth/react'
// import cn from 'clsx'
// // ui imports
// import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { BellIcon, MenuIcon, XIcon, UserIcon } from '@heroicons/react/outline'

// const userNavigation = [
//   // { name: "Your Profile", href: "#" },
//   { name: 'Account', href: '/user/profile' },
//   // { name: "Billing", href: "/user/profile" },
// ]

// export default function Navigation(data) {
//   const { data: session, status } = useSession()
//   // console.log("sesson:", session, "status", status);

//   // console.log("navigation --", data);
//   let { name, domain, navigation, slug, themes } = data

//   slug !== '/' ? (slug = '/' + slug) : slug

//   function SiteLogo() {
//     return (
//       <div className="flex items-center space-x-2">
//         <Link href="/" passHref>
//           <a className="text-2xl font-bold text-gray-800">
//             {themes[0].logo ? (
//               <>
//                 <Image
//                   className="w-full pt-5 rounded-lg"
//                   src={
//                     themes[0].logo.formats.xsmall
//                       ? themes[0].logo.formats.thumbnail.url
//                       : themes[0].logo.formats.xsmall.url
//                   }
//                   layout="responsive"
//                   height={
//                     themes[0].logo.formats.xsmall
//                       ? themes[0].logo.formats.thumbnail.height
//                       : themes[0].logo.formats.xsmall.height
//                   }
//                   width={
//                     themes[0].logo.formats.xsmall
//                       ? themes[0].logo.formats.thumbnail.width
//                       : themes[0].logo.formats.xsmall.height
//                   }
//                   alt={themes[0].logo.name}
//                   priority // largest contentful paint element so prioritises load
//                 />
//               </>
//             ) : (
//               <>
//                 <span className="block text-gray-800">{name}</span>

//                 <Image
//                   className="w-full rounded-lg"
//                   src="https://via.placeholder.com/64/0891B2/E2E8F0?text=No+Image+Set"
//                   layout="responsive"
//                   height={64}
//                   width={64}
//                   alt=""
//                 />
//                 {/* <Image src="/images/logo.png" alt={name} className="h-8" /> */}
//               </>
//             )}
//             {/* </figure> */}

//             {/* <Image src="/images/logo.png" className="h-8" /> */}
//           </a>
//         </Link>
//       </div>
//     )
//   }
//   function MobileLogo() {
//     return (
//       <>
//         <Image
//           className="block w-auto h-8 lg:hidden"
//           src="https://tailwindui.com/img/logos/workflow-mark-primaryColor-700.svg"
//           alt="Workflow"
//         />
//       </>
//     )
//   }
//   function DesktopLogo() {
//     return (
//       <>
//         <Link className="flex items-stretch" href="/" passHref>
//           <a className="text-xl font-bold text-gray-800 sm:-my-px sm:ml-32 sm:flex sm:space-x-8">
//             {themes[0].logo ? (
//               <>
//                 <Image
//                   className="w-full h-10 pt-5 mr-6 rounded-lg"
//                   // className="hidden w-auto h-8 lg:block"

//                   src={themes[0].logo.formats.xsmall.url}
//                   layout="intrinsic"
//                   height={48}
//                   width={48}
//                   alt={themes[0].logo.name}
//                 />
//               </>
//             ) : (
//               <>
//                 <Image
//                   className="w-full h-10 pt-5 rounded-lg"
//                   src="https://via.placeholder.com/64/0891B2/E2E8F0?text=No+Image+Set"
//                   layout="intrinsic"
//                   height={48}
//                   width={48}
//                   alt=""
//                 />
//               </>
//             )}
//             <div className="items-center justify-end hidden md:flex">
//               <span className="text-xl whitespace-nowrap font-strong hover:text-gray-900">
//                 {name}
//               </span>
//             </div>
//           </a>
//         </Link>
//         <div className="ml-5 space-x-4 md:hidden">
//           <span className="inline-block text-base font-medium">{name}</span>
//         </div>
//       </>
//     )
//   }
//   function DesktopMenuItems() {
//     return (
//       <>
//         <div className="hidden sm:-my-px sm:ml-32 sm:flex sm:space-x-8">
//           {navigation.links.map((item, index) => (
//             <Link href={item.href} key={index} passHref>
//               <a
//                 // key={index}
//                 // href={item.href}
//                 className={cn(
//                   item.href === slug
//                     ? 'border-primaryColor-700 text-gray-900'
//                     : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
//                   'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
//                 )}
//                 aria-current={item.href === slug ? 'page' : undefined}
//               >
//                 {item.label}
//               </a>
//             </Link>
//           ))}
//         </div>
//       </>
//     )
//   }

//   function MobileMenuItems() {
//     return (
//       <Disclosure.Panel className="sm:hidden">
//         <div className="pt-2 pb-3 space-y-1">
//           {navigation.links.map((item, index) => (
//             <Link href={item.href} key={index} passHref>
//               <Disclosure.Button
//                 // key={index}
//                 as="a"
//                 // href={item.href}
//                 className={cn(
//                   item.href === slug
//                     ? 'bg-primaryColor-50 border-primaryColor-700 text-primaryColor-700'
//                     : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800',
//                   'block pl-3 pr-4 py-2 border-l-4 text-base font-medium'
//                 )}
//                 aria-current={item.href === slug ? 'page' : undefined}
//               >
//                 {item.label}
//               </Disclosure.Button>
//             </Link>
//           ))}
//         </div>
//         <MobileProfileMenu />
//       </Disclosure.Panel>
//     )
//   }

//   return (
//     <>
//       <header>
//         <noscript>
//           <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
//         </noscript>

//         <div className="min-h-full">
//           <Disclosure as="nav" className="bg-white border-b border-gray-200">
//             {({ open }) => (
//               <>
//                 <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//                   <div className="flex justify-between h-16">
//                     <div className="flex">
//                       <div className="flex items-center flex-shrink-0">
//                         {/* <MobileLogo /> */}
//                         <DesktopLogo />
//                       </div>
//                       <DesktopMenuItems />
//                     </div>
//                     <DesktopProfileMenu />
//                     <div className="flex items-center -mr-2 sm:hidden">
//                       {/* Mobile menu button */}
//                       <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-sm hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-700">
//                         <span className="sr-only">Open main menu</span>
//                         {open ? (
//                           <XIcon className="block w-6 h-6" aria-hidden="true" />
//                         ) : (
//                           <MenuIcon
//                             className="block w-6 h-6"
//                             aria-hidden="true"
//                           />
//                         )}
//                       </Disclosure.Button>
//                     </div>
//                   </div>
//                 </div>

//                 <MobileMenuItems />
//               </>
//             )}
//           </Disclosure>
//         </div>
//       </header>
//     </>
//   )

//   function MobileProfileMenu() {
//     return (
//       <>
//         <div className="z-50 pt-4 pb-3 border-t border-gray-200">
//           {!session && (
//             <div>
//               <p className="mt-6 text-base font-medium text-center text-gray-500">
//                 Existing customer?
//                 <a
//                   href={`/api/auth/signin`}
//                   onClick={(e) => {
//                     e.preventDefault()
//                     signIn()
//                   }}
//                   className="text-primaryColor-600 hover:text-primaryColor-500"
//                 >
//                   Sign in
//                 </a>
//               </p>
//             </div>
//           )}

//           {session && (
//             <>
//               <div className="flex items-center px-4">
//                 <div className="flex-shrink-0">
//                   {session.user.image ? (
//                     <Image
//                       className="w-10 h-10 rounded-full"
//                       layout="intrinsic"
//                       src={session.user.image}
//                       height={32}
//                       width={32}
//                       alt=""
//                     />
//                   ) : (
//                     <>
//                       <UserIcon className="w-10 h-10 text-primaryColor-700" />
//                     </>
//                   )}
//                 </div>

//                 <div className="ml-3">
//                   <div className="text-base font-medium text-gray-800">
//                     {session.user.email || session.user.name}
//                   </div>
//                 </div>
//               </div>
//               <div className="mt-3 space-y-1">
//                 {userNavigation.map((item) => (
//                   <Disclosure.Button
//                     key={item.name}
//                     as="a"
//                     href={item.href}
//                     className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//                   >
//                     {item.name}
//                   </Disclosure.Button>
//                 ))}
//                 <Disclosure.Button
//                   key="signout"
//                   as="a"
//                   href={`/api/auth/signout`}
//                   className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
//                   onClick={(e) => {
//                     e.preventDefault()
//                     signOut()
//                   }}
//                 >
//                   Sign Out
//                 </Disclosure.Button>
//               </div>
//             </>
//           )}
//         </div>
//       </>
//     )
//   }
//   function DesktopProfileMenu() {
//     return (
//       <>
//         {!session && (
//           <div className="items-center justify-end hidden md:flex md:flex-1 lg:w-0">
//             <a
//               href={`/api/auth/signin`}
//               onClick={(e) => {
//                 e.preventDefault()
//                 signIn()
//               }}
//               className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white border border-transparent rounded-sm shadow-sm whitespace-nowrap bg-primaryColor-600 hover:bg-primaryColor-700"
//             >
//               Sign in
//             </a>
//           </div>
//         )}

//         {session && (
//           <div className="z-50 hidden sm:ml-6 sm:flex sm:items-center">
//             {/* Profile dropdown */}
//             <Menu as="div" className="relative ml-3">
//               <div>
//                 <Menu.Button className="flex items-center max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-700">
//                   <span className="sr-only">Open user menu</span>

//                   {session.user.image ? (
//                     <Image
//                       className="w-8 h-8 rounded-full"
//                       layout="intrinsic"
//                       src={session.user.image}
//                       height={32}
//                       width={32}
//                       alt=""
//                     />
//                   ) : (
//                     <>
//                       <UserIcon className="w-8 h-8 text-primaryColor-700" />
//                     </>
//                   )}
//                 </Menu.Button>
//               </div>
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-200"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   {userNavigation.map((item) => (
//                     <Menu.Item key={item.name}>
//                       {({ active }) => (
//                         <a
//                           href={item.href}
//                           className={cn(
//                             active ? 'bg-gray-100' : '',
//                             'block px-4 py-2 text-sm text-gray-700'
//                           )}
//                         >
//                           {item.name}
//                         </a>
//                       )}
//                     </Menu.Item>
//                   ))}
//                   <Menu.Item key="signout">
//                     <a
//                       href={`/api/auth/signout`}
//                       className="block px-4 py-2 text-sm text-gray-700"
//                       onClick={(e) => {
//                         e.preventDefault()
//                         signOut()
//                       }}
//                     >
//                       Sign Out
//                     </a>
//                   </Menu.Item>
//                 </Menu.Items>
//               </Transition>
//             </Menu>
//           </div>
//         )}
//       </>
//     )
//   }
// }
