import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Configuration from './pages/Configuration';
import Game from './pages/Game';
import Help from './pages/Help';
import Home from './pages/Home';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/ajuda" component={Help} />
    <Route path="/config" component={Configuration} />
    <Route path="/play" component={Game} />
  </Switch>
);

export default Routes;
