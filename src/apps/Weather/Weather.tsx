import * as React from "react";
import { geolocated, GeolocatedProps } from "react-geolocated";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import { mdiWeatherPartlycloudy } from "@mdi/js";
import "weather-icons/css/weather-icons.min.css";

import { getIcon, getShortDay } from "./utils";
import "./Weather.css";

type Props = {
  history: History;
  location: Location;
  match: match;
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

  render() {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const {
      gotForecast,
      gotStations,
      gotObservations,
      forecast,
      stations,
      observations
    } = this.state;

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
      fetch(`https://api.weather.gov/stations/${station}/observations?limit=1`)
        .then(response => response.json())
        .then(response =>
          this.setState({ gotObservations: true, observations: response })
        );
    }

    if (message)
      return (
        <div className="content-container">
          <div className="content">{message}</div>
        </div>
      );

    const todayFC = observations.features[0].properties;

    const nextFCs: any[] = [];
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

    return (
      <div className="content-container">
        <div className="content">
          <div className="weather-container">
            <div className="weather-main">
              <div
                className={`wi wi-fw ${getIcon(todayFC.icon)}`}
                title={todayFC.textDescription}
              />
              <div>{Math.round(32 + 1.8 * todayFC.temperature.value)} ºF</div>
            </div>
            <table className="weather-sidecontainer">
              <tbody>
                <tr>
                  <th />
                  <th />
                  <th>Hi</th>
                  <th>Lo</th>
                </tr>
                {nextFCs.map(({ day, night }) => (
                  <tr key={day.name} className="weather-side">
                    <td>{getShortDay(day.name)}</td>
                    <td>
                      {" "}
                      <div
                        className={`wi wi-fw ${getIcon(day.icon)}`}
                        title={day.textDescription}
                      />
                    </td>
                    <td>{day.temperature && `${day.temperature}º`}</td>
                    <td>{night.temperature && `${night.temperature}º`}</td>
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
