import React from "react";
import PropTypes from "prop-types";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiRadioHandheld } from "@mdi/js";

import ScrollBar from "components/ScrollBar";
import {
  CALL_STATUS_IDLE,
  callPropType,
  SIP_STATUS_ERROR,
  sipPropType
} from "react-sip";

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
    const { sip, call } = this.context;
    return (
      <div className="content-container">
        <div className="content">
          <input
            type="number"
            value={response}
            onChange={e => this.setState({ response: e.target.value })}
          />
          <span>
            {sip.user}@{sip.host}
          </span>
          <span>SIP Info:</span>
          <span>- Status: {sip.status}</span>
          {sip.status === SIP_STATUS_ERROR && (
            <span>- Error: {sip.errorType}</span>
          )}
          <span>Call Info:</span>
          <span>- Status: {call.status}</span>
          {call.status !== CALL_STATUS_IDLE && (
            <div>
              <span>- Direction: {call.direction}</span>
              <span>- Counterpart: {call.counterpart}</span>
            </div>
          )}
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
  sip: sipPropType,
  call: callPropType,

  registerSip: PropTypes.func,
  unregisterSip: PropTypes.func,

  answerCall: PropTypes.func,
  startCall: PropTypes.func,
  stopCall: PropTypes.func
};

export default {
  app: withRouter(Intercom),
  path: "/intercom",
  name: "Intercom",
  icon: mdiRadioHandheld
};
