import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import routes from './routeslist';

const Routes = () => (
  <div>
    <BrowserRouter>
      <Switch>
        {routes.map((route) => (
          <Route key={route.path} exact path={route.path} component={route.component} />
        ))}
      </Switch>
    </BrowserRouter>
  </div>
);

export default Routes;
