import * as React from "react";
import { geolocated, GeolocatedProps } from "react-geolocated";
import { match, withRouter } from "react-router-dom";
import { History, Location } from "history";
import "./Weather.css";

type Props = {
  history: History;
  location: Location;
  match: match;
};

type State = {
  gotForecast: boolean;
  forecast: any;
};

class Weather extends React.Component<Props & GeolocatedProps> {
  readonly state: State = {
    gotForecast: false,
    forecast: {}
  };

  render() {
    const { isGeolocationAvailable, isGeolocationEnabled, coords } = this.props;
    const { gotForecast, forecast } = this.state;

    let message;
    if (!isGeolocationAvailable)
      message = "Please switch to a browser with support for geolocation!";
    else if (!isGeolocationEnabled)
      message = "Please enable geolocation in your browser!";
    else if (!coords) {
      message = "Finding your location...";
      if (gotForecast) this.setState({ gotForecast: false });
    } else if (!gotForecast) {
      message = "Fetching your forecast...";
      fetch(
        `https://api.weather.gov/points/${coords.latitude},${
          coords.longitude
        }/forecast`
      )
        .then(response => response.json())
        .then(response =>
          this.setState({ gotForecast: true, forecast: response })
        );
    }

    if (message)
      return (
        <div className="content-container">
          <div className="content">{message}</div>
        </div>
      );

    const nextFCs: any[] = [];

    if (!forecast.properties.periods[0].isDaytime) {
      nextFCs.push({ day: { name: "Today" } });
    }

    forecast.properties.periods.forEach((period: any) => {
      if (period.isDaytime) {
        nextFCs.push({ day: period });
      } else {
        nextFCs[nextFCs.length - 1].night = period;
      }
    });
    nextFCs.splice(6);

    return (
      <div className="content-container">
        <div className="content">
          <div className="weather-container">
            <div className="weather-main">
              <div className="mdi md-96 mdi-cancel" />
              <div>-- ºF</div>
            </div>
            <table className="weather-sidecontainer">
              <tbody>
                <tr>
                  <th />
                  <th>Hi</th>
                  <th>Lo</th>
                </tr>
                {nextFCs.map(({ day, night }) => (
                  <tr key={day.name} className="weather-side">
                    <td>{day.name}</td>
                    <td>{day.temperature && `${day.temperature}º`}</td>
                    <td>{night.temperature}º</td>
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
  icon: "weather-partlycloudy"
};
