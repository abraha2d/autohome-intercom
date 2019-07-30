import React from "react";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";

import { Icon } from "@mdi/react";
import { mdiCancel, mdiWeatherPartlyCloudy } from "@mdi/js";
import ReactLoading from "react-loading";
import "weathericons/css/weather-icons.min.css";

import { getIcon, getShortDay } from "./utils";
import "./Weather.css";

type Props = {
  history: History;
  location: Location;
  match: match;
  isWidget: boolean;
};

type State = {
  gotForecast: boolean;
  gotStations: boolean;
  gotObservations: boolean;
};

class Weather extends React.Component<Props> {
  readonly state: State = {
    gotForecast: false,
    gotStations: false,
    gotObservations: false
  };

  static forecast: any = false;
  static stations: any = false;
  static observations: any = false;

  render() {
    const { isWidget } = this.props;
    const { gotForecast, gotStations, gotObservations } = this.state;
    const location = process.env.REACT_APP_LOCATION;

    let message;
    // gotForecast && this.setState({ gotForecast: false });
    // gotStations && this.setState({ gotStations: false });
    // gotObservations && this.setState({ gotObservations: false });
    if (!gotForecast || !Weather.forecast) {
      message = "Getting forecast...";
      fetch(`https://api.weather.gov/points/${location}/forecast`)
        .then(response => response.json())
        .then(response => {
          Weather.forecast = response;
          this.setState({ gotForecast: true, forecast: response });
        });
    } else if (!gotStations || !Weather.stations) {
      message = "Finding stations...";
      fetch(`https://api.weather.gov/points/${location}/stations`)
        .then(response => response.json())
        .then(response => {
          Weather.stations = response;
          this.setState({ gotStations: true });
        });
    } else if (!gotObservations || !Weather.observations) {
      console.log(Weather.stations);
      const station = Weather.stations.features[0].properties.stationIdentifier;
      message = `Found station ${station}...`;
      fetch(`https://api.weather.gov/stations/${station}/observations`)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.features.length; i++) {
            if (response.features[i].properties.temperature.value) {
              Weather.observations = response.features[i].properties;
            }
          }
          this.setState({ gotObservations: true });
        });
    }

    const todayFC = Weather.observations;
    console.debug("[weather] Observation:", todayFC);

    const nextFCs: any[] = [];
    if (Weather.forecast.properties) {
      if (!Weather.forecast.properties.periods[0].isDaytime) {
        nextFCs.push({ day: {} });
      }

      Weather.forecast.properties.periods.forEach((period: any) => {
        if (period.isDaytime) {
          nextFCs.push({ day: period });
        } else {
          nextFCs[nextFCs.length - 1].night = period;
        }
      });
      nextFCs.splice(6);
      nextFCs[0].day.name = "Today";

      if (!nextFCs[0].day.icon && todayFC.icon) {
        todayFC.icon = todayFC.icon.replace("day", "night");
      }

      console.debug("[weather] Forecast:", nextFCs);
    }

    if (isWidget) {
      if (Weather.observations) {
        const todayFC = Weather.observations;
        return (
          <span>
            {Math.round(32 + 1.8 * todayFC.temperature.value)}º&nbsp;
            <div
              className={`wi wi-fw ${getIcon(todayFC.icon)}`}
              title={todayFC.textDescription}
            />
          </span>
        );
      } else {
        return (
          <ReactLoading
            type="spin"
            height={"24px"}
            width={"24px"}
            color="#fff"
          />
        );
      }
    }

    return (
      <div className="content-container">
        <div className="content">
          <div className="weather-container">
            {todayFC ? (
              <div className="weather-main">
                <div
                  className={`wi wi-fw ${getIcon(todayFC.icon)}`}
                  title={todayFC.textDescription}
                />
                {/* TODO: Use temperature.unitCode to convert when necessary */}
                <div>{Math.round(32 + 1.8 * todayFC.temperature.value)} ºF</div>
                <div className="weather-message">
                  <span>{todayFC.textDescription}</span>
                </div>
              </div>
            ) : (
              <div className="weather-main">
                <ReactLoading
                  type="spin"
                  height={"48px"}
                  width={"48px"}
                  color="#fff"
                />
                <div>-- ºF</div>
                <div className="weather-message">
                  <span>{message}</span>
                </div>
              </div>
            )}
            <table className="weather-sidecontainer">
              <tbody>
                <tr>
                  <th />
                  <th />
                  <th>Hi</th>
                  <th>Lo</th>
                </tr>
                {nextFCs.length
                  ? nextFCs.map(({ day, night }) => (
                      <tr key={day.name} className="weather-side">
                        <td>{getShortDay(day.name)}</td>
                        <td>
                          <div
                            className={`wi wi-fw ${getIcon(
                              day.icon || night.icon.replace("night", "day")
                            )}`}
                            title={day.shortForecast}
                          />
                        </td>
                        <td>{day.temperature && `${day.temperature}º`}</td>
                        <td>{night.temperature && `${night.temperature}º`}</td>
                      </tr>
                    ))
                  : [...Array(6)].map((_, i) => (
                      <tr key={i} className="weather-side">
                        <td>------</td>
                        <td>
                          <Icon
                            path={mdiCancel}
                            size={"18px"}
                            color={"white"}
                          />
                        </td>
                        <td>---º</td>
                        <td>---º</td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default {
  app: withRouter(Weather),
  path: "/weather",
  name: "Weather",
  icon: mdiWeatherPartlyCloudy
};
