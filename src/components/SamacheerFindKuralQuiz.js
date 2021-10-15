import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, FIND_KURAL } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import samacheerKurals from "../data/samacheer-kurals.json"
import FindKuralQuizGenerator from "../service/FindKuralQuizGenerator"
import FindKuralQuiz from "./FindKuralQuiz"

const SamacheerFindKuralQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ explanationAuthor: defaultExplanationAuthor })
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${FIND_KURAL} | ${APP_NAME}`)

  useEffect(() => {
    console.log(">>>>> side-effect - quiz")
    if (!quiz) {
      const kuralNumbers = samacheerKurals[classNo]
      const { explanationAuthor } = filters
      const quizGenerator = new FindKuralQuizGenerator()
      const explanation = quizGenerator.getExplanationByKuralNumbers(kuralNumbers, explanationAuthor)
      console.log(`random explanation: ${explanation}`)
      const kurals = quizGenerator.getKurals()
      console.log(`random kurals: ${kurals}`)
      const quiz = { kurals, explanation }
      console.log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    console.log("<<<<< side-effect - quiz")
  }, [quiz, filters, classNo])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    setQuiz(null)
  }

  return (
    <FindKuralQuiz
      heading={`${FIND_KURAL} - ${samacheerClass}`}
      quiz={quiz}
      onFilterChange={handleFilterChange}
      onNextQuiz={handleNextQuiz}
      filterProps={{ hasPaalSelector: false, hasAdhikaramSelector: false }}
    />
  )
}

export default SamacheerFindKuralQuiz