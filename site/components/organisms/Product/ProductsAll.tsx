import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getProducts } from '@lib/queries'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const CardProduct = dynamic(
  () => import('@components/molecules/Card/CardProduct')
)

export default function ProductsAll({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)

  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getProducts(
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
        <div className="bg-gray-100">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="max-w-2xl py-16 mx-auto text-center sm:py-24 lg:py-32 lg:max-w-none">
              <ProseHeading
                content={sectionData?.text ? sectionData.text : ''}
              />

              <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6">
                {sectionData.products?.map((item: any) => (
                  <CardProduct key={item.id} data={item} colors={colors} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
