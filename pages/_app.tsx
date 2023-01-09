import "../styles/globals.css";
import type { AppProps } from "next/app";

import Script from "next/script"
import { createClient, configureChains, WagmiConfig, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

const { provider, webSocketProvider } = configureChains([goerli], [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"/>
      <Script
        id='google-analytics'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process}', {
              page_path: window.location.pathname,
            });
          `,
          }}
      />
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  );
}
