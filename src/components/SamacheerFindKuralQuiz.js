import { useEffect, useState } from "react"
import { Button, Col, Container, Modal, Row } from "react-bootstrap"
import { useParams } from "react-router"
import { useTitle } from "react-use"
import { APP_NAME, CLASS_SUFFIX, CLOSE, FIND_KURAL, SEQUENTIAL_QUIZ_ORDER, SUMMARY_TEXT, SUMMARY_TITLE } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { log } from "../helpers"
import { getKurals } from "../service/FindKuralQuiz"
import { getAnswerKuralByKuralNumber, getAnswerKuralByKuralNumbers } from "../service/Quiz"
import { getKuralNumbers } from "../service/Samacheer"
import FindKuralQuiz from "./FindKuralQuiz"

const SamacheerFindKuralQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({ terms: [], explanationAuthor: defaultExplanationAuthor })
  const [usedKuralNumbers, setUsedKuralNumbers] = useState([])
  const [showSummary, setShowSummary] = useState(false);
  const { classNo } = useParams()
  const samacheerClass = `${classNo}-${CLASS_SUFFIX}`

  useTitle(`${FIND_KURAL} | ${APP_NAME}`)

  useEffect(() => {
    log(">>>>> side-effect")
    if (!quiz) {
      const { terms, explanationAuthor, quizOrder } = filters
      const kuralNumbers = getKuralNumbers(classNo, terms)
        .filter(no => !usedKuralNumbers.includes(no))
      log(`kural numbers for class:${classNo} and terms: ${terms} are ${kuralNumbers}`)
      const answerKural = quizOrder === SEQUENTIAL_QUIZ_ORDER ?
        getAnswerKuralByKuralNumber(kuralNumbers[0], explanationAuthor)
        : getAnswerKuralByKuralNumbers(kuralNumbers, explanationAuthor)
      log(`answer kural: ${answerKural}`)
      const kurals = getKurals(answerKural)
      log(`kurals used for choices: ${kurals}`)
      const { kuralNo, explanation } = answerKural

      const quiz = { explanation, kurals }
      log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)

      const updatedUsedKuralNumbers = [...usedKuralNumbers, kuralNo]
      log(`used kural numbers: ${updatedUsedKuralNumbers}`)
      setUsedKuralNumbers(updatedUsedKuralNumbers)
    }
    log("<<<<< side-effect")
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
      <FindKuralQuiz
        heading={`${FIND_KURAL} - ${samacheerClass}`}
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

export default SamacheerFindKuralQuiz