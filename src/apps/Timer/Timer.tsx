import React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiTimer } from "@mdi/js";

import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
  location: Location;
  match: match;
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
  icon: mdiTimer
};
