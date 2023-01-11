import "../styles/globals.css";
import type { AppProps } from "next/app";

import Script from "next/script"
import { createClient, configureChains, WagmiConfig, goerli } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";
import ReactGA from 'react-ga';
import { useEffect } from "react";

const { provider, webSocketProvider } = configureChains([goerli], [publicProvider()]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    ReactGA.initialize(`G-45C7JW50VB`);
    ReactGA.pageview(window.location.pathname + window.location.search);
  })
    return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Component {...pageProps} />
      </SessionProvider>
    </WagmiConfig>
  );
}
