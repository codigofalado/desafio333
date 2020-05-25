import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Configuration from './pages/Configuration';
import Help from './pages/Help';
import Home from './pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/ajuda" component={Help} />
    <Route path="/config" component={Configuration} />
  </Switch>
);

export default Routes;
