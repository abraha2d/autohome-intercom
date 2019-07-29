import React from "react";
import PropTypes from "prop-types";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiRadioHandheld } from "@mdi/js";

import ScrollBar from "components/ScrollBar";

type Props = {
  history: History;
  location: Location;
  match: match;
};

type State = {
  response: string;
};

class Intercom extends React.Component<Props, State> {
  readonly state: State = {
    response: "00"
  };

  startHandler = () => {
    this.context.startCall(this.state.response);
  };

  stopHandler = () => {
    this.context.stopCall();
  };

  render() {
    const { response } = this.state;
    return (
      <div className="content-container">
        <div className="content">
          <input
            type="number"
            value={response}
            onChange={e => this.setState({ response: e.target.value })}
          />
        </div>
        <ScrollBar
          onUpClick={() => {
            this.startHandler();
          }}
          onDownClick={() => {
            this.stopHandler();
          }}
          barParams={false}
        />
      </div>
    );
  }
}

(Intercom as any).contextTypes = {
  startCall: PropTypes.func,
  stopCall: PropTypes.func
};

export default {
  app: withRouter(Intercom),
  path: "/intercom",
  name: "Intercom",
  icon: mdiRadioHandheld
};
