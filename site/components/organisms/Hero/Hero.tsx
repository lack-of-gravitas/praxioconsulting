import dynamic from 'next/dynamic'
import { useQueries } from 'react-query'
import { getHero } from '@lib/queries'

const HeroTextOnly = dynamic(
  () => import('@components/molecules/Hero/HeroTextOnly')
)
const HeroCenter = dynamic(
  () => import('@components/molecules/Hero/HeroCenter')
)
const HeroFullScreen = dynamic(
  () => import('@components/molecules/Hero/HeroFullScreen')
)

export default function Hero({ data, colors }: any) {
  // console.log(data.collection, '(received data) ', data)
  let results: any = useQueries([
    {
      queryKey: [data.collection, data.id],
      queryFn: async () =>
        getHero(data.id, data.pages_id ? 'PageSections' : 'ProductSections'),
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
      {sectionData?.style === 'full' && (
        <HeroFullScreen
          data={sectionData ? sectionData : null}
          colors={colors}
        />
      )}
      {sectionData?.style === 'textonly' && (
        <HeroTextOnly data={sectionData ? sectionData : null} colors={colors} />
      )}
      {sectionData?.style === 'center' && (
        <HeroCenter data={sectionData ? sectionData : null} colors={colors} />
      )}
    </>
  )
}
