import React from "react"
import { Switch, Route } from "react-router-dom"
import Browse from "./Browse"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Browse} />
      <Route exact path="/browse" component={Browse} />
    </Switch>
  </main>
)

export default Main
