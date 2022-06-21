import dynamic from 'next/dynamic'
export { default as Layout } from './_defaultLayout'
export { default as CourseLayout } from './_courseLayout'
export { default as PageNotFound } from './PageNotFound'
import { useQueries } from 'react-query'
import { getBrandColors } from '@lib/queries'

const CallToAction = dynamic(() => import('@components/organisms/CallToAction'))
const BasicContent = dynamic(() => import('@components/organisms/BasicContent'))
const FeatureMajor = dynamic(
  () => import('@components/organisms/Feature/FeatureMajor')
)
const FeatureList = dynamic(
  () => import('@components/organisms/Feature/FeatureList')
)
const Hero = dynamic(() => import('@components/organisms/Hero'))
const Team = dynamic(() => import('@components/organisms/Team'))
const PostsAll = dynamic(() => import('@components/organisms/Post/PostsAll'))
const PostsRecent = dynamic(
  () => import('@components/organisms/Post/PostsRecent')
)
const ProductsAll = dynamic(
  () => import('@components/organisms/Product/ProductsAll')
)
const ProductsFeatured = dynamic(
  () => import('@components/organisms/Product/ProductsFeatured')
)
const ProductFAQs = dynamic(
  () => import('@components/organisms/Product/ProductFAQs')
)
const ProductPeek = dynamic(
  () => import('@components/organisms/Product/ProductPeek')
)
const ProductPricing = dynamic(
  () => import('@components/organisms/Product/ProductPricing')
)

const ProductComponents = dynamic(
  () => import('@components/organisms/Product/ProductComponents')
)

const ProductReviews = dynamic(
  () => import('@components/organisms/Product/ProductReviews')
)

export const Section = ({ section }: any) => {
  // console.log('rendering:', section.collection)
  let results: any = useQueries([
    { queryKey: 'colors', queryFn: getBrandColors, cacheTime: Infinity },
  ])

  let colors: any = {}
  if (!results[0].isFetching) {
    colors = results[0].data.data[0]
  }

  switch (section.collection) {
    // General
    case 'BasicContent':
      return <BasicContent data={section} colors={colors} />
      break
    case 'CallToAction':
      return <CallToAction data={section} colors={colors} />
      break
    case 'Hero':
      return <Hero data={section} colors={colors} />
      break
    case 'Team':
      return <Team data={section} colors={colors} />
      break
    case 'FeatureMajor':
      return <FeatureMajor data={section} bcolors={colors} />
      break
    case 'FeatureList':
      return <FeatureList data={section} colors={colors} />
      break

    // Posts
    case 'PostsAll':
      return <PostsAll data={section} colors={colors} />
      break
    case 'PostsRecent':
      return <PostsRecent data={section} colors={colors} />
      break

    // Products
    case 'ProductsAll':
      return <ProductsAll data={section} colors={colors} />
      break
    case 'ProductsFeatured':
      return <ProductsFeatured data={section} colors={colors} />
      break

    case 'ProductComponents':
      return <ProductComponents data={section} colors={colors} />
      break
    case 'ProductFAQs':
      return <ProductFAQs data={section} colors={colors} />
      break
    case 'ProductPeek':
      return <ProductPeek data={section} colors={colors} />
      break
    case 'ProductPricing':
      return <ProductPricing data={section} colors={colors} />
      break
    // case 'ProductReviews':
    //   return <ProductReviews data={section} colors={colors} />
    //   break

    default:
      return <></>
  }
}
