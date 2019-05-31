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

    const mainFC = forecast.properties.periods[0];
    if (!mainFC.isDaytime) {
      forecast.properties.periods.splice(0, 1);
    }

    const nextFCs: any[] = [];
    forecast.properties.periods.forEach((period: any) => {
      if (period.isDaytime) {
        nextFCs.push({ day: period });
      } else {
        nextFCs[nextFCs.length - 1].night = period;
      }
    });
    nextFCs.splice(5);

    return (
      <div className="content-container">
        <div className="content">
          <div className="weather-container">
            <div className="weather-main">
              <div className="mdi md-96 mdi-weather-sunny" />
              <div>
                {mainFC.temperature} º{mainFC.temperatureUnit}
              </div>
            </div>
            <div className="weather-sidecontainer">
              {nextFCs.map(({ day, night }) => (
                <div className="weather-side">
                  {day.name}: {day.temperature}º / {night.temperature}º
                </div>
              ))}
            </div>
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
