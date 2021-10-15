import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, FIND_KURAL } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getKurals } from "../service/FindKuralQuiz"
import { getAnswerKuralByKuralNumbers } from "../service/Quiz"
import { getKuralNumbers } from "../service/Samacheer"
import FindKuralQuiz from "./FindKuralQuiz"

const SamacheerFindKuralQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ terms: [], explanationAuthor: defaultExplanationAuthor })
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${FIND_KURAL} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect")
    if (!quiz) {
      const { terms, explanationAuthor } = filters
      const kuralNumbers = getKuralNumbers(classNo, terms)
      log(`kural numbers for class:${classNo} and terms: ${terms} are ${kuralNumbers}`)
      const answerKural = getAnswerKuralByKuralNumbers(kuralNumbers, explanationAuthor)
      log(`answer kural: ${answerKural}`)
      const kurals = getKurals(answerKural)
      log(`kurals used for choices: ${kurals}`)
      const { explanation } = answerKural
      const quiz = { explanation, kurals }
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
    <FindKuralQuiz
      heading={`${FIND_KURAL} - ${samacheerClass}`}
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

export default SamacheerFindKuralQuiz