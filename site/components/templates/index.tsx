import dynamic from 'next/dynamic'
export { default as Layout } from './_defaultLayout'
export { default as CourseLayout } from './_courseLayout'
export { default as PageNotFound } from './PageNotFound'
import { useQueries } from 'react-query'

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

const getBrandColors = async () =>
  await (
    await fetch(
      `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
        `?fields=primaryColor,accentColor` +
        `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
    )
  ).json()

export const Section = ({ section }: any) => {
  console.log('rendering:', section.collection)

  let results: any = useQueries([
    { queryKey: 'colors', queryFn: getBrandColors, cacheTime: Infinity },
  ])

  let brand = {}

  if (!results[0].isFetching) {
    brand = results[0].data.data[0]
    // console.log('fetched brand: ', brand)
  }

  switch (section.collection) {
    // General
    case 'BasicContent':
      return <BasicContent data={section.item} brand={brand} />
      break
    case 'CallToAction':
      return <CallToAction data={section.item} brand={brand} />
      break
    case 'Hero':
      return <Hero data={section.item} brand={brand} />
      break
    case 'Team':
      return <Team data={section.item} brand={brand} />
      break
    case 'FeatureMajor':
      return <FeatureMajor data={section.item} brand={brand} />
      break
    case 'FeatureList':
      return <FeatureList data={section.item} brand={brand} />
      break

    // Posts
    case 'PostsAll':
      return <PostsAll data={section.item} brand={brand} />
      break
    case 'PostsRecent':
      return <PostsRecent data={section.item} brand={brand} />
      break

    // Products
    case 'ProductsAll':
      return <ProductsAll data={section.item} brand={brand} />
      break
    case 'ProductsFeatured':
      return <ProductsFeatured data={section.item} brand={brand} />
      break

    // case 'ProductComponents':
    //   return <ProductComponents data={section.item} brand={brand} />
    //   break
    case 'ProductFAQs':
      return <ProductFAQs data={section.item} brand={brand} />
      break
    // case 'ProductPeek':
    //   return <ProductPeek data={section.item}  brand={brand}/>
    //   break
    // case 'ProductPricing':
    //   return <ProductPricing data={section.item} brand={brand} />
    //   break
    case 'ProductReviews':
      return <ProductReviews data={section.item} brand={brand} />
      break

    default:
      return <></>
  }
}
