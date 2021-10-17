import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, CLOSE, FIND_EXPLANATION, SEQUENTIAL_QUIZ_ORDER, SUMMARY_TEXT, SUMMARY_TITLE } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getExplanations } from "../service/FindExplanationQuiz"
import { getAnswerKuralByKuralNumber, getAnswerKuralByKuralNumbers } from "../service/Quiz"
import { getKuralNumbers } from "../service/Samacheer"
import FindExplanationQuiz from "./FindExplanationQuiz"

const SamacheerFindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ terms: [], explanationAuthor: defaultExplanationAuthor })
  const [usedKuralNumbers, setUsedKuralNumbers] = useState([])
  const [showSummary, setShowSummary] = useState(false);
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${samacheerClass} | ${FIND_EXPLANATION} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect: samacheer find explanation quiz: quiz")
    if (!quiz) {
      const { terms, explanationAuthor, quizOrder } = filters
      const kuralNumbers = getKuralNumbers(classNo, terms)
        .filter(no => !usedKuralNumbers.includes(no))
      log(`kural numbers for class: ${classNo} and terms: ${terms} are ${kuralNumbers}`)
      const answerKural = quizOrder === SEQUENTIAL_QUIZ_ORDER ?
        getAnswerKuralByKuralNumber(kuralNumbers[0], explanationAuthor)
        : getAnswerKuralByKuralNumbers(kuralNumbers, explanationAuthor)
      log(`answer kural: ${JSON.stringify(answerKural)}`)
      const explanations = getExplanations(answerKural, explanationAuthor)
      log(`explanations used for choices: ${JSON.stringify(explanations)}`)

      const { kuralNo, kural } = answerKural
      const quiz = { kuralNo, kural, explanations }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)

      const updatedUsedKuralNumbers = [...usedKuralNumbers, kuralNo]
      log(`used kural numbers: ${updatedUsedKuralNumbers}`)
      setUsedKuralNumbers(updatedUsedKuralNumbers)
    }
    log("<<<<< side-effect: samacheer find explanation quiz: quiz")
  }, [quiz, filters, classNo, usedKuralNumbers])

  const handleFilterChange = (filters) => {
    setFilters(filters)
    setUsedKuralNumbers([])
    setQuiz(null)
  }

  const handleNextQuiz = () => {
    const { terms } = filters
    const kuralNumbers = getKuralNumbers(classNo, terms)
    const areAllKuralsUsed = usedKuralNumbers.length === kuralNumbers.length &&
      kuralNumbers.every(no => usedKuralNumbers.includes(no))
    if (areAllKuralsUsed) {
      log("all kurals are used")
      setShowSummary(true)
    } else {
      setQuiz(null)
    }
  }

  const handleSummaryClose = () => {
    setShowSummary(false)
    setUsedKuralNumbers([])
    setQuiz(null)
  }

  return (
    <Container>
      <Modal
        show={showSummary}
        onHide={handleSummaryClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{SUMMARY_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {SUMMARY_TEXT}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSummaryClose}>
            {CLOSE}
          </Button>
        </Modal.Footer>
      </Modal>
      <FindExplanationQuiz
        heading={`${FIND_EXPLANATION} - ${samacheerClass}`}
        quiz={quiz}
        onFilterChange={handleFilterChange}
        onNextQuiz={handleNextQuiz}
        filterProps={{
          hasPaalSelector: false,
          hasAdhikaramSelector: false,
          hasTermSelector: true,
          hasQuizOrderSelector: true
        }}
      />
      <Row className="mb-2">
        <Col>&nbsp;</Col>
      </Row>
    </Container>
  )
}

export default SamacheerFindExplanationQuiz