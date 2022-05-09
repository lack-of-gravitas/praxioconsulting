import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, FormEvent } from 'react'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

import Button from 'components/ui/Button'
// import GitHub from 'components/icons/GitHub';
import Input from 'components/ui/Input'
import LoadingDots from 'components/ui/LoadingDots'
// import Logo from 'components/icons/Logo';
import { Provider } from '@supabase/supabase-js'
import { getURL } from 'lib/api-helpers'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPasswordInput, setShowPasswordInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: '',
  })
  const router = useRouter()
  const { user } = useUser()

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setMessage({})

    const { error } = await supabaseClient.auth.signIn(
      { email, password },
      { redirectTo: getURL() }
    )
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }
    if (!password) {
      setMessage({
        type: 'note',
        content: 'Check your email for the magic link.',
      })
    }
    setLoading(false)
  }

  const handleOAuthSignIn = async (provider: Provider) => {
    setLoading(true)
    const { error } = await supabaseClient.auth.signIn({ provider })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (user) {
      router.replace('/account')
    }
  }, [user])

  if (!user)
    return (
      <div className="flex justify-center height-screen-helper">
        <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
          <div className="flex justify-center pb-12 ">
            {/* <Logo width="64px" height="64px" /> */}
          </div>
          <div className="flex flex-col space-y-4">
            {message.content && (
              <div
                className={`${
                  message.type === 'error' ? 'text-pink-500' : 'text-green-500'
                } border ${
                  message.type === 'error'
                    ? 'border-pink-500'
                    : 'border-green-500'
                } p-3`}
              >
                {message.content}
              </div>
            )}

            {!showPasswordInput && (
              <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Button
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!email.length}
                >
                  Send magic link
                </Button>
              </form>
            )}

            {showPasswordInput && (
              <form onSubmit={handleSignin} className="flex flex-col space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={setPassword}
                  required
                />
                <Button
                  className="mt-1"
                  variant="slim"
                  type="submit"
                  loading={loading}
                  disabled={!password.length || !email.length}
                >
                  Sign in
                </Button>
              </form>
            )}

            <span className="pt-1 text-sm text-center">
              <a
                href="#"
                className="cursor-pointer text-zinc-200 text-accent-9 hover:underline"
                onClick={() => {
                  if (showPasswordInput) setPassword('')
                  setShowPasswordInput(!showPasswordInput)
                  setMessage({})
                }}
              >
                {`Or sign in with ${
                  showPasswordInput ? 'magic link' : 'password'
                }.`}
              </a>
            </span>

            <span className="pt-1 text-sm text-center">
              <span className="text-zinc-200">Don't have an account?</span>
              {` `}
              <Link href="/signup">
                <a className="font-bold cursor-pointer text-accent-9 hover:underline">
                  Sign up.
                </a>
              </Link>
            </span>
          </div>

          <div className="flex items-center my-6">
            <div
              className="flex-grow mr-3 border-t border-zinc-600"
              aria-hidden="true"
            ></div>
            <div className="text-zinc-400">Or</div>
            <div
              className="flex-grow ml-3 border-t border-zinc-600"
              aria-hidden="true"
            ></div>
          </div>

          <Button
            variant="slim"
            type="submit"
            disabled={loading}
            onClick={() => handleOAuthSignIn('github')}
          >
            {/* <GitHub /> */}
            <span className="ml-2">Continue with GitHub</span>
          </Button>
        </div>
      </div>
    )

  return (
    <div className="m-6">
      <LoadingDots />
    </div>
  )
}

export default SignIn

// LEGACY CODE
// #####################################################################################################

// import React from "react";
// import ErrorPage from "next/error";
// import Layout from "@components/layout";
// import * as queries from "@services/queries";
// import {
//   getProviders,
//   signIn,
//   getSession,
//   useSession,
// } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { fetchGetJSON } from "@lib/api-helpers";

// export default function SignIn({ data }) {
//   // get the session to check if the user logged in or not
//   const router = useRouter();
//   const { data: session, status } = useSession();
//   const [providers, setProviders] = useState({});

//   // get supported Auth Providers
//   useEffect(() => {
//     async function fetchProviders() {
//       const prov = await getProviders();
//       setProviders(prov);
//     }
//     fetchProviders();
//   }, []);

//   // console.log("data (Component): ", JSON.stringify(data.providers));

//   // re-route to profile if user is already signed in
//   if (status === "authenticated") {
//     router.push("/user/profile");
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
//     <>
//       <Layout
//         data={data.globalData}
//         slug="signin"
//         seo={data.globalData.seo}
//         // preview={preview}
//       >
//         <div className="py-6 bg-white sm:py-8 lg:py-12">
//           <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
//             <h2 className="mb-4 text-2xl font-bold text-center text-gray-800 lg:text-3xl md:mb-8">
//               Sign In
//             </h2>

