import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";
import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
};

const Settings: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Settings!</div>
    <ScrollBar onUpClick={() => {}} onDownClick={() => {}} barParams={false} />
  </div>
);

export default {
  app: withRouter(Settings),
  path: "/settings",
  name: "Settings",
  icon: "settings"
};
