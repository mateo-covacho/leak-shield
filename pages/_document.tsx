import { Html, Head, Main, NextScript } from "next/document";
export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
        <link
          href='https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'
          rel='stylesheet'
          integrity='sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC'
          crossOrigin='anonymous'
        />
      </Head>
      <body style={{ height: "100vh", width: "100vw" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
