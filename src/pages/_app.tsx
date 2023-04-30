import 'bootstrap/dist/css/bootstrap.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>ISW TP 6</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
