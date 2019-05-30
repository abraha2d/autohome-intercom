import * as React from "react";
import { withRouter } from "react-router-dom";
import { History } from "history";

import apps from "apps";
import { chunk } from "apps/Home/utils";

type Props = {
  history: History;
};

const chunkedApps = chunk(apps, 3);

const Home: React.FC<Props> = ({ history }) => (
  <div className="content-container">
    <div className="content">
      {chunkedApps.map(chunk => (
        <div className="row flex-grow-1">
          {chunk.map(app => (
            <div
              className={`col app-button icon-button mdi md-48 mdi-${app.icon}`}
              onClick={() => {
                history.push(app.path);
              }}
            />
          ))}
        </div>
      ))}
    </div>
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
  app: withRouter(Home),
  path: "/",
  icon: "home"
};
