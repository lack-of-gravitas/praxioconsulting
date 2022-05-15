import delve from 'dlv'
import Link from 'next/link'
import Image from 'next/image'
import {
  AnnotationIcon,
  GlobeAltIcon,
  LightningBoltIcon,
  ScaleIcon,
  MailIcon,
  ArrowRightIcon,
} from '@heroicons/react/outline'

import RichContent from '../RichContent'

const MajorFeature = ({ data }) => {
  let { header, style, image, content, buttons } = data

  function blockHeader() {
    return (
      <div className="relative">
        <h2 className="text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
          {header.title}
        </h2>
        <p className="max-w-3xl mx-auto mt-4 text-xl text-center text-gray-500">
          {header.text}
        </p>
      </div>
    )
  }

  function featureImageLeft() {
    return (
      <>
        <svg
          className="absolute hidden transform translate-x-1/2 translate-y-12 lg:block right-full"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>

        <div className="relative mt-12 sm:mt-16 lg:mt-12">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <RichContent content={content}></RichContent>
              {buttons.map((button, index) => (
                <div key={index} className="py-3 mt-3 sm:mt-0 sm:flex-shrink-0">
                  <Link
                    href={button.link.href}
                    className="cursor-auto"
                    passHref
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-3 text-lg font-medium text-white border border-transparent rounded-md shadow-lg bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                    >
                      {/* <ArrowRightIcon
                      className="w-6 h-6 mr-2 -ml-1"
                      aria-hidden="true"
                    /> */}
                      <span>{button.link.label}</span>
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="relative mt-10 -mx-4 lg:mt-0 lg:col-start-1">
              <svg
                className="absolute transform -translate-x-1/2 translate-y-16 left-1/2 lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={784}
                  height={404}
                  fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                />
              </svg>
              <Image
                className="relative mx-auto"
                src={image.formats.medium.url}
                layout="responsive"
                height={image.formats.medium.height}
                width={image.formats.medium.width}
                alt={image.name}
              />
            </div>
          </div>
        </div>
      </>
    )
  }
  function featureImageRight() {
    return (
      <>
        <svg
          className="absolute hidden transform -translate-x-1/2 lg:block left-full -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>
        <div className="relative mt-12 lg:mt-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <RichContent content={content}></RichContent>
            {buttons.map((button, index) => (
              <div key={index} className="py-3 mt-3 sm:mt-0 sm:flex-shrink-0">
                <Link href={button.link.href} className="cursor-auto" passHref>
                  <button
                    type="button"
                    className="relative inline-flex items-center px-4 py-3 text-lg font-medium text-white border border-transparent rounded-md shadow-lg bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                  >
                    {/* <ArrowRightIcon
                      className="w-6 h-6 mr-2 -ml-1"
                      aria-hidden="true"
                    /> */}
                    <span>{button.link.label}</span>
                  </button>
                </Link>
              </div>
            ))}
          </div>

          <div className="relative mt-10 -mx-4 lg:mt-0" aria-hidden="true">
            <svg
              className="absolute transform -translate-x-1/2 translate-y-16 left-1/2 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404"
            >
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={784}
                height={404}
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            <Image
              className="relative mx-auto"
              src={image.formats.medium.url}
              layout="responsive"
              height={image.formats.medium.height}
              width={image.formats.medium.width}
              alt={image.name}
            />
          </div>
        </div>
      </>
    )
  }
  function featureImageCenter() {
    return (
      <>
        <div className="relative pt-16 overflow-hidden bg-gray-50 sm:pt-24 lg:pt-24">
          <div className="max-w-full px-4 mx-auto text-center sm:px-6 sm:max-w-7xl lg:px-8 lg:max-w-7xl">
            <div className="flex justify-center">
              <RichContent content={content}></RichContent>
            </div>

            <div className="flex justify-center mt-8 lg:mt-0 lg:flex-shrink-0">
              {buttons.map((button, index) => (
                <div
                  key={index}
                  className="py-3 mt-3 sm:mt-0 sm:ml-3 sm:flex-shrink-0"
                >
                  <Link
                    href={button.link.href}
                    className="cursor-auto"
                    passHref
                  >
                    <button
                      type="button"
                      className="relative inline-flex items-center px-4 py-3 text-lg font-medium text-white border border-transparent rounded-md shadow-lg bg-primaryColor-700 hover:bg-primaryColor-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primaryColor-800"
                    >
                      {/* <ArrowRightIcon
                        className="w-6 h-6 mr-2 -ml-1"
                        aria-hidden="true"
                      /> */}
                      <span>{button.link.label}</span>
                    </button>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-12 -mb-10 sm:-mb-24 lg:-mb-80">
              <Image
                className="rounded-lg shadow-xl ring-1 ring-black ring-opacity-5"
                src={image.formats.large.url}
                layout="responsive"
                height={image.formats.large.height}
                width={image.formats.large.width}
                alt={image.name}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="py-16 overflow-hidden bg-gray-50 lg:py-15">
        <div className="relative max-w-xl px-4 mx-auto sm:px-6 lg:px-8 lg:max-w-7xl">
          {header && blockHeader()}
          {image && style === 'imageLeft' && featureImageLeft()}
          {image && style === 'imageRight' && featureImageRight()}
          {image && style === 'imageCenter' && featureImageCenter()}
        </div>
      </div>
    </>
  )
}

MajorFeature.defaultProps = {}

export default MajorFeature
