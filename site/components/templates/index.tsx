import dynamic from 'next/dynamic'
export { default as Layout } from './_defaultLayout'
export { default as CourseLayout } from './_courseLayout'
export { default as PageNotFound } from './PageNotFound'
import { useQuery } from 'react-query'

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
const ProductReviews = dynamic(
  () => import('@components/organisms/Product/ProductReviews')
)

export const Section = ({ section, genericData }: any) => {
  console.log('rendering:', section.collection)
  // console.log('genericData: ', genericData ? genericData : 'no genericData')

  switch (section.collection) {
    // General
    case 'BasicContent':
      return <BasicContent data={section.item} genericData={genericData} />
      break
    case 'CallToAction':
      return <CallToAction data={section.item} genericData={genericData} />
      break
    case 'Hero':
      return <Hero data={section.item} genericData={genericData} />
      break
    case 'Team':
      return <Team data={section.item} genericData={genericData} />
      break
    case 'FeatureMajor':
      return <FeatureMajor data={section.item} genericData={genericData} />
      break
    case 'FeatureList':
      return <FeatureList data={section.item} genericData={genericData} />
      break

    // // Posts
    // case 'PostsAll':
    //   return <PostsAll data={section.item} genericData={genericData} />
    //   break
    // case 'PostsRecent':
    //   return <PostsRecent data={section.item} genericData={genericData} />
    //   break

    // // Products
    // case 'ProductsAll':
    //   return <ProductsAll data={section.item} genericData={genericData} />
    //   break
    case 'ProductsFeatured':
      return <ProductsFeatured data={section.item} genericData={genericData} />
      break

    // case 'ProductComponents':
    //   return <ProductComponents data={section.item} genericData={genericData} />
    //   break
    // case 'ProductFAQs':
    //   return <ProductFAQs data={section.item} genericData={genericData} />
    //   break
    // case 'ProductPeek':
    //   return <ProductPeek data={section.item} genericData={genericData} />
    //   break
    // case 'ProductPricing':
    //   return <ProductPricing data={section.item} genericData={genericData} />
    //   break
    // case 'ProductReviews':
    //   return <ProductReviews data={section.item} genericData={genericData} />
    //   break

    default:
      return <></>
  }
}
