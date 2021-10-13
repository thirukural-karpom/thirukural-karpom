import React from "react"
import { Route, Switch } from "react-router-dom"
import CommonFindExplanationQuiz from "./CommonFindExplanationQuiz"
import CommonFindKuralQuiz from "./CommonFindKuralQuiz"
import Kurals from "./Kurals"
import SamacheerFindExplanationQuiz from "./SamacheerFindExplanationQuiz"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Kurals} />
      <Route exact path="/quiz/findExplanation" component={CommonFindExplanationQuiz} />
      <Route exact path="/quiz/findKural" component={CommonFindKuralQuiz} />
      <Route exact path="/quiz/samacheerFindKural/:classNo" component={SamacheerFindExplanationQuiz} />
    </Switch>
  </main>
)

export default Main
