import Link from 'next/link'
import { useState, ReactNode } from 'react'
import { LoadingDots } from '@components/atoms'
import { Button } from '@components/atoms'
import { useUser } from 'lib/hooks/useUser'
import { postData } from 'lib/api-helpers'
import { withAuthRequired, User } from '@supabase/supabase-auth-helpers/nextjs'

interface Props {
  title: string
  description?: string
  footer?: ReactNode
  children: ReactNode
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl m-auto my-8 border rounded-sm border-zinc-700 p">
      <div className="px-5 py-4">
        <h3 className="mb-1 text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="p-4 border-t border-zinc-700 bg-zinc-900 text-zinc-500 rounded-b-md">
        {footer}
      </div>
    </div>
  )
}

export const getServerSideProps = withAuthRequired({ redirectTo: '/signin' })

export default function Account({ user }: { user: User }) {
  const [loading, setLoading] = useState(false)
  const { isLoading, subscription, userDetails } = useUser()

  const redirectToCustomerPortal = async () => {
    setLoading(true)
    try {
      const { url, error } = await postData({
        url: '/api/create-portal-link',
      })
      window.location.assign(url)
    } catch (error) {
      if (error) return alert((error as Error).message)
    }
    setLoading(false)
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency,
      minimumFractionDigits: 0,
    }).format((subscription?.prices?.unit_amount || 0) / 100)

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 pt-8 pb-8 mx-auto sm:pt-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            We partnered with Stripe for a simplified billing.
          </p>
        </div>
      </div>
      <div className="p-4">
        <Card
          title="Your Plan"
          description={
            subscription
              ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
              : ''
          }
          footer={
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center">
              <p className="pb-4 sm:pb-0">
                Manage your subscription on Stripe.
              </p>
              <Button
                variant="primary"
                loading={loading}
                disabled={loading || !subscription}
                onClick={redirectToCustomerPortal}
              >
                Open customer portal
              </Button>
            </div>
          }
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {isLoading ? (
              <div className="h-12 mb-6">
                <LoadingDots />
              </div>
            ) : subscription ? (
              `${subscriptionPrice}/${subscription?.prices?.interval}`
            ) : (
              <Link href="/">
                <a>Choose your plan</a>
              </Link>
            )}
          </div>
        </Card>
        <Card
          title="Your Name"
          description="Please enter your full name, or a display name you are comfortable with."
          footer={<p>Please use 64 characters at maximum.</p>}
        >
          <div className="mt-8 mb-4 text-xl font-semibold">
            {userDetails ? (
              `${
                userDetails.full_name ??
                `${userDetails.first_name} ${userDetails.last_name}`
              }`
            ) : (
              <div className="h-8 mb-6">
                <LoadingDots />
              </div>
            )}
          </div>
        </Card>
        <Card
          title="Your Email"
          description="Please enter the email address you want to use to login."
          footer={<p>We will email you to verify the change.</p>}
        >
          <p className="mt-8 mb-4 text-xl font-semibold">
            {user ? user.email : undefined}
          </p>
        </Card>
      </div>
    </section>
  )
}

// ##############################################################################
// LEGACY CODE

// import ErrorPage from "next/error";
// import Layout from "@components/layout";
// import * as queries from "@services/queries";
// import { signOut, getSession, useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { Menu, Disclosure } from "@headlessui/react";
// import { loadStripe } from "@stripe/stripe-js";
// import { fetchGetJSON, fetchPostJSON } from "@lib/api-helpers";

// import { LogoutIcon } from "@components/atoms/Icons";
// import { ArrowRightIcon } from "@heroicons/react/solid";
// import dynamic from "next/dynamic";
// import ReactPlayer from "react-player/lazy";

// export default function UserProfile({ data }:any) {
//   // get the session to check if the user logged in or not
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [products, setProducts] = useState();
//   const [allVideos, setAllVideos] = useState([]);

//   useEffect(async () => {
//     getSession().then(async (session) => {
//       const { purchases } = await fetchPostJSON(`/api/get-purchases`, {
//         stripeId: session.user.stripeId,
//       });
//       let videos = [];

//       // console.log("current purchases: ", purchases);
//       // get product image from Strapi using slug and then update purchases object
//       purchases?.map((purchase) => {
//         const product = data.products.find(
//           (product) => product.stripeId === purchase.productInfo.stripeId
//         );

