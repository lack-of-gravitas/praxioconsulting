// expect to get page data which contains all section ids for that page
// https://klubs.azurewebsites.net/items/pages?fields=*,sections.*&filter[brand][domain][_eq]=https://therunningklub.com&filter[slug][_eq]=privacy

// import dynamic components to render

// query and render each sections details
import { getPageSection } from '@lib/queries'
import dynamic from 'next/dynamic'

export default function About({ data }: any) {
  // // for each id in data.sections, query for the section details
  // const sectionData = data.sections.map((section: any) => {
  //   getPageSection(section.id)
  // })
  // // for each sectionData, render component
  // const sections = sectionData.map((section: any) => {
  //   const Section = dynamic(
  //     () => import(`@components/organisms/${section.collection}`),
  //     {
  //       ssr: false,
  //       loading: () => <div>Loading...</div>,
  //     }
  //   )
  //   return <Section key={section.id} data={section} />
  // })
}
