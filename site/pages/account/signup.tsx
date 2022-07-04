import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, FormEvent } from 'react'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { useQueries, QueryClient, dehydrate } from 'react-query'
import { getBrand, getBrandColors } from '@lib/queries'
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@lib/api-helpers'
import { updateUserName } from '@lib/supabase-client'
import { User } from '@supabase/gotrue-js'
const DefaultLogo = dynamic(() => import('@components/atoms/Logo/Logo'))
import {
  Facebook as FacebookIcon,
  Google as GoogleIcon,
} from '@components/atoms/Icons'
const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)
export default function SignUp() {
  const [newUser, setNewUser]: any = useState<User | null>(null)
  const [email, setEmail]: any = useState('')
  const [password, setPassword]: any = useState('')
  const [name, setName]: any = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type?: string; content?: string }>({
    type: '',
    content: '',
  })
  const router = useRouter()
  const { user } = useUser()

  const [brand, setBrand]: any = useState()
  let results: any = useQueries([
    { queryKey: 'brand', queryFn: () => getBrand, cacheTime: Infinity },
    { queryKey: 'colors', queryFn: getBrandColors, cacheTime: Infinity },
  ])

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)
    setMessage({})
    const { error, user: createdUser } = await supabaseClient.auth.signUp({
      email,
      password,
    })
    if (error) {
      setMessage({ type: 'error', content: error.message })
    } else {
      if (createdUser) {
        await updateUserName(createdUser, name)
        setNewUser(createdUser)
      } else {
        setMessage({
          type: 'note',
          content: 'Check your email for the confirmation link.',
        })
      }
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

  // route to account page if user is logged in
  useEffect(() => {
    if (newUser || user) {
      router.replace('/account')
    }
  }, [newUser, user])

  // get brand and colors
  useEffect(() => {
    if (!results[0].isFetching && !results[1].isFetching) {
      results[0].data.data[0].colors = results[1].data
      setBrand(results[0].data.data[0])
    }
    console.log('brand->', brand)
  }, [results])

  return (
    <>
      <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
        <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md">
          {brand?.darkLogo ? (
            <>
              <Image
                className="w-auto h-8"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${brand?.darkLogo}`}
                layout="responsive"
                width={8}
                height={8}
                alt={brand?.name || ''}
                priority
              />
              <h1 className="mt-6 text-3xl font-extrabold text-center text-gray-900 ">
                {brand.name}
              </h1>
            </>
          ) : (
            <>
              <h1 className="mt-6 text-3xl font-extrabold text-center text-gray-900 ">
                {brand?.name}
              </h1>
            </>
          )}

          <h2 className="text-2xl font-semibold text-center text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-gray-100 shadow-md rounded-xs sm:px-10">
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="relative">
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-500 bg-gray-100">
                    {message.content && (
                      <div
                        className={`${
                          message.type === 'error'
                            ? 'text-pink-500'
                            : 'text-green-500'
                        } border ${
                          message.type === 'error'
                            ? 'border-pink-500'
                            : 'border-green-500'
                        } p-3`}
                      >
                        {message.content}
                      </div>
                    )}
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    type="name"
                    id="name"
                    placeholder="Joe Blogs"
                    name="name"
                    // autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    // value={email}
                    onChange={setName}
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-xs appearance-none rounded-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    placeholder="joe@company.com"
                    name="email"
                    // autoComplete="email"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    value={email}
                    onChange={setEmail}
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-xs appearance-none rounded-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    // autoComplete="current-password"
                    // value={password}
                    onChange={setPassword}
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    required
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-xs appearance-none rounded-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  // loading={loading}
                  disabled={!password.length || !email.length}
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-xs rounded-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 text-gray-500 bg-gray-100">
                    Or Sign Up with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">
                <div>
                  <button
                    type="submit"
                    className={
                      loading
                        ? `grayscale `
                        : `` +
                          `inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 shadow-xs rounded-xs hover:bg-gray-50`
                    }
                    disabled={loading}
                    onClick={() => handleOAuthSignIn('google')}
                  >
                    <span className="sr-only">Sign in with Google</span>
                    <GoogleIcon className="block w-6 h-6" aria-hidden="true" />
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className={
                      loading
                        ? `grayscale `
                        : `` +
                          `inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 shadow-xs rounded-xs hover:bg-gray-50`
                    }
                    disabled={loading}
                    onClick={() => handleOAuthSignIn('google')}
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <FacebookIcon
                      className="block w-6 h-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="text-sm">
                <a
                  href="/account/signin"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Already have an account? Sign in here.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
  // show loading otherwise
  return <div className="m-6">Loading...</div>
}

SignUp.Layout = Layout
