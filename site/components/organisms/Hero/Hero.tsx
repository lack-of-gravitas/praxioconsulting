import dynamic from 'next/dynamic'

const HeroTextOnly = dynamic(
  () => import('@components/molecules/Hero/HeroTextOnly')
)
const HeroCenter = dynamic(
  () => import('@components/molecules/Hero/HeroCenter')
)
const HeroFullScreen = dynamic(
  () => import('@components/molecules/Hero/HeroFullScreen')
)

export default function Hero({ data, genericData }: any) {
  return (
    <>
      {data.style === 'full' && <HeroFullScreen data={data} />}
      {data.style === 'textonly' && <HeroTextOnly data={data} />}
      {data.style === 'center' && <HeroCenter data={data} />}
    </>
  )
}
