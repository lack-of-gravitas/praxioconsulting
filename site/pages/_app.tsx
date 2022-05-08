import '@assets/main.css'
import '@assets/chrome-bug.css'
// import 'keen-slider/keen-slider.min.css'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
// import { Head } from '@components/common'
// import { ManagedUIContext } from '@components/ui/context'

// supabase auth
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { MyUserContextProvider } from '@lib/hooks/useUser'
// end supabase imports

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      {/* <Head /> */}
      {/* <ManagedUIContext> */}
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </MyUserContextProvider>
      </UserProvider>

      {/* </ManagedUIContext> */}
    </>
  )
}
