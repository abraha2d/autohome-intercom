import * as React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiSettings } from "@mdi/js";

import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
  location: Location;
  match: match;
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
  icon: mdiSettings
};
