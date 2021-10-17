import React from "react"
import { Route, Switch } from "react-router-dom"
import CommonFindExplanationQuiz from "./CommonFindExplanationQuiz"
import CommonFindKuralQuiz from "./CommonFindKuralQuiz"
import Kurals from "./Kurals"
import SamacheerQuiz from "./SamacheerQuiz"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Kurals} />
      <Route exact path="/quiz/find-explanation" component={CommonFindExplanationQuiz} />
      <Route exact path="/quiz/find-kural" component={CommonFindKuralQuiz} />
      <Route exact path="/quiz/samacheer/:quizType/:classNo" component={SamacheerQuiz} />
      <Route exact path="/quiz/samacheer/:quizType/:classNo" component={SamacheerQuiz} />
    </Switch>
  </main>
)

export default Main
