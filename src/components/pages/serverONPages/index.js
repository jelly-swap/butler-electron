import React from 'react';
import { Route } from 'react-router-dom';

import Terminal from './terminal';
import BalanceOf from './balanceOf';

const ServerONPages = () => {
  return (
    <>
      <Route exact path='/terminal' component={() => <Terminal />} />
      <Route exact path='/balanceOf' component={() => <BalanceOf />} />
    </>
  );
};

export default ServerONPages;
