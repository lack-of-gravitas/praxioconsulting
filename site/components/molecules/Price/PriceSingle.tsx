export default function PriceSingle({ data, colors }: any) {
  console.log('price data: ', data)
  return (
    <>
      {data && (
        <>
          <div className="bg-white">
            <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
              <div className="pt-16 border-t border-gray-200 xl:grid xl:grid-cols-3 xl:gap-x-8">
                <div>
                  <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
                    {data.heading}
                  </h2>

                  <p className="mt-4 text-lg text-gray-500">{data.text}</p>
                </div>
                <div className="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
                  <ul role="list" className="divide-y divide-gray-200">
                    {features.slice(0, 3).map((feature, featureIdx) =>
                      featureIdx === 0 ? (
                        <li key={feature} className="flex py-4 md:py-0 md:pb-4">
                          <span
                            className="flex-shrink-0 w-6 h-6 text-green-500 material-symbols-outlined"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base text-gray-500">
                            {feature}
                          </span>
                        </li>
                      ) : (
                        <li key={feature} className="flex py-4">
                          <span
                            className="flex-shrink-0 w-6 h-6 text-green-500"
                            aria-hidden="true"
                          />
                          <span className="ml-3 text-base text-gray-500">
                            {feature}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

const features = [
  'Vitae in pulvinar odio id utobortis in inter.',
  'Sed sed id viverra viverra augue eget massa.',
  'Urna, gravida amet, a, integer venenatis.',
  'Lobortis sed pharetra amet vitae eleifend.',
  'Vitae in pulvinar odio id utobortis in inter.',
  'Sed sed id viverra viverra augue eget massa.',
  'Urna, gravida amet, a, integer venenatis.',
  'Lobortis sed pharetra amet vitae eleifend.',
  'Ullamcorper blandit a consequat donec elit aoreet.',
  'Dolor quo assumenda.',
  'Esse rerum distinctio maiores maiores.',
  'Eos enim officiis ratione.',
  'Tempore molestiae aliquid excepturi.',
  'Perspiciatis eveniet inventore eum et aliquam.',
]
