import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useTitle } from "react-use"
import { APP_NAME, FIND_EXPLANATION } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getExplanations } from "../service/FindExplanationQuiz"
import { getAnswerKural } from "../service/Quiz"
import FindExplanationQuiz from "./FindExplanationQuiz"

const CommonFindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({
    paals: [],
    adhikarams: [],
    explanationAuthor: defaultExplanationAuthor
  })

  useTitle(`${FIND_EXPLANATION} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect")
    if (!quiz) {
      log(`filters: ${JSON.stringify(filters)}`)
      const { paals, adhikarams, explanationAuthor } = filters
      const answerKural = getAnswerKural(paals, adhikarams.map(adhikaram => adhikaram.name), explanationAuthor)
      log(`answer kural: ${answerKural}`)
      const explanations = getExplanations(answerKural, explanationAuthor)
      log(`explanations used for choices: ${JSON.stringify(explanations)}`)
      const { kuralNo, kural } = answerKural
      const quiz = { kuralNo, kural, explanations }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
    }
    log("<<<<< side-effect")
  }, [quiz, filters])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    setQuiz(null)
  }

  return (
    <Container>
      <FindExplanationQuiz
        heading={FIND_EXPLANATION}
        quiz={quiz}
        onFilterChange={handleFilterChange}
        onNextQuiz={handleNextQuiz}
      />
      <Row className="mb-2">
        <Col>&nbsp;</Col>
      </Row>
    </Container>
  )
}

export default CommonFindExplanationQuiz