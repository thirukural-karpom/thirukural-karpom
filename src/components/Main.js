import React from "react"
import { Route, Switch } from "react-router-dom"
import FindExplanationQuiz from "./FindExplanationQuiz"
import FindKuralQuiz from "./FindKuralQuiz"
import Kurals from "./Kurals"
import SamacheerFindExplanationQuiz from "./SamacheerFindExplanationQuiz"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Kurals} />
      <Route exact path="/quiz/findExplanation" component={FindExplanationQuiz} />
      <Route exact path="/quiz/findKural" component={FindKuralQuiz} />
      <Route exact path="/quiz/samacheerFindKural/:classNo" component={SamacheerFindExplanationQuiz} />
    </Switch>
  </main>
)

export default Main
