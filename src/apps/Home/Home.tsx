import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";
import { PATH as IntercomPath } from "apps/Intercom";
import { PATH as CalendarPath } from "apps/Calendar";
import { PATH as WeatherPath } from "apps/Weather";
import { PATH as VideoPath } from "apps/Video";
import { PATH as TimerPath } from "apps/Timer";
import { PATH as SettingsPath } from "apps/Settings";

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
            history.push(IntercomPath);
          }}
        >
          speaker_phone
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(CalendarPath);
          }}
        >
          calendar_today
        </div>
        <div
          className="col app-button icon-button mdi md-48 mdi-weather-partlycloudy"
          onClick={() => {
            history.push(WeatherPath);
          }}
        />
      </div>
      <div className="row flex-grow-1">
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(VideoPath);
          }}
        >
          videocam
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(TimerPath);
          }}
        >
          timer
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push(SettingsPath);
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
