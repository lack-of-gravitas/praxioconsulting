import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getBasicContent } from '@lib/queries'
import { BackgroundDots } from '@components/atoms'
import { HeaderSection, ProseGeneral } from '@components/molecules'

export default function BasicContent({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)
  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getBasicContent(
          data.id,
          data.pages_id ? 'PageSections' : 'ProductSections'
        ),
      cacheTime: Infinity,
    },
  ])

  let sectionData: any = []
  if (!results[0].isFetching) {
    sectionData = results[0].data.data[0].item
    // console.log('fetched BasicContent: ', sectionData)
  }
  return (
    <>
      <div className="relative py-16 overflow-hidden bg-white">
        <BackgroundDots />
        {sectionData && (
          <div className="relative px-4 sm:px-6 lg:px-4">
            {(sectionData.title || sectionData.subtitle) && (
              <HeaderSection
                title={sectionData.title ? sectionData.title : ''}
                subtitle={sectionData.subtitle ? sectionData.subtitle : ''}
              />
            )}
            {sectionData.content && (
              <ProseGeneral content={sectionData.content} />
            )}
          </div>
        )}
      </div>
    </>
  )
}
