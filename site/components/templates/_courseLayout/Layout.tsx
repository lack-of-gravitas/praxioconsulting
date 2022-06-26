import dynamic from 'next/dynamic'
import { useQueries, useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { getBrand, getBrandColors } from '@lib/queries'

const Navbar = dynamic(() => import('@components/organisms/Navbar'))
const Footer = dynamic(() => import('@components/organisms/Footer'))
const PageNotFound = dynamic(() => import('@components/templates/PageNotFound'))

const Layout: React.FC = ({ children }: any) => {
  let results: any = useQueries([
    { queryKey: 'brand', queryFn: getBrand, cacheTime: Infinity },
    { queryKey: 'colors', queryFn: getBrandColors, cacheTime: Infinity },
  ])

  if (!results[0].isFetching || !results[1].isFetching) {
    const brand = results[0].data?.data[0]
    const colors = results[1].data

    return (
      <>
        <div className="relative">
          {/* <Navbar data={brand ? brand : ''} colors={colors ? colors : ''} /> */}
          <main>{children}</main>
          <Footer data={brand ? brand : ''} colors={colors ? colors : ''} />
        </div>
      </>
    )
  }
  // if (!results[0].isError) {
  //   return (
  //     <>
  //       <PageNotFound />
  //     </>
  //   )
  // }

  return <></>
}

export default Layout
