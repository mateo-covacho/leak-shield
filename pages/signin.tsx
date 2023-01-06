import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { useAuthRequestChallengeEvm } from "@moralisweb3/next";
import { BUTTON } from "@blueprintjs/core/lib/esm/common/classes";
import { Button } from "@blueprintjs/core";

import Head from "next/head";
import "@blueprintjs/core/lib/css/blueprint.css";

import "@blueprintjs/icons/lib/css/blueprint-icons.css";
function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { requestChallengeAsync } = useAuthRequestChallengeEvm();
  const { push } = useRouter();

  const handleAuth = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({ connector: new MetaMaskConnector() });

    const { message } = await requestChallengeAsync({ address: account, chainId: chain.id });

    const signature = await signMessageAsync({ message });

    // redirect user after success authentication to '/user' page
    const { url } = await signIn("moralis-auth", { message, signature, redirect: false, callbackUrl: "/home" });
    /**
     * instead of using signIn(..., redirect: "/user")
     * we get the url from callback and push it to the router to avoid page refreshing
     */
    push(url);
  };

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta
          name='description'
          content="LeakShield is a powerful tool for content creators and managers to detect and respond to leaks and unauthorized distribution of their content. With LeakShield, you can protect your content and revenue by uniquely marking each user's version of the content with an identifiable mark."
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossorigin='anonymous'
        />
      </Head>
      <div className='container '>
        <div className='row'>
          <h3>Web3 Authentication</h3>
        </div>
        <div className='row'>
          <Button icon='log-in' intent='primary' onClick={handleAuth}>
            Authenticate via Metamask
          </Button>
        </div>
      </div>
    </>
  );
}

export default SignIn;
