import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getCallToAction } from '@lib/queries'

const CallToActionCenter = dynamic(
  () => import('@components/molecules/CallToAction/CallToActionCenter')
)
const CallToActionJustified = dynamic(
  () => import('@components/molecules/CallToAction/CallToActionJustified')
)

export default function CallToAction({ data, colors }: any) {
  // console.log('CallToAction (received data) ', data)

  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getCallToAction(
          data.id,
          data.pages_id ? 'PageSections' : 'ProductSections'
        ),
      cacheTime: Infinity,
    },
  ])

  let sectionData: any = []
  if (!results[0].isFetching) {
    sectionData = results[0].data.data[0].item
    // console.log('fetched call to action: ', sectionData)
  }

  return (
    <>
      {sectionData?.style === 'center' && (
        <CallToActionCenter data={sectionData ? sectionData : null} />
      )}
      {sectionData?.style === 'justified' && (
        <CallToActionJustified data={sectionData ? sectionData : null} />
      )}
    </>
  )
}
