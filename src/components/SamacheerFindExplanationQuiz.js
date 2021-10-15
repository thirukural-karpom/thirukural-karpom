import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, FIND_EXPLANATION } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import FindExplanationQuizGenerator from "../service/FindExplanationQuizGenerator"
import { getAllKuralNumbers } from "../service/Samacheer"
import FindExplanationQuiz from "./FindExplanationQuiz"

const SamacheerFindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ explanationAuthor: defaultExplanationAuthor })
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${samacheerClass} | ${FIND_EXPLANATION} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect - quiz")
    if (!quiz) {
      const kuralNumbers = getAllKuralNumbers(classNo)
      const { explanationAuthor } = filters
      const quizGenerator = new FindExplanationQuizGenerator()
      const { kural, kuralNo } = quizGenerator.getKuralByKuralNumbers(kuralNumbers, explanationAuthor)
      log(`random kural: ${kuralNo} - ${kural}`)
      const explanations = quizGenerator.getExplanations()
      log(`random explanations: ${JSON.stringify(explanations)}`)
      const quiz = { kuralNo, kural, explanations }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    log("<<<<< side-effect - quiz")
  }, [quiz, filters, classNo])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    setQuiz(null)
  }

  return (
    <FindExplanationQuiz
      heading={`${FIND_EXPLANATION} - ${samacheerClass}`}
      quiz={quiz}
      onFilterChange={handleFilterChange}
      onNextQuiz={handleNextQuiz}
      filterProps={{ hasPaalSelector: false, hasAdhikaramSelector: false }}
    />
  )
}

export default SamacheerFindExplanationQuiz