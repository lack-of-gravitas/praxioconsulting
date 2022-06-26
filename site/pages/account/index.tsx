import dynamic from 'next/dynamic'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { getAccount } from '@lib/queries'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)

const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)

const PageNotFound = dynamic(() => import('@components/templates/PageNotFound'))

export default function Account({ slug, preview }: any) {
  // useeffect

  // let results: any = useQueries([
  //   {
  //     queryKey: 'account',
  //     queryFn: () => getAccount,
  //     cacheTime: 1000 * 60 * 10, // 10 minutes
  //   },
  // ])

  // if (!results[0].isFetching) {
  //   // console.log(slug, '(received data): ', results[0].data?.data[0])

  //   return (
  //     <>
  //       {results[0].data?.data[0]?.sections?.map((section: any) => (
  //         <Section key={section.sort} section={section} />
  //       ))}
  //     </>
  //   )
  // }

  // if (results[0].isError) {
  //   return (
  //     <>
  //       <PageNotFound />
  //     </>
  //   )
  // }

  // placeholder UI
  return (
    <>
      <div className="bg-white">
        <div className="grid items-center max-w-2xl grid-cols-1 px-4 py-8 mx-auto gap-y-16 gap-x-8 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8 lg:grid-cols-1">
          <div className="">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Purchases
            </h2>
            <p className="mt-4 text-gray-500">
              Your account information including (active) purchases and bonus
              content will be listed here. To manage your payment details
              including subscription payments, please use the Stripe Billing
              Portal.
            </p>
            <div className="flex mt-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 text-lg font-medium prose text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="material-symbols-outlined">credit_card</span>
                <span className="ml-2">Stripe Customer Portal</span>
              </button>
            </div>
            <dl className="grid grid-cols-1 mt-16 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="pt-4 border-t border-gray-200 cursor-pointer hover:bg-gray-100 hover:p-2 "
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                  <dd className="mt-4 text-sm text-gray-500">
                    <button
                      type="button"
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-sm shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="mr-2">Visit</span>{' '}
                      <span className="material-symbols-outlined">
                        keyboard_arrow_right
                      </span>
                    </button>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}

Account.Layout = Layout

/* This example requires Tailwind CSS v2.0+ */
const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and powder coated steel card cover',
  },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
]

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
//     return  <Layout>
//   <PageNotFound statusCode={404} />
// </Layout>;
//   }

//   if (
//     data.globalData === null ||
//     data.globalData === undefined ||
//     Object.keys(data.globalData).length === 0
//   ) {
//     return  <Layout>
//   <PageNotFound statusCode={404} />
// </Layout>;
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
//             <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-800 sm:text-4xl">
//               Your Account
//             </span>
//           </h2>

//           <div className="items-center mt-3 text-center md:block md:mt-0 md:absolute md:top-3 md:right-0">
//             <button
//               type="button"
//               className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-sm rounded-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-500"
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
//           <div className="w-full max-w-sm p-10 mx-auto border shadow rounded-xs border-slate-700">
//             <div className="flex space-x-4 animate-pulse">
//               <div className="w-10 h-10 rounded-xs bg-slate-700">.</div>
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
//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
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
//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
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
//             <h2 className="text-2xl font-extrabold tracking-tight text-gray-800">
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
//   //       <h2 className="pt-5 text-2xl font-extrabold tracking-tight text-gray-800">
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
//   //             className="relative inline-flex items-center px-4 py-3 text-lg font-medium text-white bg-indigo-700 border border-transparent shadow-lg rounded-xs hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
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
