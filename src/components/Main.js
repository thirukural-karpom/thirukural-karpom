import React from "react"
import { Route, Switch } from "react-router-dom"
import About from "./About"
import CommonQuiz from "./CommonQuiz"
import Kurals from "./Kurals"
import SamacheerQuiz from "./SamacheerQuiz"

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Kurals} />
      <Route exact path="/quiz/:quizType" component={CommonQuiz} />
      <Route exact path="/quiz/:quizType" component={CommonQuiz} />
      <Route exact path="/quiz/samacheer/:quizType/:classNo" component={SamacheerQuiz} />
      <Route exact path="/quiz/samacheer/:quizType/:classNo" component={SamacheerQuiz} />
      <Route exact path="/about" component={About} />
    </Switch>
  </main>
)

export default Main
