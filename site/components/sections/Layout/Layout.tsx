import cn from 'clsx'
import s from './Layout.module.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/common'
import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'
import { Button, LoadingDots } from '@components/ui'
// import type { Page } from 'types/page'

const Loading = () => (
  <div className="flex items-center justify-center p-3 text-center w-80 h-80">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

const FeatureBar = dynamic(() => import('@components/common/FeatureBar'), {
  ...dynamicProps,
})

// interface Props {
//   pageProps: {
//     pages?: Page[]
//     categories: Category[]
//   }
// }

const Layout: React.FC = ({ children }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()
  // const { locale = 'en-US' } = useRouter()
  // const navBarlinks = categories.slice(0, 2).map((c) => ({
  //   label: c.name,
  //   href: `/search/${c.slug}`,
  // }))

  return (
    // <CommerceProvider locale={locale}>
    <div className={cn(s.root)}>
      {/* <Navbar links={navBarlinks} /> */}
      <main className="fit">{children}</main>
      {/* <Footer pages={pageProps.pages} /> */}
      {/* <CheckoutProvider>
          <SidebarUI links={navBarlinks} />
        </CheckoutProvider> */}
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
    /* </CommerceProvider> */
  )
}

export default Layout
