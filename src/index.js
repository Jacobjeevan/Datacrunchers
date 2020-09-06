import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <Auth0Provider
    domain="datacrunchers.us.auth0.com"
    clientId="2WJnII0VAIJboL03wEDCRvNZjQ5YWcVZ"
    redirectUri={window.location.origin}
    audience="https://datacrunchers.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);
