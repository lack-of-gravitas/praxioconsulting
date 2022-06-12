import dynamic from 'next/dynamic'

const HeroTextOnly = dynamic(
  () => import('@components/molecules/Hero/HeroTextOnly')
)
const HeroCenter = dynamic(
  () => import('@components/molecules/Hero/HeroCenter')
)
const HeroLeft = dynamic(() => import('@components/molecules/Hero/HeroLeft'))
const HeroRight = dynamic(() => import('@components/molecules/Hero/HeroRight'))
const HeroFullScreen = dynamic(
  () => import('@components/molecules/Hero/HeroFullScreen')
)

export default function Hero({ brand, data }: any) {
  return (
    <>
      {data.style === 'full' && <HeroFullScreen data={data} />}
      {data.style === 'textonly' && <HeroTextOnly data={data} />}
      {data.style === 'center' && <HeroCenter data={data} />}
      {data.style === 'left' && <HeroLeft data={data} />}
      {data.style === 'right' && <HeroRight data={data} />}
    </>
  )
}
