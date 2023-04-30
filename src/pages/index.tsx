import React from 'react';
import Navigation from '../components/navigation';
import Header from '../components/header';
import Section from '../components/section';
import Checkout from '../components/checkout';

export default function Home() {
  return (
    <>
      <Navigation />
      <Header/>
      <Checkout/>
    </>
  );
}
