import * as React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import Icon from "@mdi/react";
import { mdiHome } from "@mdi/js";

import apps from "apps";
import ScrollBar from "components/ScrollBar";

import { chunk } from "./utils";
import "./Home.css";

let chunkedApps = chunk(apps, 3);
chunkedApps = chunkedApps.map(chunk => {
  if (chunk.length === 3) return chunk;
  while (chunk.length !== 3) chunk.push({});
  return chunk;
});

type Props = {
  history: History;
  location: Location;
  match: match;
};

type State = {
  startRow: number;
};

class Home extends React.Component<Props, State> {
  readonly state: State = {
    startRow: 0
  };

  render() {
    const { history } = this.props;
    const { startRow } = this.state;
    return (
      <div className="content-container">
        <div className="content">
          {chunkedApps.slice(startRow, startRow + 2).map((chunk, idx) => (
            <div key={idx} className="row flex-grow-1">
              {chunk.map((app, idx2) =>
                app.name ? (
                  <div
                    className="col app-button icon-button"
                    key={app.name}
                    onClick={() => {
                      history.push(app.path);
                    }}
                  >
                    <Icon path={app.icon} size={"48px"} />
                  </div>
                ) : (
                  <div
                    key={`spacer-${idx}-${idx2}`}
                    className="col app-button spacer"
                  />
                )
              )}
            </div>
          ))}
        </div>
        <ScrollBar
          onUpClick={() =>
            this.setState({ startRow: Math.max(this.state.startRow - 1, 0) })
          }
          onDownClick={() =>
            this.setState({
              startRow: Math.min(
                this.state.startRow + 1,
                chunkedApps.length - 2
              )
            })
          }
          barParams={{
            min: 0,
            max: chunkedApps.length - 2,
            size: 2,
            start: startRow
          }}
        />
      </div>
    );
  }
}

export default {
  app: withRouter(Home),
  path: "/",
  icon: mdiHome
};
