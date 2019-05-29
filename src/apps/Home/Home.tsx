import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

export const PATH = "/";

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
            history.push("/intercom");
          }}
        >
          speaker_phone
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push("/calendar");
          }}
        >
          calendar_today
        </div>
        <div className="col app-button icon-button mdi md-48 mdi-weather-partlycloudy" />
      </div>
      <div className="row flex-grow-1">
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push("/video");
          }}
        >
          videocam
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push("/timer");
          }}
        >
          timer
        </div>
        <div
          className="col app-button icon-button material-icons md-48"
          onClick={() => {
            history.push("/settings");
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

export default withRouter(Home);
