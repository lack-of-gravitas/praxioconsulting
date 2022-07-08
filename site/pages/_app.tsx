import '@assets/main.css'
import '@assets/chrome-bug.css'
import { QueryClient, QueryClientProvider, Hydrate } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { FC, useEffect, useRef } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/organisms'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // https://react-query.tanstack.com/guides/window-focus-refetching
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
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <Head />
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
          <ReactQueryDevtools initialIsOpen={false} />
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
