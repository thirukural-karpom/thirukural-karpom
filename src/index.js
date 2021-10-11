import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Analytics from "react-router-ga"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import "./scss/index.scss"

ReactDOM.render(
  <BrowserRouter>
    <Analytics id={process.env.REACT_APP_GOOGLE_ANALYTICS_ID}>
      <App />
    </Analytics>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
