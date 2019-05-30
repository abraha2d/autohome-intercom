import React from "react";
import { Route, Switch } from "react-router";

import Calendar from "apps/Calendar";
import Home from "apps/Home";
import Intercom from "apps/Intercom";
import Settings from "apps/Settings";
import Timer from "apps/Timer";
import Video from "apps/Video";
import Weather from "apps/Weather";

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
          <Route exact path={Home.path} component={Home.app} />
          <Route path={Intercom.path} component={Intercom.app} />
          <Route path={Calendar.path} component={Calendar.app} />
          <Route path={Weather.path} component={Weather.app} />
          <Route path={Video.path} component={Video.app} />
          <Route path={Timer.path} component={Timer.app} />
          <Route path={Settings.path} component={Settings.app} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