//         if (product) {
//           purchase.productInfo.images = product.images;
//           purchase.productInfo.name = product.name;
//           purchase.productInfo.videoLibrary = [];

//           let vimeoShowcases = product.videoLibraryFolders.split(",");
//           console.log("vimeoShowcases: ", vimeoShowcases);
//           // get videos from vimeo showcase and set videos state
//           vimeoShowcases = vimeoShowcases.map(async (showcase) => {
//             const response = await fetch(
//               `https://api.vimeo.com/users/user101969903/albums/${showcase}/videos`,
//               {
//                 method: "GET", // *GET, POST, PUT, DELETE, etc.
//                 headers: {
//                   Authorization: "Bearer e70c7ab58ba0c536f01aa99ff36d57b4",
//                 },
//               }
//             );

//             await response.json().then((data) => {
//               // console.log('vimeo response: ', data.data);

//               purchase.productInfo.videoLibrary = data.data;
//               videos = videos.concat(data.data);
//               console.log("purchase: ", purchase);

//               // remove duplicates from videos by uri
//               videos = videos.filter(
//                 (video, index, self) =>
//                   index === self.findIndex((t) => t.uri === video.uri)
//               );
//               console.log("videos: ", videos);
//               setAllVideos(videos);
//             });
//           });
//         }
//       });

//       setProducts(purchases);
//     });
//   }, []);

//   // re-route to login if user is already signed in
//   if (status === "unauthenticated") {
//     router.push("/user/signin");
//   }

//   if (data === undefined) {
//     return <ErrorPage statusCode={404} />;
//   }

//   if (
//     data.globalData === null ||
//     data.globalData === undefined ||
//     Object.keys(data.globalData).length === 0
//   ) {
//     return <ErrorPage statusCode={404} />;
//   }

//   return (
//     <Layout
//       data={data.globalData}
//       slug="signin"
//       seo={data.globalData.seo}
//       // preview={preview}
//     >
//       <div className="relative py-16 overflow-hidden bg-white">
//         <div className="relative px-4 sm:px-6 lg:px-8">
//           <div className="mx-auto text-lg max-w-7xl">
//             <Heading />
//             <Purchases />
//             {/* <Billing /> */}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );

//   function Heading() {
//     return (
//       <div className="relative pb-5 sm:pb-0">
//         <div className="md:flex md:items-center md:justify-between">
//           <h2>
//             <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
//               Your Account
//             </span>
//           </h2>

//           <div className="items-center mt-3 text-center md:block md:mt-0 md:absolute md:top-3 md:right-0">
//             <button
//               type="button"
//               className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white border border-transparent rounded-sm shadow-sm bg-primaryColor-600 hover:bg-primaryColor-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-500"
//               href={`/api/auth/signout`}
//               onClick={(e) => {
//                 e.preventDefault();
//                 signOut({ callbackUrl: "/" });
//               }}
//             >
//               <LogoutIcon className="inline h-6 mr-2" />
//               Logout
//             </button>
//           </div>
//         </div>
//         <p className="pb-10 mt-8 text-xl leading-8 text-gray-500">
//           Manage your account, access your purchases and other details here.
//         </p>
//       </div>
//     );
//   }

//   function Purchases() {
//     return (
//       <>
//         {!products && (
//           <div className="w-full max-w-sm p-10 mx-auto border rounded-sm shadow border-slate-700">
//             <div className="flex space-x-4 animate-pulse">
//               <div className="w-10 h-10 rounded-sm bg-slate-700">.</div>
//               <div className="flex-1 py-1 space-y-6">
//                 <div className="h-2 rounded bg-slate-700"></div>
//                 <div className="space-y-3">
//                   <div className="grid grid-cols-3 gap-4">
//                     <div className="h-2 col-span-2 rounded bg-slate-700"></div>
//                     <div className="h-2 col-span-1 rounded bg-slate-700"></div>
//                   </div>

//                   <div className="h-2 rounded bg-slate-700"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Courses */}

