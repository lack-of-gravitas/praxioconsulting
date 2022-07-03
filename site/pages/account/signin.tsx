import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, FormEvent } from 'react'
import { useUser } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'

const DefaultLogo = dynamic(() => import('@components/atoms/Logo/Logo'))
import { Provider } from '@supabase/supabase-js'
import { getURL } from '@lib/api-helpers'

const Layout = dynamic(
  () => import('@components/templates/_defaultLayout/Layout')
)

export default function SignIn() {
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
      <>
        {/* <div className="flex justify-center height-screen-helper">
          <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 ">
            <div className="flex justify-center pb-12 ">
              <Logo width="64px" height="64px" />
            </div>
            <div className="flex flex-col space-y-4">
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

              {!showPasswordInput && (
                <form
                  onSubmit={handleSignin}
                  className="flex flex-col space-y-4"
                >
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
                <form
                  onSubmit={handleSignin}
                  className="flex flex-col space-y-4"
                >
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
            <GitHub />
            <span className="ml-2">Continue with GitHub</span>
          </Button> 
          </div>
        </div> */}

        <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
          <div className="justify-center sm:mx-auto sm:w-full sm:max-w-md">
            {false ? (
              <>
                <DefaultLogo className="w-auto h-8" />
              </>
            ) : (
              <h1 className="mt-6 text-3xl font-extrabold text-center text-gray-900 ">
                {'ACME'}
              </h1>
            )}

            <h2 className="text-3xl font-extrabold text-center text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-gray-100 shadow-md rounded-xs sm:px-10">
              <form onSubmit={handleSignin} className="space-y-6">
                {/* action="#" method="POST" */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-md appearance-none rounded-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                      autoComplete="current-password"
                      required
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 shadow-md appearance-none rounded-xs focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 border-gray-300 rounded-xs focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="block ml-2 text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent shadow-md rounded-xs hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 text-gray-500 bg-white">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  <div>
                    <a
                      href="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 shadow-md rounded-xs hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Facebook</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 shadow-md rounded-xs hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with Twitter</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>

                  <div>
                    <a
                      href="#"
                      className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 shadow-md rounded-xs hover:bg-gray-50"
                    >
                      <span className="sr-only">Sign in with GitHub</span>
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )

  return <div className="m-6">Loading...</div>
}

SignIn.Layout = Layout
