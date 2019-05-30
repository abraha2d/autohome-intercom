import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

type Props = {
  history: History;
};

const Calendar: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Calendar!</div>
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
  app: withRouter(Calendar),
  path: "/calendar"
};
