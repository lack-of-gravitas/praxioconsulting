import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getProductPricing } from '@lib/queries'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)

const Prices = dynamic(() => import('@components/molecules/Price/Prices'))

export default function ProductPricing({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)

  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getProductPricing(
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
        <div className="">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
              <div className="">
                <ProseHeading
                  content={sectionData?.text ? sectionData.text : ''}
                />
              </div>
              {sectionData.prices ? (
                <Prices data={sectionData.prices} />
              ) : (
                <>Loading prices...</>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
