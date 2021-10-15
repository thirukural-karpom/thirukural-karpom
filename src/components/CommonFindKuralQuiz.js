import { useEffect, useState } from "react"
import { useTitle } from "react-use"
import { APP_NAME, FIND_KURAL } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import FindKuralQuizGenerator from "../service/FindKuralQuizGenerator"
import FindKuralQuiz from "./FindKuralQuiz"

const CommonFindKuralQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({
    paals: [],
    adhikarams: [],
    explanationAuthor: defaultExplanationAuthor
  })

  useTitle(`${FIND_KURAL} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect - quiz")
    if (!quiz) {
      const { paals, adhikarams, explanationAuthor } = filters
      const quizGenerator = new FindKuralQuizGenerator()
      const explanation = quizGenerator.getExplanation(paals, adhikarams.map(adhikaram => adhikaram.name), explanationAuthor)
      log(`random explanation: ${explanation}`)
      const kurals = quizGenerator.getKurals()
      log(`random kurals: ${kurals}`)
      const quiz = { kurals, explanation }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    log("<<<<< side-effect - quiz")
  }, [quiz, filters])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    setQuiz(null)
  }

  return (
    <FindKuralQuiz
      heading={FIND_KURAL}
      quiz={quiz}
      onFilterChange={handleFilterChange}
      onNextQuiz={handleNextQuiz}
    />
  )
}

export default CommonFindKuralQuiz