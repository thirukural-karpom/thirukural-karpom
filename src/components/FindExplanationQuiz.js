import { useEffect, useState } from "react"
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { CORRECT_EXPLANATION_MESSAGE, KURAL, WRONG_EXPLANATION_MESSAGE } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import { getKural, getExplanations } from "../service/Quiz"
import QuizFilters from "./QuizFilters"

const FindExplanationQuiz = () => {
  const [quiz, setQuiz] = useState(null)
  const [selectedExplanation, setSelectedExplanation] = useState(null)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const defaultExplanationAuthor = explanationAuthors[0]
  const [filters, setFilters] = useState({
    paals: [],
    adhikarams: [],
    explanationAuthor: defaultExplanationAuthor
  })

  useEffect(() => {
    console.log(">>>>> side-effect - quiz")
    if (!quiz) {
      const { paals, adhikarams, explanationAuthor } = filters
      const randomKural = getKural(paals, adhikarams.map((adhikaram) => adhikaram.name))
      console.log(`random kural: ${randomKural}`)
      const explanations = getExplanations(randomKural, explanationAuthor)
      console.log(`random explanations: ${JSON.stringify(explanations)}`)
      const { kuralNo, kural } = randomKural
      const quiz = { kuralNo, kural, explanations }
      console.log(`quiz: ${JSON.stringify(quiz)}`)
      setQuiz(quiz)
      setSelectedExplanation(explanations[0].explanation)
    }
    console.log("<<<<< side-effect - quiz")
  }, [quiz, filters])

  const handleOnSubmit = (e) => {
    const correctExplanation = quiz.explanations.find((item) => item.isCorrect).explanation
    console.log(`handle form submit,
      selectedExplanation: ${JSON.stringify(selectedExplanation)}
      correctExplanation: ${JSON.stringify(correctExplanation)}`)
    setIsCorrectAnswer(selectedExplanation === correctExplanation)
    setShowResult(true)
    e.preventDefault()
  }

  const handlNextQuiz = (e) => {
    console.log("handle next quiz")
    setShowResult(false)
    setIsCorrectAnswer(false)
    setQuiz(null)
  }

  const handleApplyFilter = (data) => {
    console.log(`handle apply filter callback, data: ${JSON.stringify(data)}`)
    setFilters(data)
    setQuiz(null)
  }

  const renderQuiz = () => (
    <>
      <Form.Group>
        <Row className="fs-5">
          <Col>
            <Badge bg="primary">{`${KURAL} ${quiz.kuralNo}`}</Badge>
          </Col>
        </Row>
        <Row className="my-3">
          <Col>
            <Form.Label className="kural">{quiz.kural}</Form.Label>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        {
          quiz.explanations.map((item, idx) => (
            <Form.Check
              key={idx}
              id={`explanation-option-${idx}`}
              value={item.explanation}
              name="explanations"
              type="radio"
              label={item.explanation}
              onChange={(e) => setSelectedExplanation(e.target.value)}
              defaultChecked={idx === 0}
            />
          ))
        }
      </Form.Group>
    </>
  )

  return (
    <Container>
      <QuizFilters defaultExplanationAuthor={defaultExplanationAuthor} onApply={handleApplyFilter} />
      <Row className="mt-3">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Alert variant="success" show={showResult && isCorrectAnswer}>
                {CORRECT_EXPLANATION_MESSAGE}
              </Alert>
              <Alert variant="danger" show={showResult && !isCorrectAnswer}>
                {WRONG_EXPLANATION_MESSAGE}
              </Alert>
              <Form onSubmit={handleOnSubmit}>

                {quiz !== null ? renderQuiz() : "Loading quiz..."}

                <Form.Group className="text-center mt-4">
                  <Button type="submit" className="mx-2">
                    Submit
                  </Button>
                  <Button
                    variant="success"
                    type="button"
                    disabled={!isCorrectAnswer}
                    onClick={handlNextQuiz}
                    className="mx-2">
                    Next <i className="bi bi-arrow-right-short"></i>
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col>&nbsp;</Col>
      </Row>
    </Container>
  )
}

export default FindExplanationQuiz