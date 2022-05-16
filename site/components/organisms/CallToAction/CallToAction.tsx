// // import delve from "dlv";
import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/outline'
import CallToAction from '.'

const CTA = ({ data }: any) => {
  let { header, buttons } = data
  return (
    <>
      <div className="bg-slate-100">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
            <span className="block">{header?.title}</span>
            <span className="block text-primaryColor-700">
              {header?.subtitle}
            </span>
          </h2>
          {buttons ? (
            buttons.map((button: any, index: any) => (
              <div key={index} className="flex mt-8 lg:mt-0 lg:flex-shrink-0">
                {button.link ? (
                  <Link
                    href={button.link.href}
                    className="cursor-auto"
                    passHref
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-3 text-lg font-medium text-white border border-transparent rounded-md shadow-lg bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                    >
                      <ArrowRightIcon
                        className="w-6 h-6 mr-2 -ml-1"
                        aria-hidden="true"
                      />
                      <span>{button.link.label}</span>
                    </button>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  )
}

CTA.defaultProps = {}

export default CTA
