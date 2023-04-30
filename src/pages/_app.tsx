import React from 'react';
import Head from 'next/head';
import type {AppProps} from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({Component, pageProps}: AppProps) {
  return (
    <>
      <Head>
        <title>DeliverEat!</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
