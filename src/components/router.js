import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Questions = lazy(() => import('./pages/questions'));
const Terminal = lazy(() => import('./pages/terminal'));

const ReactRouter = () => (
  <Suspense fallback={<h2>Loading...</h2>}>
    <Switch>
      <Route exact path='/' component={Questions} />
      <Route path='/terminal' component={Terminal} />
    </Switch>
  </Suspense>
);

export default ReactRouter;
