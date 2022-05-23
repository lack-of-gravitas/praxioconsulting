import '@assets/main.css'
import '@assets/chrome-bug.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// https://prateeksurana.me/blog/mastering-data-fetching-with-react-query-and-next-js/

import { FC, useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/organisms'
// import { ManagedUIContext } from '@components/ui/context'

// supabase auth
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { MyUserContextProvider } from '@lib/hooks/useUser'
// end supabase imports

const Noop: FC = ({ children }) => <>{children}</>

// // Create a client
// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
//     },
//   },
// })

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
          },
        },
      })
  )

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <Head />
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />{' '}
            </Hydrate>
          </QueryClientProvider>
        </MyUserContextProvider>
      </UserProvider>
    </>
  )
}
