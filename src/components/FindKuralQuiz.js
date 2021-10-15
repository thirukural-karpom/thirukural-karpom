import { useState } from "react"
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { CORRECT_KURAL_MESSAGE, EXPLANATION, NEXT, SUBMIT, WRONG_KURAL_MESSAGE } from "../constants"
import { log } from "../helpers"
import QuizFilters from "./QuizFilters"

const FindKuralQuiz = ({ heading, quiz, filterProps, onFilterChange, onNextQuiz }) => {
  const [selectedKural, setSelectedKural] = useState(null)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleOnSubmit = (e) => {
    const correctKural = quiz.kurals.find((item) => item.isCorrect).kural
    log(`handle form submit,
      selectedKural: ${JSON.stringify(selectedKural)}
      correctKural: ${JSON.stringify(correctKural)}`)
    setIsCorrectAnswer(selectedKural === correctKural)
    setShowResult(true)
    setSelectedKural(null)
    e.preventDefault()
  }

  const handlNextQuiz = (e) => {
    log("handle next quiz")
    setShowResult(false)
    setIsCorrectAnswer(false)
    setSelectedKural(null)
    onNextQuiz()
  }

  const handleApplyFilter = (data) => {
    log(`handle apply filter callback, data: ${JSON.stringify(data)}`)
    setShowResult(false)
    setIsCorrectAnswer(false)
    setSelectedKural(null)
    onFilterChange(data)
  }

  const renderQuiz = () => (
    <>
      <Form.Group>
        <Row className="fs-5">
          <Col>
            <Badge bg="primary">{EXPLANATION}</Badge>
          </Col>
        </Row>
        <Row className="my-3 fs-5">
          <Col>
            <Form.Label>{quiz.explanation}</Form.Label>
          </Col>
        </Row>
      </Form.Group>
      <Form.Group>
        {
          quiz.kurals.map((item, idx) => (
            <Form.Check
              key={idx}
              id={`kural-option-${idx}`}
              value={item.kural}
              name="kurals"
              type="radio"
              label={item.kural}
              onChange={(e) => setSelectedKural(e.target.value)}
              className="fs-6 mx-3 kural-text"
            />
          ))
        }
      </Form.Group>
    </>
  )

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>{heading}</h2>
        </Col>
      </Row>
      <QuizFilters {...filterProps} onApply={handleApplyFilter} />
      <Row className="my-4">
        <Col>
          <Card className="shadow-sm">
            <Card.Body>
              <Alert variant="success" show={showResult && isCorrectAnswer}>
                {CORRECT_KURAL_MESSAGE}
              </Alert>
              <Alert variant="danger" show={showResult && !isCorrectAnswer}>
                {WRONG_KURAL_MESSAGE}
              </Alert>
              <Form onSubmit={handleOnSubmit}>

                {quiz !== null ? renderQuiz() : "Loading quiz..."}

                <Form.Group className="text-center mt-4">
                  <Button type="submit" className="mx-2">
                    {SUBMIT}
                  </Button>
                  <Button
                    variant="success"
                    type="button"
                    disabled={!isCorrectAnswer}
                    onClick={handlNextQuiz}
                    className="mx-2">
                    {NEXT} <i className="bi bi-arrow-right-short"></i>
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

export default FindKuralQuiz