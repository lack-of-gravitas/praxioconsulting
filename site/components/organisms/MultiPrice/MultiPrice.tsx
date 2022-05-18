import { useState, useEffect, useRef, Fragment } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'
import {
  CheckIcon,
  XIcon,
  ArrowRightIcon,
  LockClosedIcon,
} from '@heroicons/react/outline'
import { fetchPostJSON } from '@lib/api-helpers'

import { loadStripe } from '@stripe/stripe-js'
// import { getProviders, signIn, getSession, useSession } from 'next-auth/react'
import { Dialog, Transition } from '@headlessui/react'

import { postData } from '@lib/api-helpers'
import { getStripe } from '@lib/stripe-client'
// Call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const MultiPrice = ({ data, product }: any) => {
  // // console.log("MultiPrice | data: ", data);
  // // console.log("MultiPrice | product: ", product);
  // const router = useRouter()
  // // const { data: session, status } = useSession()
  // const { header } = data
  // const [providers, setProviders] = useState({})
  // const [prices, setPrices] = useState(data.prices)
  // const [open, setOpen] = useState(false)
  // const handleCheckout = async (e) => {
  //   // check if customer already has bought this product and redirect them if that's the case
  //   // construct data
  //   const data = {
  //     orgId: `${process.env.NEXT_PUBLIC_BRAND}`, // business id
  //     customerId: '', //session.user.stripeId, // stripe customer id
  //     customerEmail: '', // session.user.email,
  //     customerName: '', //session.user.name,
  //     subscribed: false,
  //     stale: false,
  //     price: '', //price, //selectedPrice,
  //     productId: product.id,
  //     productSlug: `${product.categories[0].slug}s/${product.slug}`,
  //   }
  //   // get Checkout Session
  //   const checkoutSession = await fetchPostJSON('/api/checkout_sessions', data)
  //   if (checkoutSession.statusCode === 500) {
  //     console.error(checkoutSession.message)
  //     return
  //   }
  //   // Redirect to Checkout.
  //   const stripe = await getStripe()
  //   const { error } = await stripe?.redirectToCheckout({
  //     // Make the id field from the Checkout Session creation API response
  //     // available to this file, so you can provide it as parameter here
  //     // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
  //     sessionId: checkoutSession.id,
  //   })
  //   // If `redirectToCheckout` fails due to a browser or network
  //   // error, display the localized error message to your customer
  //   // using `error.message`.
  //   console.warn(error.message)
  //   // setLoading(false);
  // }
  // // const priceString = new Intl.NumberFormat("en-US", {
  // //   style: "currency",
  // //   currency: price.currency,
  // //   minimumFractionDigits: 0,
  // // }).format((price?.unit_amount || 0) / 100);
  // // get prices from Stripe
  // useEffect(async () => {
  //   let req = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_PRODUCTS}`, //basic vs bearer == oauth
  //       'Content-Type': 'application/json',
  //     },
  //   }
  //   let res = await fetch(`https://api.stripe.com/v1/prices`, req)
  //   let results = await res.json()
  //   // console.log("Stripe | results: ", results.data);
  //   let filteredPrices = results.data.filter(
  //     (price) => price.product === product.stripeId && price.active === true
  //   )
  //   // console.log("filtered | prices: ", filteredPrices);
  //   // merge with prices set in Strapi
  //   prices.map((price) => {
  //     filteredPrices.map((filteredPrice) => {
  //       if (price.stripeId === filteredPrice.id) {
  //         ;(price.currency = filteredPrice.currency),
  //           (price.metadata = filteredPrice.metadata),
  //           (price.nickname = filteredPrice.nickname),
  //           (price.recurring = filteredPrice.recurring),
  //           (price.tax_behavior = filteredPrice.tax_behavior),
  //           (price.tiers_mode = filteredPrice.tiers_mode),
  //           (price.transform_quantity = filteredPrice.transform_quantity),
  //           (price.type = filteredPrice.type),
  //           (price.unit_amount = filteredPrice.unit_amount)
  //       }
  //     })
  //   })
  //   // console.log("prices: ", prices);
  //   let mergedPrices = prices.map((price) => {
  //     let filteredPrice = filteredPrices.find(
  //       (filteredPrice) => filteredPrice.id === price.stripeId
  //     )
  //     return { ...price, ...filteredPrice }
  //   })
  //   // console.log("matched w Strapi | prices: ", mergedPrices);
  //   setPrices(mergedPrices)
  // }, [])
  // // get supported Auth Providers
  // useEffect(async () => {
  //   const prov = await getProviders()
  //   setProviders(prov)
  // }, [])
  // function LoginModal() {
  //   return (
  //     <Transition.Root show={open} as={Fragment}>
  //       <Dialog
  //         as="div"
  //         className="fixed inset-0 z-10 overflow-y-auto"
  //         onClose={setOpen}
  //       >
  //         <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0"
  //             enterTo="opacity-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100"
  //             leaveTo="opacity-0"
  //           >
  //             <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
  //           </Transition.Child>
  //           {/* This element is to trick the browser into centering the modal contents. */}
  //           <span
  //             className="hidden sm:inline-block sm:align-middle sm:h-screen"
  //             aria-hidden="true"
  //           >
  //             &#8203;
  //           </span>
  //           <Transition.Child
  //             as={Fragment}
  //             enter="ease-out duration-300"
  //             enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //             enterTo="opacity-100 translate-y-0 sm:scale-100"
  //             leave="ease-in duration-200"
  //             leaveFrom="opacity-100 translate-y-0 sm:scale-100"
  //             leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  //           >
  //             <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-sm shadow-xl sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
  //               <div>
  //                 <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-primaryColor-100">
  //                   <LockClosedIcon
  //                     className="w-6 h-6 text-primaryColor-800"
  //                     aria-hidden="true"
  //                   />
  //                 </div>
  //                 <div className="mt-3 text-center sm:mt-5">
  //                   <Dialog.Title
  //                     as="h3"
  //                     className="text-lg font-medium leading-6 text-gray-900"
  //                   >
  //                     Sign up or Login
  //                   </Dialog.Title>
  //                   <div className="mt-2 mb-3">
  //                     <p className="text-sm text-gray-500">
  //                       You need to sign up or login to purchase this course.
  //                       This allows you to access all your purchased courses,
  //                       programs and other exclusive materials.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </div>
  //               <form className="max-w-lg mx-auto bg-gray-100 border rounded-sm">
  //                 <div className="flex flex-col gap-4 p-4 md:p-8">
  //                   {status !== 'loading' && providers ? (
  //                     Object.values(providers).map((provider) => (
  //                       <div
  //                         className="flex items-center justify-center"
  //                         key={provider.name}
  //                       >
  //                         {provider.id === 'facebook' && (
  //                           <button
  //                             className={`flex w-full justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-base md:text-base font-semibold text-center rounded-sm outline-none transition duration-100 gap-2 px-8 py-3`}
  //                             onClick={(e) => {
  //                               e.preventDefault()
  //                               signIn(provider.id)
  //                             }}
  //                           >
  //                             <svg
  //                               className="flex-shrink-0 w-5 h-5"
  //                               width="24"
  //                               height="24"
  //                               viewBox="0 0 24 24"
  //                               fill="none"
  //                               xmlns="http://www.w3.org/2000/svg"
  //                             >
  //                               <path
  //                                 d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z"
  //                                 fill="white"
  //                               />
  //                             </svg>
  //                             Continue with {provider.name}
  //                           </button>
  //                         )}
  //                         {provider.id === 'google' && (
  //                           <button
  //                             className={`flex w-full justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 focus-visible:ring ring-gray-300 text-gray-800 text-base md:text-base font-semibold text-center rounded-sm outline-none transition duration-100 gap-2 px-8 py-3`}
  //                             onClick={(e) => {
  //                               e.preventDefault()
  //                               signIn(provider.id)
  //                             }}
  //                           >
  //                             <svg
  //                               className="flex-shrink-0 w-5 h-5"
  //                               width="24"
  //                               height="24"
  //                               viewBox="0 0 24 24"
  //                               fill="none"
  //                               xmlns="http://www.w3.org/2000/svg"
  //                             >
  //                               <path
  //                                 d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
  //                                 fill="#4285F4"
  //                               />
  //                               <path
  //                                 d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
  //                                 fill="#34A853"
  //                               />
  //                               <path
  //                                 d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
  //                                 fill="#FBBC05"
  //                               />
  //                               <path
  //                                 d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
  //                                 fill="#EA4335"
  //                               />
  //                             </svg>
  //                             Continue with {provider.name}
  //                           </button>
  //                         )}
  //                       </div>
  //                     ))
  //                   ) : (
  //                     <>
  //                       <h3>Loading ...</h3>
  //                     </>
  //                   )}
  //                   <div className="m-2">
  //                     <p className="text-sm text-center text-gray-500">
  //                       Refer to our{' '}
  //                       <Link href="/privacy" passHref>
  //                         <a
  //                           target="_blank"
  //                           rel="noopener noreferrer"
  //                           className="transition duration-100 text-primaryColor-700 hover:text-primaryColor-800 active:text-primaryColor-800"
  //                         >
  //                           Privacy Policy
  //                         </a>
  //                       </Link>{' '}
  //                       for details.
  //                     </p>
  //                   </div>
  //                 </div>
  //               </form>
  //               <div className="mt-5 sm:mt-6">
  //                 <button
  //                   type="button"
  //                   className="inline-flex justify-center w-full px-4 py-2 text-base font-medium bg-white border rounded-sm shadow-sm border-1 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-600 sm:text-sm"
  //                   onClick={() => setOpen(false)}
  //                 >
  //                   Cancel
  //                 </button>
  //               </div>
  //             </div>
  //           </Transition.Child>
  //         </div>
  //       </Dialog>
  //     </Transition.Root>
  //   )
  // }
  // return (
  //   <>
  //     {open && <LoginModal />}
  //     <div className="px-4 py-24 mx-auto bg-white max-w-7xl sm:px-6 lg:px-8">
  //       {header && (
  //         <div className="text-center">
  //           <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
  //             {header.title}
  //           </h2>
  //           <p className="max-w-2xl mx-auto mt-3 text-xl text-gray-500 sm:mt-4">
  //             {header.text}
  //           </p>
  //         </div>
  //       )}
  //       {/* Tiers */}
  //       <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
  //         {prices.map((price) => (
  //           <div
  //             key={price.header.title}
  //             className="relative flex flex-col p-8 bg-white border border-gray-200 rounded-sm shadow-sm"
  //           >
  //             <div className="flex-1">
  //               <h3 className="text-xl font-semibold text-gray-900">
  //                 {price.header.title}
  //               </h3>
  //               {price.mostPopular ? (
  //                 <p className="absolute top-0 py-1.5 px-4 bg-primaryColor-700 rounded-sm text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
  //                   Most popular
  //                 </p>
  //               ) : null}
  //               <p className="flex items-baseline mt-4 text-gray-900">
  //                 <span className="text-5xl font-extrabold tracking-tight">
  //                   {Intl.NumberFormat('en-US', {
  //                     style: 'currency',
  //                     currency: price.currency ? price.currency : 'USD',
  //                     minimumFractionDigits: 0,
  //                   }).format(price?.unit_amount / 100)}
  //                   {/* {(price.unit_amount / 100).toString()} */}
  //                 </span>
  //                 <span className="text-xl font-extrabold tracking-tight">
  //                   {'  ' + price.currency?.toUpperCase()}
  //                 </span>
  //               </p>
  //               <span className="ml-1 text-xl font-semibold">
  //                 {!price.recurring
  //                   ? 'one time'
  //                   : price.recurring.interval_count === 1
  //                   ? 'per ' + price.recurring.interval
  //                   : 'every ' +
  //                     price.recurring.interval_count +
  //                     ' ' +
  //                     price.recurring.interval +
  //                     's'}
  //               </span>
  //               <div className="mt-6 text-gray-500">
  //                 {parse(price.description)}
  //               </div>
  //               {/* Feature list */}
  //               <ul role="list" className="mt-6 space-y-6">
  //                 {price.perks?.map((perk) => (
  //                   <li key={perk.name} className="flex">
  //                     {perk.included ? (
  //                       <CheckIcon
  //                         className="flex-shrink-0 w-6 h-6 text-green-900"
  //                         aria-hidden="true"
  //                       />
  //                     ) : (
  //                       <XIcon
  //                         className="flex-shrink-0 w-6 h-6 text-red-500"
  //                         aria-hidden="true"
  //                       />
  //                     )}
  //                     <span className="ml-3 text-gray-500">{perk.name}</span>
  //                   </li>
  //                 ))}
  //               </ul>
  //             </div>
  //             <form
  //               onSubmit={(e) => {
  //                 e.preventDefault()
  //                 // if signed in show modal
  //                 if (session) {
  //                   // proceed to Stripe Checkout
  //                   handleCheckout(price)
  //                 } else {
  //                   // show sign in modal
  //                   setOpen(true)
  //                 }
  //               }}
  //               //action="/api/checkout-session" method="POST"
  //             >
  //               <button
  //                 // type="submit"
  //                 // role="link"
  //                 className={cn(
  //                   price.mostPopular
  //                     ? 'bg-primaryColor-700 text-white hover:bg-primaryColor-800'
  //                     : 'bg-gray-100 hover:text-white text-primaryColor-700 hover:bg-primaryColor-800',
  //                   'mt-8 block w-full py-3 px-6 border border-transparent rounded-sm text-center font-medium'
  //                 )}
  //               >
  //                 Buy Now
  //               </button>
  //             </form>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // )
}

export default MultiPrice