//             <form className="max-w-lg mx-auto bg-gray-100 border rounded-md">
//               <div className="flex flex-col gap-4 p-4 md:p-8">
//                 {status !== "loading" && providers ? (
//                   Object.values(providers).map((provider) => (
//                     <div
//                       className="flex items-center justify-center"
//                       key={provider.name}
//                     >
//                       {provider.id === "facebook" && (
//                         <button
//                           className={`flex w-full justify-center items-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus-visible:ring ring-blue-300 text-white text-base md:text-base font-semibold text-center rounded-md outline-none transition duration-100 gap-2 px-8 py-3`}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             signIn(provider.id);
//                           }}
//                         >
//                           <svg
//                             className="flex-shrink-0 w-5 h-5"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z"
//                               fill="white"
//                             />
//                           </svg>
//                           Continue with {provider.name}
//                         </button>
//                       )}

//                       {provider.id === "google" && (
//                         <button
//                           className={`flex w-full justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 border border-gray-300 focus-visible:ring ring-gray-300 text-gray-800 text-base md:text-base font-semibold text-center rounded-md outline-none transition duration-100 gap-2 px-8 py-3`}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             signIn(provider.id);
//                           }}
//                         >
//                           <svg
//                             className="flex-shrink-0 w-5 h-5"
//                             width="24"
//                             height="24"
//                             viewBox="0 0 24 24"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg"
//                           >
//                             <path
//                               d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z"
//                               fill="#4285F4"
//                             />
//                             <path
//                               d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z"
//                               fill="#34A853"
//                             />
//                             <path
//                               d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z"
//                               fill="#FBBC05"
//                             />
//                             <path
//                               d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z"
//                               fill="#EA4335"
//                             />
//                           </svg>
//                           Continue with {provider.name}
//                         </button>
//                       )}
//                     </div>
//                   ))
//                 ) : (
//                   <>
//                     <h3>Loading ...</h3>
//                   </>
//                 )}
//               </div>

//               <div className="flex items-center justify-center p-4 bg-gray-100">
//                 <p className="text-sm text-center text-gray-500">
//                   Provides access to your purchased courses, programs and other
//                   exclusive materials. Refer to our{" "}
//                   <Link href="/privacy" passHref>
//                     <a className="transition duration-100 text-primaryColor-500 hover:text-primaryColor-600 active:text-primaryColor-700">
//                       Privacy Policy
//                     </a>
//                   </Link>{" "}
//                   for details.
//                 </p>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Layout>
//     </>
//   );
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

//   // return props with data to component
//   return {
//     props: { data, preview: preview ? true : null }, // will be passed to the page component as props
//     revalidate: 30, // In seconds. False means page is cached until next build, 28800 = 8 hours
//   };
// }

// // //If you export an async function called getServerSideProps from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps. gets data and delivers it to the Component to render UI
// // export async function getServerSideProps(context) {
// //   // locally getServerSideProps runs every time the page is loaded
// //   // context contains route params for dynamic routes, preview, previewData, locale,locales, defaultLocale
// //   // console.log("context (getServerSideProps): ", context);

// //   let data = {};
// //   data.globalData = {};
// //   const preview = context.preview;

// //   // get globalData and pageData
// //   let dbQuery = `
// //     query getData($brand: String!) {
// //         ${queries.qryGlobalData(preview)}
// //     }
// //     ${queries.fragColorFields()}
// //     ${queries.fragHeaderLinks()}
// //     ${queries.fragImageFields()}
// //     ${queries.fragLinkFields()}
// //     ${queries.fragLocationFields()}
// //     ${queries.fragSeoFields()}
// //     ${queries.fragSocialFields()}
// //     `;
// //   console.log("dbQuery (getServerSideProps): ", dbQuery);

// //   let req = {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify({
// //       query: `${dbQuery}`,
// //       variables: {
// //         brand: `${process.env.NEXT_PUBLIC_BRAND}`,
// //         //slug: "login",
// //         //limit: `${context.params.filter}`,
// //       },
// //     }),
// //   };

// //   let res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND}/graphql`, req);
// //   let results = await res.json();
// //   if (results.data) {
// //     // console.log("results (getServerSideProps): ", results.data);
// //     data.path = "signin";
// //     data.globalData = results.data.globalData[0];
// //     // data.providers = providers;
// //   }

// //   // console.log("data.pageData (getstaticprops): ", data.pageData);
// //   // return props with data to component
// //   return {
// //     props: { data }, // will be passed to the page component as props
// //   };
// // }
