import Link from 'next/link'
import Image from 'next/image'
import { SectionHeader } from '@components/molecules'

export default function ProductReviews({ data }: any) {
  let { header, reviews } = data
  return (
    <>
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8 lg:flex lg:items-center lg:justify-between">
        <div className="relative mx-auto max-w-7xl">
          {(data.title || data.subtitle) && (
            <SectionHeader
              title={data.title ? data.title : ''}
              subtitle={data.subtitle ? data.subtitle : ''}
            />
          )}
          <div
            className={`text-center justify-items-stretch mt-12 max-w-lg mx-auto grid gap-5 lg:max-w-none lg:grid-cols-auto`}
          >
            {reviews.map((review: any, index: any) => (
              <div
                key={index}
                className="max-w-sm mx-auto overflow-hidden bg-white rounded-sm shadow-lg dark:bg-gray-800"
              >
                <Image
                  className="object-cover object-center w-full h-56"
                  src={review.image.formats.medium.url}
                  layout="responsive"
                  height={review.image.formats.medium.height}
                  width={review.image.formats.medium.height}
                  alt={review.image.name}
                />

                <div className="flex items-center px-6 py-3 bg-primaryColor-700">
                  {review.headline && (
                    <h1 className="text-lg font-semibold text-white">
                      {review.headline}
                    </h1>
                  )}
                </div>
                <div className="px-6 py-4">
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {review.name}
                  </h1>
                  <p className="py-2 text-gray-900 dark:text-gray-400">
                    {review.subname}
                  </p>
                  <p className="py-2 text-gray-700 dark:text-gray-400">
                    {review.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
