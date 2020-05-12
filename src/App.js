import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';

import BitcoinImage from './css/background-coins/bitcoin2.svg';
import EtherImage from './css/background-coins/Eth2.svg';

import './App.scss';
import ReactRouter from './components/router';

function App() {
  return (
    <Router>
      <div className='App'>
        <img className='bg-bitcoin-image' src={BitcoinImage} alt='bitcoin' />
        <img className='bg-ether-image' src={EtherImage} alt='ethereum' />
        <Header />
        <ReactRouter />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
