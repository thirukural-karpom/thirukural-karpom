import React from "react"
import { Switch, Route } from "react-router-dom"
import Home from "./Home"
import Kurals from "./Kurals"
import FindExplanationQuiz from "./FindExplanationQuiz"
import FindKuralQuiz from "./FindKuralQuiz"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/kurals" component={Kurals} />
      <Route exact path="/quiz/findExplanation" component={FindExplanationQuiz} />
      <Route exact path="/quiz/findKural" component={FindKuralQuiz} />
    </Switch>
  </main>
)

export default Main
