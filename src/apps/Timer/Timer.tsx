import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";
import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
};

const Timer: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Timer!</div>
    <ScrollBar onUpClick={() => {}} onDownClick={() => {}} barParams={false} />
  </div>
);

export default {
  app: withRouter(Timer),
  path: "/timer",
  name: "Timer",
  icon: "timer"
};
