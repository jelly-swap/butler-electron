import React from 'react';

import Questions from './components/questions';
import Header from './components/header';
import Footer from './components/footer';

import BitcoinImage from './css/background-coins/bitcoin2.svg';
import EtherImage from './css/background-coins/Eth2.svg';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <img className='bg-bitcoin-image' src={BitcoinImage} alt='bitcoin-image' />
      <img className='bg-ether-image' src={EtherImage} alt='ethereum-image' />
      <Header />
      <Questions />
      <Footer />
    </div>
  );
}

export default App;
