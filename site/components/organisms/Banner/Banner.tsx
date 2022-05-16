/* This example requires Tailwind CSS v2.0+ */
import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'

export default function Banner() {
  const router = useRouter()

  return (
    <div className="relative bg-red-600">
      <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="pr-16 sm:text-center sm:px-16">
          <p className="font-medium text-white">
            <span className="md:hidden">PREVIEW MODE</span>
            <span className="hidden md:inline">PREVIEW MODE</span>
            <span className="block sm:ml-2 sm:inline-block">
              <button
                className="font-bold text-white underline"
                onClick={() => {
                  fetch('/api/exit-preview')
                    .then(() => router.push('/'))
                    .catch((err) => console.error(err))
                }}
              >
                {' '}
                EXIT PREVIEW<span aria-hidden="true">&rarr;</span>
              </button>
            </span>
          </p>
        </div>
        {/* <div className="absolute inset-y-0 right-0 flex items-start pt-1 pr-1 sm:pt-1 sm:pr-2 sm:items-start">
          <button
            type="button"
            className="flex p-2 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-white"
          >
            <span className="sr-only">Dismiss</span>
            <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
          </button>
        </div> */}
      </div>
    </div>
  )
}
