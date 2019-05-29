import React from "react";
import { Route } from "react-router";
import { Home } from "apps/Home";
import "App.css";

function App() {
  return (
    <div className="main-container">
      <div className="status-bar">
        <div className="col left">May 22</div>
        <div className="col center">12:34 am</div>
        <div className="col right">
          75º <div className="mdi mdi-weather-sunny md-18" aria-hidden="true" />
        </div>
      </div>
      <div className="content-container">
        <Route exact path="/" component={Home} />
      </div>
    </div>
  );
}

export default App;
