import * as React from "react";

type Props = {};

export const Home: React.FC<Props> = () => {
  return (
    <div className="content-container">
      <div className="content">
        <div className="row flex-grow-1">
          <div className="col app-button icon-button material-icons md-48">
            speaker_phone
          </div>
          <div className="col app-button icon-button material-icons md-48">
            calendar_today
          </div>
          <div className="col app-button icon-button mdi md-48 mdi-weather-partlycloudy" />
        </div>
        <div className="row flex-grow-1">
          <div className="col app-button icon-button material-icons md-48">
            videocam
          </div>
          <div className="col app-button icon-button material-icons md-48">
            timer
          </div>
          <div className="col app-button icon-button material-icons md-48">
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
};
