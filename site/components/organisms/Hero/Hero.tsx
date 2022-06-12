import React, { FC } from 'react'
import { Container } from '@components/molecules'
import { ArrowRight as ArrowRightIcon } from '@components/atoms/Icons'
import Link from 'next/link'
import Image from 'next/image'
import { useQuery } from 'react-query'
import dynamic from 'next/dynamic'

const HeroTextOnly = dynamic(
  () => import('@components/molecules/Hero/HeroTextOnly')
)
const HeroCenter = dynamic(
  () => import('@components/molecules/Hero/HeroCenter')
)
const HeroLeft = dynamic(() => import('@components/molecules/Hero/HeroLeft'))
const HeroRight = dynamic(() => import('@components/molecules/Hero/HeroRight'))
const HeroFullScreen = dynamic(
  () => import('@components/molecules/Hero/HeroFullScreen')
)

export default function Hero({ brand, data }: any) {
  const { status, brandData, error, isFetching, isSuccess }: any =
    useQuery('brand')
  console.log('branddata:', brandData)

  return (
    <>
      <HeroFullScreen data={data} />

      <HeroTextOnly data={data} />
      <HeroCenter data={data} />
      <HeroLeft data={data} />
      <HeroRight data={data} />

      {/* // <section className="flex items-center justify-center py-40 text-gray-600 body-font 2xl:h-screen"> */}
      <Container>
        <section className="relative w-full h-screen text-white">
          <div>
            <div className="relative w-full h-screen text-white">
              {data.image !== '' ? (
                <Image
                  className="absolute top-0 left-0 object-cover w-full h-full"
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}/${data.image}`}
                  layout="fill"
                  alt={data.section_name}
                  priority
                />
              ) : (
                <>
                  <Image
                    className="absolute top-0 left-0 object-cover w-full h-full"
                    src="https://dummyimage.com/1280x720/000/fff"
                    layout="fill"
                    // height={1280}
                    // width={900}
                    alt=""
                    priority
                  />
                </>
              )}

              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full px-12 text-center">
                <div>
                  {data.title && (
                    <h1 className="text-3xl font-bold leading-tight md:text-6xl">
                      {data.title} <br className="hidden md:block" />
                    </h1>
                  )}
                  {data.subtitle && (
                    <h4 className="mb-16 text-xl leading-tight md:text-3xl">
                      {data.subtitle}
                    </h4>
                  )}

                  <div className="mt-8 lg:mt-0 lg:ml-8">
                    {data.buttons?.map(({ id, item }: any) => (
                      <div
                        key={id}
                        className="py-3 mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                      >
                        <Link
                          href={'/' + item.slug}
                          className="cursor-auto"
                          passHref
                        >
                          <button
                            type="button"
                            className={`relative inline-flex items-center px-4 py-5 text-lg font-medium text-white border border-transparent rounded-sm shadow-lg bg-primaryColor-800 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800`}
                          >
                            <ArrowRightIcon
                              className="w-6 h-6 mr-2 -ml-1"
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}
