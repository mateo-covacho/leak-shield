import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import { getSession } from "next-auth/react";
export default function Home({ user }: { user: any }) {
  return (
    <>
      <Head>
        <title>Leak shield | Detect who is leaking your content</title>
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
          crossOrigin='anonymous'
        />
      </Head>
      <main>
        <h1>Leak shield</h1>
        <h2>Detect who is leaking your [paltaforms] content</h2>
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  // redirect if not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  } else if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: { user: session["user"] },
  };
}
