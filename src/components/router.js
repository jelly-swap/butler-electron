import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Questions from './pages/questions';
import Terminal from './pages/terminal';
import BalanceOf from './pages/balanceOf';

const ReactRouter = () => (
  <Switch>
    <Route exact path='/' component={() => <Questions />} />
    <Route exact path='/terminal' component={() => <Terminal />} />
    <Route exact path='/balanceOf' component={() => <BalanceOf />} />
  </Switch>
);

export default ReactRouter;
