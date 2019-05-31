import * as React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
  location: Location;
  match: match;
};

const Thermostat: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Thermostat!</div>
    <ScrollBar onUpClick={() => {}} onDownClick={() => {}} barParams={false} />
  </div>
);

export default {
  app: withRouter(Thermostat),
  path: "/thermostat",
  name: "Thermostat",
  icon: "thermometer"
};
