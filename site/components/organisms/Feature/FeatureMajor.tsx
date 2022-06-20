import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getFeatureMajor } from '@lib/queries'

const FeatureMajorLeft = dynamic(
  () => import('@components/molecules/FeatureMajor/FeatureMajorLeft')
)
const FeatureMajorRight = dynamic(
  () => import('@components/molecules/FeatureMajor/FeatureMajorRight')
)

export default function FeatureMajor({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)
  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getFeatureMajor(
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
      {sectionData.style === 'left' && <FeatureMajorLeft data={sectionData} />}
      {sectionData.style === 'right' && (
        <FeatureMajorRight data={sectionData} />
      )}
    </>
  )
}
