import React from "react";
import { Route, Switch, match, withRouter } from "react-router";
import { History, Location } from "history";
import {
  CALL_DIRECTION_INCOMING,
  CALL_STATUS_IDLE,
  callPropType,
  sipPropType
} from "react-sip";

import Icon from "@mdi/react";
import {
  mdiCallMade,
  mdiCallReceived,
  mdiKeyboardBackspace,
  mdiRadioHandheld,
  mdiSettings
} from "@mdi/js";

import { Howl } from "howler";

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

const touchSound = new Howl({
  src: ["assets/sounds/touch.wav"]
});

const handleTouch = () => {
  touchSound.play();
};

const App: React.FC<Props> = ({ history }, context) => (
  <div className="main-container" onClick={handleTouch}>
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

      {context.call.status !== CALL_STATUS_IDLE ? (
        <div
          className="col right icon-button"
          onClick={() => history.push("intercom")}
        >
          <Icon path={mdiRadioHandheld} size={"24px"} />
          {context.call.direction === CALL_DIRECTION_INCOMING ? (
            <Icon path={mdiCallReceived} size={"24px"} />
          ) : (
            <Icon path={mdiCallMade} size={"24px"} />
          )}
        </div>
      ) : (
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
                <Weather.app isWidget />
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
                <Weather.app isWidget />
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
      )}
    </div>
    <Switch>
      <Route exact path={Home.path} component={Home.app} />
      {apps.map(app => (
        <Route key={app.name} path={app.path} component={app.app} />
      ))}
    </Switch>
  </div>
);

(App as any).contextTypes = {
  sip: sipPropType,
  call: callPropType
};

export default withRouter(App);
