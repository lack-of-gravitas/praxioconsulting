import delve from 'dlv'
import Link from 'next/link'
import Image from 'next/image'
import { CheckIcon, XIcon, ArrowRightIcon } from '@heroicons/react/outline'
import RichContent from '../../organisms/ContentBlock/RichContent'

const MinorFeatures = ({ data }) => {
  // console.log("data ---", data);
  let { header, perks } = data
  // console.log('perks -- ', perks)

  return (
    <>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {header && (
            <div>
              <h2 className="text-base font-semibold text-primaryColor-600 uppercase tracking-wide">
                {header.title}
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900">
                {header.subtitle}
              </p>
              <p className="mt-4 text-lg text-gray-500">{header.text}</p>
            </div>
          )}
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-auto sm:grid-rows-auto sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
              {perks?.slice(0, Math.ceil(perks.length / 2)).map((perk) => (
                <div key={perk.title} className="relative">
                  <dt>
                    {perk.included ? (
                      <CheckIcon
                        className="absolute h-6 w-6 text-green-900"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        className="absolute h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                      {perk.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-9 text-base text-gray-500">
                    {perk.description}
                  </dd>
                </div>
              ))}

              {perks?.slice(Math.ceil(perks.length / 2)).map((perk) => (
                <div key={perk.title} className="relative">
                  <dt>
                    {perk.included ? (
                      <CheckIcon
                        className="absolute h-6 w-6 text-green-900"
                        aria-hidden="true"
                      />
                    ) : (
                      <XIcon
                        className="absolute h-6 w-6 text-red-500"
                        aria-hidden="true"
                      />
                    )}
                    <p className="ml-9 text-lg leading-6 font-medium text-gray-900">
                      {perk.title}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-9 text-base text-gray-500">
                    {perk.description}
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

export default MinorFeatures
