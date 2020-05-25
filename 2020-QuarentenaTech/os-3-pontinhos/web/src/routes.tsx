import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Help from './pages/Help';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/ajuda" component={Help} />
  </Switch>
);

export default Routes;
