import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const root = ReactDOM.createRoot(document.getElementById("root"));
const firebaseConfig = {
  apiKey: "AIzaSyCInRYTChLDjV_mQIiextqIFHx7nspmJNE",
  authDomain: "carbon-counter-a38b9.firebaseapp.com",
  projectId: "carbon-counter-a38b9",
  storageBucket: "carbon-counter-a38b9.appspot.com",
  messagingSenderId: "436940481490",
  appId: "1:436940481490:web:87031217c899038fe49e0b",
  measurementId: "G-86E9SZFVKH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
root.render(
  <Auth0Provider
    domain="dev-7n6cr0svckgxjyod.us.auth0.com"
    clientId="kPsIXVkUBkwis1GPnBeIQi8RCIQLLW5z"
    authorizationParams={{
      redirect_uri: window.location.origin+"/loader",
    }}
  >
    {/* {console.log(window.location.origin)} */}
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Auth0Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
