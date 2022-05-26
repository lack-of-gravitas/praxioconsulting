import dynamic from 'next/dynamic'

export { default as Layout } from './_defaultLayout'
export { default as CourseLayout } from './_courseLayout'
import { useQuery, QueryClient, dehydrate } from 'react-query'

export { default as Home } from './Home'
export { default as PageNotFound } from './PageNotFound'

// export { default as About } from './About'
// export { default as Contact } from './Contact'
// export { default as Course } from './Course'
// export { default as CourseContent } from './CourseContent'
// export { default as Legalese } from './Legalese'
// export { default as Page } from './Page'
// export { default as Posts } from './Posts'
// export { default as Product } from './Product'
// export { default as Products } from './Products'
// export { default as UserAccount } from './UserAccount'

const Hero = dynamic(() => import('@components/organisms/Hero'))
const Content = dynamic(() => import('@components/organisms/Content'))

export const Section = ({ section }: any) => {
  console.log('rendering section:', section.collection)

  switch (section.collection) {
    case 'ui_content':
      return <Content data={section.item} />
      break
    case 'ui_hero':
      return <Hero data={section.item} />
      break

    default:
      return <></>
  }
}
