import React from "react";
import { Route, Switch } from "react-router";
import "App.css";

import apps from "apps";
import Home from "apps/Home";

function App() {
  return (
    <div className="main-container">
      <div className="status-bar">
        <div className="col left">May 22</div>
        <div className="col center">12:34 am</div>
        <div className="col right">
          75º <div className="mdi mdi-weather-sunny md-18" aria-hidden="true" />
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
}

export default App;
