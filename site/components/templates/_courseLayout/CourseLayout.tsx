import cn from 'clsx'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
// import { useUI } from '@components/ui/context'
import { Navbar, Footer } from '@components/organisms'

import { useAcceptCookies } from '@lib/hooks/useAcceptCookies'

import { Button } from '@components/atoms'
import { LoadingDots } from '@components/atoms'
// import type { Page } from 'types/page'

const Loading = () => (
  <div className="flex items-center justify-center p-3 text-center w-80 h-80">
    <LoadingDots />
  </div>
)

const dynamicProps = {
  loading: Loading,
}

// interface Props {
//   pageProps: {
//     pages?: Page[]
//     categories: Category[]
//   }
// }

const Layout: React.FC = ({ children }) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies()

  return (
    <div className="relative">
      <main className="">{children}</main>
    </div>
  )
}

export default Layout
