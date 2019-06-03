import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "index.css";
import App from "App";
import * as serviceWorker from "serviceWorker";

const MOUNT_NODE = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <Router>
      <App />
    </Router>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept("App", () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE!);
    render();
  });
}

render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
