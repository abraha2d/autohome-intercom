import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";
import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
};

const Weather: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Weather!</div>
    <ScrollBar onUpClick={() => {}} onDownClick={() => {}} barParams={false} />
  </div>
);

export default {
  app: withRouter(Weather),
  path: "/weather",
  name: "Weather",
  icon: "weather-partlycloudy"
};
