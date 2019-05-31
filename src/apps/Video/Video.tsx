import * as React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
  location: Location;
  match: match;
};

const Video: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">Hi, this is Video!</div>
    <ScrollBar onUpClick={() => {}} onDownClick={() => {}} barParams={false} />
  </div>
);

export default {
  app: withRouter(Video),
  path: "/video",
  name: "Video",
  icon: "cctv"
};
