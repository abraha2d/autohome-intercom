import * as React from "react";
import { withRouter, match } from "react-router-dom";
import { History, Location } from "history";
import "./Home.css";

import { chunk } from "./utils";

import apps from "apps";
import ScrollBar from "components/ScrollBar";
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
    let { history } = this.props;
    const { startRow } = this.state;
    return (
      <div className="content-container">
        <div className="content">
          {chunkedApps.slice(startRow, startRow + 2).map((chunk, idx) => (
            <div key={idx} className="row flex-grow-1">
              {chunk.map((app, idx2) =>
                app.name ? (
                  <div
                    key={app.name}
                    className={`col app-button icon-button mdi md-48 mdi-${
                      app.icon
                    }`}
                    onClick={() => {
                      history.push(app.path);
                    }}
                  />
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
          barParams={false}
        />
      </div>
    );
  }
}

export default {
  app: withRouter(Home),
  path: "/",
  icon: "home"
};
