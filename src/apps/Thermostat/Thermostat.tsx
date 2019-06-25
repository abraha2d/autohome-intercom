import React from "react";
import ReactNestThermostat from "react-nest-thermostat";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";

import { mdiChevronDown, mdiChevronUp, mdiThermometer } from "@mdi/js";
import Icon from "@mdi/react";

import "./Thermostat.css";

type Props = {
  history: History;
  location: Location;
  match: match;
};

type State = {
  targetTemperature: number;
  hvacMode: "off" | "heating" | "cooling";
};

class Thermostat extends React.Component<Props, State> {
  readonly state: State = {
    targetTemperature: 70,
    hvacMode: "off"
  };

  render() {
    const { targetTemperature, hvacMode } = this.state;
    return (
      <div className="content-container">
        <div className="content">
          <div className="thermostat-container">
            <ReactNestThermostat
              away={false}
              leaf={true}
              ambientTemperature={75}
              targetTemperature={targetTemperature}
              hvacMode={hvacMode}
            />
            <div className="thermostat-button-container btn-group-vertical">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  this.setState({
                    targetTemperature: this.state.targetTemperature + 1
                  })
                }
              >
                <Icon path={mdiChevronUp} size={"24px"} color="white" />
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary heating ${
                  hvacMode === "heating" ? "active" : ""
                }`}
                onClick={() => this.setState({ hvacMode: "heating" })}
              >
                Heat
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary cooling ${
                  hvacMode === "cooling" ? "active" : ""
                }`}
                onClick={() => this.setState({ hvacMode: "cooling" })}
              >
                Cool
              </button>
              <button
                type="button"
                className={`btn btn-outline-secondary off ${
                  hvacMode === "off" ? "active" : ""
                }`}
                onClick={() => this.setState({ hvacMode: "off" })}
              >
                Off
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                  this.setState({
                    targetTemperature: this.state.targetTemperature - 1
                  })
                }
              >
                <Icon path={mdiChevronDown} size={"24px"} color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default {
  app: withRouter(Thermostat),
  path: "/thermostat",
  name: "Thermostat",
  icon: mdiThermometer
};
