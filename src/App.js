import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";
import history from "./app/history";
import siteRoutes, { defaultRoute } from './Routes';
import './i18n';

const Loader = () => {
  return (
    <span>Loading...</span>
  );
};

function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Redirect to={defaultRoute.path} />
          </Route>
          {siteRoutes.map((route) => (
            <Route
              key={`base_{route.path}`}
              exact
              path={route.path}
              component={route.comp}
            />
          ))}
        </Switch>
      </Router>
    </React.Suspense>
  );
}

export default App;
