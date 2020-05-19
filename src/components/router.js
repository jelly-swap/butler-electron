import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Questions from './pages/questions';
import Terminal from './pages/terminal';
import BalanceOf from './pages/balanceOf';
import ServerONPages from './pages/serverONPages';

const ReactRouter = () => (
  <Switch>
    <Route exact path='/' component={() => <Questions />} />
    <ServerONPages />
  </Switch>
);

export default ReactRouter;
