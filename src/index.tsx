import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "index.css";
import App from "App";
import * as serviceWorker from "serviceWorker";
import { SipProvider } from "react-sip";

const MOUNT_NODE = document.getElementById("root");

const render = () => {
  ReactDOM.render(
    <Router>
      <SipProvider
        host={process.env.REACT_APP_SIP_HOST}
        port={parseInt(process.env.REACT_APP_SIP_PORT!)}
        pathname={process.env.REACT_APP_SIP_PATH}
        user={process.env.REACT_APP_SIP_USERNAME}
        password={process.env.REACT_APP_SIP_PASSWORD}
        extraConfig={{
          authorization_user: process.env.REACT_APP_SIP_AUTHUSER,
          contact_uri: `sip:${process.env.REACT_APP_SIP_USER}@${
            process.env.REACT_APP_SIP_HOST
          }`
        }}
        debug={true}
      >
        <App />
      </SipProvider>
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
