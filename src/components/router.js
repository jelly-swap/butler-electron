import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Questions from './pages/questions';
import Terminal from './pages/terminal';

const ReactRouter = () => (
  <HashRouter>
    <Switch>
      <Route exact path='/' component={() => <Questions />} />
      <Route path='/terminal' component={() => <Terminal />} />
    </Switch>
  </HashRouter>
);

export default ReactRouter;
