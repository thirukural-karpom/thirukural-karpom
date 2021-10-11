import React from "react"
import ReactDOM from "react-dom"
import ReactGA from "react-ga"
import { BrowserRouter } from "react-router-dom"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import "./scss/index.scss"

// TODO: fix this before releasing
// ReactGA.initialize("Your Unique ID");

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