//         {products && (
//           <div className="pb-10">
//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
//               Courses
//             </h2>
//             <div className="text-base leading-8 text-gray-500 ">
//               Any of your Paid Courses will be listed here.
//             </div>
//             <ul
//               role="list"
//               className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
//             >
//               {products?.map(
//                 (product) =>
//                   product.productInfo.categories === "course" && (
//                     <Link
//                       key={product.productInfo.slug}
//                       href={
//                         // product.productInfo.categories +
//                         `/${product.productInfo.slug}`
//                       }
//                       className="cursor-auto"
//                       passHref
//                     >
//                       <a className="block mt-2 text-base font-semibold leading-8 text-primaryColor-700">
//                         <li>
//                           <div className="space-y-4 text-primaryColor-700 text-md">
//                             <ArrowRightIcon
//                               className="inline w-6 h-6 mr-4"
//                               aria-hidden="true"
//                             />{" "}
//                             {product.productInfo.name}
//                             {product.productInfo.images &&
//                             product.productInfo.images.length > 0 ? (
//                               <Image
//                                 className="object-cover w-full h-48"
//                                 src={
//                                   product.productInfo.images[0].formats.medium
//                                     ? product.productInfo.images[0].formats
//                                         .medium.url
//                                     : product.productInfo.images[0].formats
//                                         .small.url
//                                 }
//                                 layout="responsive"
//                                 height={
//                                   product.productInfo.images[0].formats.medium
//                                     ? product.productInfo.images[0].formats
//                                         .medium.height
//                                     : product.productInfo.images[0].formats
//                                         .small.height
//                                 }
//                                 width={
//                                   product.productInfo.images[0].formats.medium
//                                     ? product.productInfo.images[0].formats
//                                         .medium.height
//                                     : product.productInfo.images[0].formats
//                                         .small.height
//                                 }
//                                 alt={product.productInfo.images[0].name}
//                               />
//                             ) : (
//                               <>
//                                 <Image
//                                   className="object-cover w-full h-48"
//                                   src="https://via.placeholder.com/150/0891B2/E2E8F0?text=No+Image+Set"
//                                   layout="responsive"
//                                   height={700}
//                                   width={700}
//                                   alt=""
//                                 />
//                               </>
//                             )}
//                           </div>
//                         </li>
//                       </a>
//                     </Link>
//                   )
//               )}
//             </ul>
//           </div>
//         )}

//         {/* Bonus Content - Video Library */}
//         {allVideos?.length > 0 && (
//           <div className="pb-10">
//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
//               Bonus Content - Video Library
//             </h2>

//             <ul
//               role="list"
//               className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
//             >
//               {allVideos?.map((video) => (
//                 <div
//                   key={video.uri}
//                   className="block mt-2 text-base font-semibold leading-8 text-primaryColor-700"
//                 >
//                   <li>
//                     <div className="space-y-4 text-primaryColor-700 text-md">
//                       <div className="max-w-2xl pb-16 mx-auto overflow-hidden bg-white">
//                         <div className="object-cover w-full player-wrapper aspect-video h-4/5">
//                           <ReactPlayer
//                             controls={true}
//                             className="react-player "
//                             url={video.link}
//                             width="100%"
//                             height="100%"
//                           />
//                         </div> {video.name}
//                       </div>

//                     </div>
//                   </li>
//                 </div>
//               ))}
//             </ul>
//           </div>
//         )}

