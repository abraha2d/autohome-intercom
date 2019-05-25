import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <div className="status-bar">
        <div className="col left">May 22</div>
        <div className="col center"> 12:34 am</div>
        <div className="col right">
          75º <i className="mdi mdi-weather-sunny mdi-16" aria-hidden="true" />
        </div>
      </div>
      <div className="content-container">
        <div className="content">
          <div className="row flex-grow-1">
            <div className="col icon-button">
              <i className="material-icons md-48">speaker_phone</i>
            </div>
            <div className="col icon-button">
              <i className="material-icons md-48">calendar_today</i>
            </div>
            <div className="col icon-button">
              <i
                className="mdi mdi-weather-partlycloudy mdi-48"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="row flex-grow-1">
            <div className="col icon-button">
              <i className="material-icons md-48">videocam</i>
            </div>
            <div className="col icon-button">
              <i className="material-icons md-48">timer</i>
            </div>
            <div className="col icon-button">
              <i className="material-icons md-48">settings</i>
            </div>
          </div>
        </div>
        <div className="scroll-container">
          <div className="scroll-button">
            <i className="material-icons md-48">keyboard_arrow_up</i>
          </div>
          <div className="scroll-indicator" />
          <div className="scroll-button">
            <i className="material-icons md-48">keyboard_arrow_down</i>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
