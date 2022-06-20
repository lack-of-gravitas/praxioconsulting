import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getProductPeek } from '@lib/queries'
import ReactPlayer from 'react-player'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)

const CardVideo = dynamic(() => import('@components/molecules/Card/CardVideo'))
export default function ProductPeek({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)

  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getProductPeek(
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

              <section className="container grid grid-cols-1 p-10 mx-auto duration-500 transform md:p-auto lg:grid-cols-2 2xl:grid-cols-2 gap-y-10 gap-x-10">
                {sectionData.videos?.map((item: any) => (
                  <>
                    <CardVideo key={item.id} data={item} colors={colors} />
                  </>
                ))}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
