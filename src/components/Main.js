import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./Home"
import Kurals from "./Kurals"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/kurals" component={Kurals} />
    </Switch>
  </main>
)

export default Main
