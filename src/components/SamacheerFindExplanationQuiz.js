import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, FIND_EXPLANATION } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import samacheerKurals from "../data/samacheer-kurals.json"
import FindExplanationQuizGenerator from "../service/FindExplanationQuizGenerator"
import FindExplanationQuiz from "./FindExplanationQuiz"

const SamacheerFindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ explanationAuthor: defaultExplanationAuthor })
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${samacheerClass} | ${FIND_EXPLANATION} | ${APP_NAME}`)

  useEffect(() => {
    console.log(">>>>> side-effect - quiz")
    if (!quiz) {
      const kuralNumbers = samacheerKurals[classNo]
      const { explanationAuthor } = filters
      const quizGenerator = new FindExplanationQuizGenerator()
      const { kural, kuralNo } = quizGenerator.getKuralByKuralNumbers(kuralNumbers, explanationAuthor)
      console.log(`random kural: ${kuralNo} - ${kural}`)
      const explanations = quizGenerator.getExplanations()
      console.log(`random explanations: ${JSON.stringify(explanations)}`)
      const quiz = { kuralNo, kural, explanations }
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