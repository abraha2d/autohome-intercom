import React from "react";
import { Route, Switch, match, withRouter } from "react-router";
import { History, Location } from "history";
import Icon from "@mdi/react";
import { mdiCancel, mdiKeyboardBackspace, mdiSettings } from "@mdi/js";

import apps from "apps";
import Home from "apps/Home";
import Weather from "apps/Weather";
import Settings from "apps/Settings";

import "./App.css";

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
              className="col left icon-button"
              onClick={() => history.go(-1)}
            >
              <Icon path={mdiKeyboardBackspace} size={"24px"} />
            </div>
          )}
        />
      </Switch>
      <div className="col center">12:34 am</div>

      <Switch>
        {/* TODO: consolidate weather widget to somewhere */}
        <Route
          exact
          path={Home.path}
          component={() => (
            <div
              className="col right icon-button"
              onClick={() => history.push(Weather.path)}
            >
              {/* TODO: implement properly */}
              --º&nbsp;&nbsp;
              <Icon path={mdiCancel} size={"24px"} />
            </div>
          )}
        />
        <Route
          path={Settings.path}
          component={() => (
            <div
              className="col right icon-button"
              onClick={() => history.push(Weather.path)}
            >
              {/* TODO: implement properly */}
              --º&nbsp;&nbsp;
              <Icon path={mdiCancel} size={"24px"} />
            </div>
          )}
        />
        <Route
          component={() => (
            <div
              className="col right icon-button"
              onClick={() => history.push("settings")}
            >
              <Icon path={mdiSettings} size={"24px"} />
            </div>
          )}
        />
      </Switch>
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
