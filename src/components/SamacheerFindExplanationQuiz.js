import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, FIND_EXPLANATION } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getExplanations } from "../service/FindExplanationQuiz"
import { getAnswerKuralByKuralNumbers } from "../service/Quiz"
import { getKuralNumbers } from "../service/Samacheer"
import FindExplanationQuiz from "./FindExplanationQuiz"

const SamacheerFindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ terms: [], explanationAuthor: defaultExplanationAuthor })
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${samacheerClass} | ${FIND_EXPLANATION} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect")
    if (!quiz) {
      const { terms, explanationAuthor } = filters
      const kuralNumbers = getKuralNumbers(classNo, terms)
      log(`kural numbers for class:${classNo} and terms: ${terms} are ${kuralNumbers}`)
      const answerKural = getAnswerKuralByKuralNumbers(kuralNumbers, explanationAuthor)
      log(`answer kural: ${answerKural}`)
      const explanations = getExplanations(answerKural, explanationAuthor)
      log(`explanations used for choices: ${JSON.stringify(explanations)}`)
      const { kuralNo, kural } = answerKural;
      const quiz = { kuralNo, kural, explanations }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    log("<<<<< side-effect")
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
      filterProps={{
        hasPaalSelector: false,
        hasAdhikaramSelector: false,
        hasTermSelector: true
      }}
    />
  )
}

export default SamacheerFindExplanationQuiz