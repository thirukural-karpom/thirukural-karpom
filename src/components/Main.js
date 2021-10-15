import React from "react"
import { Route, Switch } from "react-router-dom"
import CommonFindExplanationQuiz from "./CommonFindExplanationQuiz"
import CommonFindKuralQuiz from "./CommonFindKuralQuiz"
import Kurals from "./Kurals"
import SamacheerFindExplanationQuiz from "./SamacheerFindExplanationQuiz"
import SamacheerFindKuralQuiz from "./SamacheerFindKuralQuiz"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Kurals} />
      <Route exact path="/quiz/find-explanation" component={CommonFindExplanationQuiz} />
      <Route exact path="/quiz/find-kural" component={CommonFindKuralQuiz} />
      <Route exact path="/quiz/samacheer-find-explanation/:classNo" component={SamacheerFindExplanationQuiz} />
      <Route exact path="/quiz/samacheer-find-kural/:classNo" component={SamacheerFindKuralQuiz} />
    </Switch>
  </main>
)

export default Main
