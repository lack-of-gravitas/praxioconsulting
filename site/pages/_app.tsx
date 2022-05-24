import '@assets/main.css'
import '@assets/chrome-bug.css'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getBrand } from '@lib/queries'
// https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/

import { FC, useEffect, useRef } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/organisms'
// import { ManagedUIContext } from '@components/ui/context'

// supabase auth
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { MyUserContextProvider } from '@lib/hooks/useUser'
// end supabase imports

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
          // cacheTime: Infinity,
          staleTime: 1000 * 60 * 10, // 10 minutes
        },
      },
    })
  )

  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
              <Head />
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
          </QueryClientProvider>
        </MyUserContextProvider>
      </UserProvider>
    </>
  )
}
