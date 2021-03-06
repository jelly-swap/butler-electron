import React, { useEffect } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import BitcoinImage from './css/background-coins/bitcoin2.svg';
import EtherImage from './css/background-coins/Eth2.svg';

import './App.scss';
import { BUTLER_VERSION } from './constants';

import Questions from './pages/questions';
import JellyTerminal from './pages/terminal';
import Balance from './pages/balance';
import Login from './pages/login';
import Tranasctions from './pages/transactions';

function App() {
  useEffect(() => {
    document.title = `Jelly Butler - v${BUTLER_VERSION}`;
  }, []);

  return (
    <HashRouter>
      <img className='bg-bitcoin-image' src={BitcoinImage} alt='bitcoin' />
      <img className='bg-ether-image' src={EtherImage} alt='ethereum' />
      <div className='App'>
        <Switch>
          <Route exact path='/' component={() => <Login />} />
          <Route exact path='/login' component={() => <Login />} />
          <Route exact path='/home' component={() => <Questions />} />
          <Route exact path='/terminal' component={() => <JellyTerminal />} />
          <Route exact path='/balance' component={() => <Balance />} />
          <Route exact path='/transactions' component={() => <Tranasctions />} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
