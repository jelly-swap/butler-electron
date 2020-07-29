import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Questions from './pages/questions';
import ServerONPages from './pages/serverONPages';
import { Authentication } from './pages/Authentication/Authentication';

import { Provider as ServerPortContext } from '../context/ServerPortContext';

const ReactRouter = () => {
  return (
    <ServerPortContext>
      <Switch>
        <Route exact path='/' component={() => <Authentication />} />
        <Route exact path='/questions' component={() => <Questions />} />
        <ServerONPages />
      </Switch>
    </ServerPortContext>
  );
};

export default ReactRouter;
