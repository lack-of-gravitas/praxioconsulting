import { ArrowRight as ArrowRightIcon } from '@components/atoms/Icons'
import Link from 'next/link'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'

export default function ButtonCookie({ data }: any) {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      {acceptedCookies && (
        <div className="fixed inset-x-0 bottom-0">
          <div className="bg-gray-600">
            <div className="px-3 py-3 mx-auto max-w-7xl sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-center justify-between">
                <div className="flex items-center flex-1 w-auto">
                  {/* <span className="flex p-2 bg-indigo-800 rounded-xs">
                    <SpeakerphoneIcon className="w-6 h-6 text-white" aria-hidden="true" />
                  </span> */}
                  <p className="ml-3 font-medium text-white">
                    This site uses cookies to improve your experience. By
                    clicking, you agree to our Privacy Policy.
                  </p>
                </div>
                <div className="flex-shrink-0 order-3 w-full mt-2 sm:order-2 sm:mt-0 sm:w-auto ">
                  <button
                    onClick={() => onAcceptCookies()}
                    aria-label="Accept Cookies"
                    style={{ backgroundColor: data ? data : '#FFA439' }}
                    className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-800 border border-transparent shadow-xs rounded-xs "
                  >
                    AcceptCookies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
