import React from "react";
import { Route, Switch, match, withRouter } from "react-router";
import { History, Location } from "history";
import "./App.css";

import apps from "apps";
import Home from "apps/Home";

type Props = {
  history: History;
  location: Location;
  match: match;
};

const App: React.FC<Props> = ({ history }) => (
  <div className="main-container">
    <div className="status-bar">
      <Switch>
        <Route
          exact
          path={Home.path}
          component={() => <div className="col left">May 22</div>}
        />
        <Route
          component={() => (
            <div
              className="col left icon-button mdi md-24 mdi-keyboard-backspace"
              onClick={() => history.go(-1)}
            />
          )}
        />
      </Switch>
      <div className="col center">12:34 am</div>
      <div className="col right">
        75º <div className="mdi md-18 mdi-weather-sunny" />
      </div>
    </div>
    <div className="content-container">
      <Switch>
        <Route exact path={Home.path} component={Home.app} />
        {apps.map(app => (
          <Route key={app.name} path={app.path} component={app.app} />
        ))}
      </Switch>
    </div>
  </div>
);

export default withRouter(App);
