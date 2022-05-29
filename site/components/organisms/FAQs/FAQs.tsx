import Link from 'next/link'
import Image from 'next/image'
import { Disclosure } from '@headlessui/react'
import { ChevronDown as ChevronDownIcon } from '@components/atoms/Icons'
import parse from 'html-react-parser'
import cn from 'clsx'
import { SectionHeader } from '@components/molecules'

const FAQs = ({ data }: any) => {
  // console.log('data -- ', data)
  let { header, item } = data

  return (
    <>
      <div className="bg-gray-50">
        <div className="px-4 py-12 mx-auto max-w-7xl sm:py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            {(data.title || data.subtitle) && (
              <SectionHeader
                title={data.title ? data.title : ''}
                subtitle={data.subtitle ? data.subtitle : ''}
              />
            )}

            {/* {header && (
              <h2 className="text-3xl font-extrabold text-center text-gray-900 sm:text-4xl">
                {header.title}
              </h2>
            )} */}
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              {item?.map((faq: any) => (
                <Disclosure as="div" key={faq.question} className="pt-6">
                  {({ open }) => (
                    <>
                      <dt className="text-lg">
                        <Disclosure.Button className="flex items-start justify-between w-full text-left text-gray-400">
                          <span className="font-bold tracking-wider text-gray-900">
                            {faq.question}
                          </span>
                          <span className="flex items-center ml-6 h-7">
                            <ChevronDownIcon
                              className={cn(
                                open ? '-rotate-180' : 'rotate-0',
                                'h-6 w-6 transform'
                              )}
                              aria-hidden="true"
                            />
                          </span>
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="pr-12 mt-2">
                        <p className="text-base prose text-gray-500">
                          {parse(faq.answer)}
                        </p>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQs
