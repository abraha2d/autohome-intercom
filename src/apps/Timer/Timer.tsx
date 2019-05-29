import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

export const PATH = "/timer";

type Props = {
  history: History;
};

const Timer: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Timer!</div>
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

export default withRouter(Timer);
