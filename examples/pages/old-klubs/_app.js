import App from "next/app";
import ErrorPage from "next/error";
import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "react-query";
import "tailwindcss/tailwind.css";
import { getStrapiURL } from "../utils";
import { getLocalizedParams } from "../utils/localize";

const queryClient = new QueryClient();
// Use of the <SessionProvider> is now mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;
  if (global === null) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <SessionProvider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        options={{
          // Stale Time controls how often the useSession in the client should
          // contact the server to sync the session state. Value in seconds.
          // e.g.
          // * 0  - Disabled (always use cache value)
          // * 60 - Sync session state with server if it's older than 60 seconds
          staleTime: 0,
          // Refetch Interval tells windows / tabs that are signed in to keep sending
          // a keep alive request (which extends the current session expiry) to
          // prevent sessions in open windows from expiring. Value in seconds.
          //
          // Note: If a session has expired when keep alive is triggered, all open
          // windows / tabs will be updated to reflect the user is signed out.
          refetchInterval: 0,
        }}
        session={pageProps.session}
      >
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   const { locale } = getLocalizedParams(appContext.ctx.query);

//   const appProps = await App.getInitialProps(appContext);

//   try {
//     const res = await fetch(getStrapiURL(`/globals?_locale=${locale}`));
//     const globalData = await res.json();

//     return { ...appProps, pageProps: { global: globalData[0] } };
//   } catch (error) {
//     return { ...appProps };
//   }
// };

export default MyApp;
