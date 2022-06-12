import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { Navbar, Footer } from '@components/organisms'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { PageNotFound } from '@components/templates'

import { Button } from '@components/atoms'
import { LoadingDots } from '@components/atoms'
// import type { Page } from 'types/page'
import { useQuery } from 'react-query'

const FeatureBar = dynamic(() => import('@components/organisms/FeatureBar'))

const Layout: React.FC = ({ children }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  // get brand info
  const getdata = async () =>
    await (
      await fetch(
        `${process.env.NEXT_PUBLIC_REST_API}/Brands` +
          `?fields=name,tagline,lightLogo,darkLogo,primaryColor,accentColor,homepage.slug,` +
          `header.collection,header.item.name,header.item.slug,` +
          `footer.id,footer.sort,footer.item.name,footer.item.links.collection,footer.item.links.sort,footer.item.links.item.name,footer.item.links.item.slug` +
          `&filter[domain][_eq]=${process.env.NEXT_PUBLIC_BRAND}`
      )
    ).json()

  const { status, data, error, isFetching, isSuccess }: any = useQuery(
    'brand',
    getdata,
    { cacheTime: Infinity, staleTime: 1000 * 60 * 10 }
  )

  if (isFetching) {
    return <div>Loading...</div>
  }
  if (!data || data.data.length === 0) {
    return <PageNotFound />
  }

  return (
    <div className="relative">
      <Navbar data={data.data[0]} />
      <main>{children}</main>
      <Footer data={data.data[0]} />
      <FeatureBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <Button className="mx-5" onClick={() => onAcceptCookies()}>
            Accept cookies
          </Button>
        }
      />
    </div>
  )
}

export default Layout
