import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getFeatureList } from '@lib/queries'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)

export default function FeatureList({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)

  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getFeatureList(
          data.id,
          data.pages_id ? 'PageSections' : 'ProductSections'
        ),
      cacheTime: Infinity,
    },
  ])

  let sectionData: any = []
  if (!results[0].isFetching) {
    sectionData = results[0].data.data[0].item
    // console.log('fetched:', data.collection, sectionData)
  }

  return (
    <>
      {sectionData && (
        <div className="bg-white">
          <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:py-24 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <ProseHeading
                content={sectionData?.text ? sectionData.text : ''}
              />
            </div>
            <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
              {sectionData.items &&
                sectionData.items.map((item: any) => (
                  <>
                    <div key={item.heading} className="relative">
                      <dt>
                        <span
                          aria-hidden="true"
                          className="absolute w-6 h-6 text-green-500 material-symbols-outlined"
                        >
                          {item.icon}
                        </span>

                        <p className="text-lg font-medium leading-6 text-gray-800 ml-9">
                          {item.heading}
                        </p>
                      </dt>
                      <dd className="mt-2 text-base text-gray-500 ml-9">
                        {item.text}
                      </dd>
                    </div>
                  </>
                ))}
            </dl>
          </div>
        </div>
      )}
    </>
  )
}
