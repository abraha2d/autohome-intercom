import React from "react";
import { Route, Switch } from "react-router";

import Calendar, { PATH as CalendarPath } from "apps/Calendar";
import Home, { PATH as HomePath } from "apps/Home";
import Intercom, { PATH as IntercomPath } from "apps/Intercom";
import Settings, { PATH as SettingsPath } from "apps/Settings";
import Timer, { PATH as TimerPath } from "apps/Timer";
import Video, { PATH as VideoPath } from "apps/Video";
import Weather, { PATH as WeatherPath } from "apps/Weather";

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
          <Route path={IntercomPath} component={Intercom} />
          <Route path={CalendarPath} component={Calendar} />
          <Route path={WeatherPath} component={Weather} />
          <Route path={VideoPath} component={Video} />
          <Route path={TimerPath} component={Timer} />
          <Route path={SettingsPath} component={Settings} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
