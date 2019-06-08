import React from "react";
import { geolocated, GeolocatedProps } from "react-geolocated";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiCancel, mdiWeatherPartlycloudy } from "@mdi/js";
import "weathericons/css/weather-icons.min.css";

import { getIcon, getShortDay } from "./utils";
import "./Weather.css";
import Icon from "@mdi/react";

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
  forecast: any;
  stations: any;
  observations: any;
};

class Weather extends React.Component<Props & GeolocatedProps> {
  readonly state: State = {
    gotForecast: false,
    gotStations: false,
    gotObservations: false,
    forecast: {},
    stations: {},
    observations: {}
  };

  static observations: any = false;

  render() {
    const {
      isGeolocationAvailable,
      isGeolocationEnabled,
      coords,
      isWidget
    } = this.props;
    const {
      gotForecast,
      gotStations,
      gotObservations,
      forecast,
      stations
    } = this.state;

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
          <span>
            --º&nbsp;&nbsp;
            <Icon path={mdiCancel} size={"24px"} />
          </span>
        );
      }
    }

    let message;
    if (!isGeolocationAvailable) message = "Geolocation not supported!";
    else if (!isGeolocationEnabled) message = "Geolocation not enabled!";
    else if (!coords) {
      message = "Finding location...";
      gotForecast && this.setState({ gotForecast: false });
      gotStations && this.setState({ gotStations: false });
      gotObservations && this.setState({ gotObservations: false });
    } else if (!gotForecast) {
      message = "Getting weather forecast...";
      fetch(
        `https://api.weather.gov/points/${coords.latitude},${
          coords.longitude
        }/forecast`
      )
        .then(response => response.json())
        .then(response =>
          this.setState({ gotForecast: true, forecast: response })
        );
    } else if (!gotStations) {
      message = "Finding nearby weather stations...";
      fetch(
        `https://api.weather.gov/points/${coords.latitude},${
          coords.longitude
        }/stations`
      )
        .then(response => response.json())
        .then(response =>
          this.setState({ gotStations: true, stations: response })
        );
    } else if (!gotObservations) {
      const station = stations.features[0].properties.stationIdentifier;
      message = `Getting current weather from station ${station}...`;
      fetch(`https://api.weather.gov/stations/${station}/observations`)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.features.length; i++) {
            if (response.features[i].properties.temperature.value) {
              Weather.observations = response.features[i].properties;
            }
          }
          this.setState({ gotObservations: true, observations: response });
        });
    }

    const todayFC = Weather.observations;
    console.debug("[weather] Observation:", todayFC);

    const nextFCs: any[] = [];
    if (forecast.properties) {
      if (!forecast.properties.periods[0].isDaytime) {
        nextFCs.push({ day: {} });
      }

      forecast.properties.periods.forEach((period: any) => {
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
                <Icon path={mdiCancel} size={"48px"} color={"white"} />
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
  app: withRouter(geolocated()(Weather)),
  path: "/weather",
  name: "Weather",
  icon: mdiWeatherPartlycloudy
};
