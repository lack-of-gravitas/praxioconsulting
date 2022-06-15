import dynamic from 'next/dynamic'

const CallToActionCenter = dynamic(
  () => import('@components/molecules/CallToAction/CallToActionCenter')
)
const CallToActionJustified = dynamic(
  () => import('@components/molecules/CallToAction/CallToActionJustified')
)

export default function CallToAction({ data, brand }: any) {
  return (
    <>
      {data.style === 'center' && <CallToActionCenter data={data} />}
      {data.style === 'justified' && <CallToActionJustified data={data} />}
    </>
  )
}
