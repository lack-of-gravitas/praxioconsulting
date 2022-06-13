import dynamic from 'next/dynamic'

const CallToActionCenter = dynamic(
  () => import('@components/molecules/CallToAction/CallToActionCenter')
)
const CallToActionJustified = dynamic(
  () => import('@components/molecules/CallToAction/CallToActionJustified')
)

export default function CallToAction({ brand, data }: any) {
  return (
    <>
      {data.style === 'center' && <CallToActionCenter data={data} />}
      {data.style === 'center' && <CallToActionJustified data={data} />}
    </>
  )
}
