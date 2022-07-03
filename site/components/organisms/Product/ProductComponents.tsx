import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getProductComponents } from '@lib/queries'
const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)

export default function ProductComponents({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)

  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getProductComponents(
          data.id,
          data.pages_id ? 'PageSections' : 'ProductSections'
        ),
      cacheTime: Infinity,
    },
  ])

  let sectionData: any = []
  if (!results[0].isFetching) {
    sectionData = results[0].data
    // console.log('fetched:', data.collection, sectionData)
  }

  return (
    <>
      {sectionData && (
        <div className="bg-white">
          <div className="items-center max-w-2xl grid-cols-1 px-4 py-24 mx-auto gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
            <div>
              <ProseHeading
                content={sectionData?.text ? sectionData.text : ''}
              />
              {/* each course / service */}
              {sectionData.items &&
                sectionData.items.map((product: any) => (
                  <>
                    <h3
                      key={product.sort}
                      className="pt-16 text-xl font-extrabold text-gray-900"
                    >
                      {product.collection.slice(0, -1)}: {product.item.name}
                    </h3>

                    <p className="mx-auto mt-6 text-gray-500 text-md">
                      {product.item.description}
                    </p>
                    <dl className="grid grid-cols-1 mt-4 gap-x-6 gap-y-10 sm:grid-cols-3 sm:gap-y-16 lg:gap-x-8">
                      {product.item.modules &&
                        product.item.modules.map((module: any) => (
                          <>
                            <div
                              key={module.sort}
                              className="pt-4 border-t border-gray-200"
                            >
                              <dt className="font-medium text-gray-900">
                                {module.item.name}
                              </dt>
                              <dd className="mt-2 text-sm text-gray-500">
                                {module.item.description}
                              </dd>
                            </div>
                          </>
                        ))}
                    </dl>
                  </>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* This example requires Tailwind CSS v2.0+ */
const features = [
  { name: 'Origin', description: 'Designed by Good Goods, Inc.' },
  {
    name: 'Material',
    description:
      'Solid walnut base with rare earth magnets and powder coated steel card cover',
  },
  { name: 'Dimensions', description: '6.25" x 3.55" x 1.15"' },
  { name: 'Finish', description: 'Hand sanded and finished with natural oil' },
  { name: 'Includes', description: 'Wood card tray and 3 refill packs' },
  {
    name: 'Considerations',
    description:
      'Made from natural materials. Grain and color vary with each item.',
  },
]
