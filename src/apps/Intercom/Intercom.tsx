import React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiRadioHandheld } from "@mdi/js";

import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
  location: Location;
  match: match;
};

const Intercom: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Intercom!</div>
    <ScrollBar onUpClick={() => {}} onDownClick={() => {}} barParams={false} />
  </div>
);

export default {
  app: withRouter(Intercom),
  path: "/intercom",
  name: "Intercom",
  icon: mdiRadioHandheld
};
