import React from 'react';
import { HashRouter } from 'react-router-dom';

import Header from './components/header';
import Footer from './components/footer';
import ReactRouter from './components/router';

import { Provider as PasswordContext } from './context/PasswordContext';

import BitcoinImage from './css/background-coins/bitcoin2.svg';
import EtherImage from './css/background-coins/Eth2.svg';

import './App.scss';

function App() {
  return (
    <HashRouter>
      <div className='App'>
        <img className='bg-bitcoin-image' src={BitcoinImage} alt='bitcoin' />
        <img className='bg-ether-image' src={EtherImage} alt='ethereum' />
        <PasswordContext>
          <Header />
          <ReactRouter />
          <Footer />
        </PasswordContext>
      </div>
    </HashRouter>
  );
}

export default App;
