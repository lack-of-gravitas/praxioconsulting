import Image from 'next/image'
import Link from 'next/link'
import { Logo } from '@components/atoms'
export default function PageNotFound({ statusCode }: any) {
  return (
    <>
      <div className="flex flex-col min-h-full pt-16 pb-12 bg-white">
        <main className="flex flex-col justify-center flex-grow w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center flex-shrink-0">
            <Link href="/">
              <a className="inline-flex">
                <span className="sr-only">Workflow</span>
                <Logo />
                {/* <Image
                  className="w-auto h-12"
                  src="https://tailwindui.com/img/logos/workflow-mark.svg?color=indigo&shade=600"
                  alt=""
                /> */}
              </a>
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold tracking-wide text-indigo-600 uppercase">
                404 error
              </p>
              <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-800 sm:text-5xl">
                Page not found.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Sorry, we couldn’t find the page you’re looking for.
              </p>
              <div className="mt-6">
                <Link href="/">
                  <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
