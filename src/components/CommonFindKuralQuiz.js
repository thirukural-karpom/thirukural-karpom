import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { useTitle } from "react-use"
import { APP_NAME, FIND_KURAL } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getKurals } from "../service/FindKuralQuiz"
import { getAnswerKural } from "../service/Quiz"
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
    log(">>>>> side-effect")
    if (!quiz) {
      const { paals, adhikarams, explanationAuthor } = filters
      const answerKural = getAnswerKural(paals, adhikarams.map(adhikaram => adhikaram.name), explanationAuthor)
      log(`answer kural: ${answerKural}`)
      const kurals = getKurals(answerKural)
      log(`kurals used for choices: ${kurals}`)
      const { explanation } = answerKural
      const quiz = { explanation, kurals }
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
      <FindKuralQuiz
        heading={FIND_KURAL}
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

export default CommonFindKuralQuiz