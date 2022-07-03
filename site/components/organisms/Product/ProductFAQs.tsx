import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getProductFAQs } from '@lib/queries'

const ProseHeading = dynamic(
  () => import('@components/molecules/Prose/ProseHeading')
)
const ProseGeneral = dynamic(
  () => import('@components/molecules/Prose/ProseGeneral')
)
export default function ProductFAQs({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)
  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getProductFAQs(
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
        <div className="bg-gray-50">
          <div className="px-4 py-12 mx-auto divide-y divide-gray-200 max-w-7xl sm:px-6 lg:py-16 lg:px-8">
            <div className="relative z-10 p-12">
              <div className="text-center">
                <ProseHeading
                  content={sectionData?.text ? sectionData.text : ''}
                />
              </div>
            </div>

            <div className="mt-8">
              <dl className="divide-y divide-gray-200">
                {sectionData.items?.map((faq: any) => (
                  <div
                    key={faq.question}
                    className="pt-6 pb-8 md:grid md:grid-cols-12 md:gap-8"
                  >
                    <dt className="text-base font-medium text-gray-800 md:col-span-3">
                      {faq.question}
                    </dt>
                    <dd className="mt-2 md:mt-0 md:col-span-7">
                      <p className="prose text-gray-800 prose-base">
                        {faq.answer}
                      </p>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
