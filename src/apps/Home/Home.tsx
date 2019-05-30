import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

import Calendar from "apps/Calendar";
import Intercom from "apps/Intercom";
import Settings from "apps/Settings";
import Timer from "apps/Timer";
import Video from "apps/Video";
import Weather from "apps/Weather";

type Props = {
  history: History;
};

const Home: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">
      <div className="row flex-grow-1">
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(Intercom.path);
          }}
        >
          speaker_phone
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(Calendar.path);
          }}
        >
          calendar_today
        </div>
        <div
          className="col app-button icon-button mdi md-48 mdi-weather-partlycloudy"
          onClick={() => {
            history.push(Weather.path);
          }}
        />
      </div>
      <div className="row flex-grow-1">
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(Video.path);
          }}
        >
          videocam
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(Timer.path);
          }}
        >
          timer
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(Settings.path);
          }}
        >
          settings
        </div>
      </div>
    </div>
    <div className="scroll-container">
      <div className="scroll-button icon-button material-icons md-48">
        keyboard_arrow_up
      </div>
      <div className="scroll-indicator" />
      <div className="scroll-button icon-button material-icons md-48">
        keyboard_arrow_down
      </div>
    </div>
  </div>
);

export default {
  app: withRouter(Home),
  path: "/"
};
