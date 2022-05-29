import dynamic from 'next/dynamic'
export { default as Layout } from './_defaultLayout'
export { default as CourseLayout } from './_courseLayout'
export { default as PageNotFound } from './PageNotFound'

const CallToAction = dynamic(() => import('@components/organisms/CallToAction'))
const Content = dynamic(() => import('@components/organisms/Content'))
const CourseSummary = dynamic(
  () => import('@components/organisms/Course/CourseSummary')
)
const CourseContent = dynamic(
  () => import('@components/organisms/Course/CourseContent')
)
const CourseFooter = dynamic(
  () => import('@components/organisms/Course/CourseFooter')
)
const CourseHeader = dynamic(
  () => import('@components/organisms/Course/CourseHeader')
)
const CourseOutline = dynamic(
  () => import('@components/organisms/Course/CourseOutline')
)

const FAQs = dynamic(() => import('@components/organisms/FAQs'))
const FeatureMajor = dynamic(() => import('@components/organisms/Feature'))
const FeatureMinor = dynamic(() => import('@components/organisms/Feature'))
const Hero = dynamic(() => import('@components/organisms/Hero'))

const PostDetail = dynamic(
  () => import('@components/organisms/Post/PostDetail')
)
const PostsAll = dynamic(() => import('@components/organisms/Post/PostsAll'))
const PostsRecent = dynamic(
  () => import('@components/organisms/Post/PostsRecent')
)

const ProductSummary = dynamic(() => import('@components/organisms/Product'))
const ProductPeek = dynamic(() => import('@components/organisms/Product'))
const ProductPricing = dynamic(() => import('@components/organisms/Product'))
const ProductReviews = dynamic(() => import('@components/organisms/Product'))
const ProductsAll = dynamic(() => import('@components/organisms/Product'))
const ProductsFeatured = dynamic(() => import('@components/organisms/Product'))

const Team = dynamic(() => import('@components/organisms/Team'))

export const Section = ({ section }: any) => {
  console.log('rendering:', section.collection)

  switch (section.collection) {
    case 'ui_hero':
      return <Hero data={section.item} />
      break
    case 'ui_content':
      return <Content data={section.item} />
      break

    case 'ui_cards':
    case 'ui_courses':
    case 'ui_cta':
    case 'ui_faq':
    case 'ui_major_feature':
    case 'ui_minor_features':
    case 'ui_pricing':
    case 'ui_reviews':
    case 'ui_sneakpeek':
      return <></>

    default:
      return <></>
  }
}
