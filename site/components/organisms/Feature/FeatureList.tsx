import Link from 'next/link'
import Image from 'next/image'
import { Check as CheckIcon, Cross as CrossIcon } from '@components/atoms/Icons'
import { SectionHeader } from '@components/molecules'

const MinorFeatures = ({ data }: any) => {
  let { header, perks } = data

  return (
    <>
      <div className="bg-white">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          {(data.title || data.subtitle) && (
            <SectionHeader
              title={data.title ? data.title : ''}
              subtitle={data.subtitle ? data.subtitle : ''}
            />
          )}

          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <dl className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-auto sm:grid-rows-auto sm:grid-flow-col sm:gap-x-6 sm:gap-y-10 lg:gap-x-8">
              {perks?.slice(0, Math.ceil(perks.length / 2)).map((perk: any) => (
                <div key={perk.title} className="relative">
                  <dt>
                    {perk.included ? (
                      <CheckIcon
                        className="absolute w-6 h-6 text-green-900"
                        aria-hidden="true"
                      />
                    ) : (
                      <CrossIcon
                        className="absolute w-6 h-6 text-red-500"
                        aria-hidden="true"
                      />
                    )}

                    <p className="text-lg font-medium leading-6 text-gray-900 ml-9">
                      {perk.title}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 ml-9">
                    {perk.description}
                  </dd>
                </div>
              ))}

              {perks?.slice(Math.ceil(perks.length / 2)).map((perk: any) => (
                <div key={perk.title} className="relative">
                  <dt>
                    {perk.included ? (
                      <CheckIcon
                        className="absolute w-6 h-6 text-green-900"
                        aria-hidden="true"
                      />
                    ) : (
                      <CrossIcon
                        className="absolute w-6 h-6 text-red-500"
                        aria-hidden="true"
                      />
                    )}
                    <p className="text-lg font-medium leading-6 text-gray-900 ml-9">
                      {perk.title}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base text-gray-500 ml-9">
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