//         {/* Services */}
//         {products && (
//           <div className="pb-10">
//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
//               Other Paid Products
//             </h2>
//             <div className="text-base leading-8 text-gray-500 ">
//               Any other paid products & services will be listed here.
//             </div>
//             <ul
//               role="list"
//               className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:grid-cols-3 lg:gap-x-8"
//             >
//               {products?.map(
//                 (product) =>
//                   product.productInfo.categories === "service" && (
//                     <Link
//                       key={product.productInfo.slug}
//                       href={
//                         // product.productInfo.categories +
//                         `/${product.productInfo.slug}`
//                       }
//                       className="cursor-auto"
//                       passHref
//                     >
//                       <a className="block mt-2 text-base font-semibold leading-8 text-primaryColor-700">
//                         <li>
//                           <div className="space-y-4 text-primaryColor-700 text-md">
//                             <ArrowRightIcon
//                               className="inline w-6 h-6 mr-4"
//                               aria-hidden="true"
//                             />{" "}
//                             {product.productInfo.name}
//                             {product.productInfo.images &&
//                             product.productInfo.images.length > 0 ? (
//                               <Image
//                                 className="object-cover w-full h-48"
//                                 src={
//                                   product.productInfo.images[0].formats.medium
//                                     ? product.productInfo.images[0].formats
//                                         .medium.url
//                                     : product.productInfo.images[0].formats
//                                         .small.url
//                                 }
//                                 layout="responsive"
//                                 height={
//                                   product.productInfo.images[0].formats.medium
//                                     ? product.productInfo.images[0].formats
//                                         .medium.height
//                                     : product.productInfo.images[0].formats
//                                         .small.height
//                                 }
//                                 width={
//                                   product.productInfo.images[0].formats.medium
//                                     ? product.productInfo.images[0].formats
//                                         .medium.height
//                                     : product.productInfo.images[0].formats
//                                         .small.height
//                                 }
//                                 alt={product.productInfo.images[0].name}
//                               />
//                             ) : (
//                               <>
//                                 <Image
//                                   className="object-cover w-full h-48"
//                                   src="https://via.placeholder.com/150/0891B2/E2E8F0?text=No+Image+Set"
//                                   layout="responsive"
//                                   height={700}
//                                   width={700}
//                                   alt=""
//                                 />
//                               </>
//                             )}
//                           </div>
//                         </li>
//                       </a>
//                     </Link>
//                   )
//               )}
//             </ul>
//           </div>
//         )}
//       </>
//     );
//   }

//   // function Billing() {
//   //   return (
//   //     <>
//   //       <h2 className="pt-5 text-2xl font-extrabold tracking-tight text-gray-900">
//   //         Billing
//   //       </h2>
//   //       <p className="text-base leading-8 text-gray-500 ">
//   //         Manage your recurring subscriptions and securely update card details
//   //         by visiting the Stripe Customer Portal.
//   //       </p>
//   //       <div className="my-4 overflow-hidden bg-white">
//   //         <form
//   //           onSubmit={(e) => {
//   //             e.preventDefault();
//   //             handleSubmit(e);
//   //           }}
//   //           // action="/api/checkout-session" method="POST"
//   //         >
//   //           <button
//   //             type="submit"
//   //             className="relative inline-flex items-center px-4 py-3 text-lg font-medium text-white border border-transparent rounded-sm shadow-lg bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
//   //           >
//   //             <ArrowRightIcon
//   //               className="w-6 h-6 mr-2 -ml-1"
//   //               aria-hidden="true"
//   //             />
//   //             <span>Stripe Customer Portal</span>
//   //           </button>
//   //         </form>
//   //       </div>
//   //     </>
//   //   );
//   // }
// }

// // If you export an async function called getStaticProps from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps. gets data and delivers it to the Component to render UI
// export async function getStaticProps(context) {
//   // console.log("context (getstaticprops): ", context);
//   // locally getStaticProps is run every time
//   // in production, this only runs once then revalidates based on the revalidate parameter
//   // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale

//   const preview = context.preview;

//   // console.log("queryParams: ", queryParams);

//   let apiResponse = await fetchGetJSON(
//     `${process.env.NEXT_PUBLIC_BACKEND}/globals?_where[0][domain]=${process.env.NEXT_PUBLIC_BRAND}`
//   );
//   // console.log("apiResponse: ", apiResponse);

//   let data = {};
//   data.path = "signin";
//   data.globalData = {
//     name: apiResponse[0].name,
//     tagline: apiResponse[0].tagline,
//     domain: apiResponse[0].domain,
//     locale: apiResponse[0].locale,
//     themes: apiResponse[0].themes,
//     navigation: apiResponse[0].navigation,
//     footer: apiResponse[0].footer,
//     seo: apiResponse[0].seo,
//     locations: apiResponse[0].locations,
//     socials: apiResponse[0].socials,
//   };
//   // console.log("data: ", data);

//   apiResponse = await fetchGetJSON(
//     `${process.env.NEXT_PUBLIC_BACKEND}/products`
//   );
//   // console.log("products api: ", apiResponse);

//   data.products = apiResponse;

//   // return props with data to component
//   return {
//     props: { data, preview: preview ? true : null }, // will be passed to the page component as props
//     revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
//   };
// }
