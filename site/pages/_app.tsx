import '@assets/main.css'
import '@assets/chrome-bug.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/organisms'
// import { ManagedUIContext } from '@components/ui/context'

// supabase auth
import { UserProvider } from '@supabase/supabase-auth-helpers/react'
import { supabaseClient } from '@supabase/supabase-auth-helpers/nextjs'
import { MyUserContextProvider } from '@lib/hooks/useUser'
// end supabase imports

const Noop: FC = ({ children }) => <>{children}</>
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
    },
  },
})

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <UserProvider supabaseClient={supabaseClient}>
        <MyUserContextProvider supabaseClient={supabaseClient}>
          <QueryClientProvider client={queryClient}>
            <Layout pageProps={pageProps}>
              <Component {...pageProps} />
            </Layout>{' '}
          </QueryClientProvider>
        </MyUserContextProvider>
      </UserProvider>
    </>
  )
}
