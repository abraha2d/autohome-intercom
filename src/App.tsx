import React from "react";
import { Route, Switch } from "react-router";
import Home, { PATH as HomePath } from "apps/Home";
import "App.css";

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
          <Route exact path={HomePath} component={Home} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
