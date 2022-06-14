import dynamic from 'next/dynamic'

const FeatureMajorLeft = dynamic(
  () => import('@components/molecules/FeatureMajor/FeatureMajorLeft')
)
const FeatureMajorRight = dynamic(
  () => import('@components/molecules/FeatureMajor/FeatureMajorRight')
)

export default function FeatureMajor({ data, genericData }: any) {
  return (
    <>
      {data.style === 'left' && <FeatureMajorLeft data={data} />}
      {data.style === 'right' && <FeatureMajorRight data={data} />}
    </>
  )
}
