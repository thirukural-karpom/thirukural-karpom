import { useState } from "react"
import { Alert, Badge, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { CORRECT_EXPLANATION_MESSAGE, KURAL, NEXT, SUBMIT, WRONG_EXPLANATION_MESSAGE } from "../constants"
import { log } from "../helpers"
import QuizFilters from "./QuizFilters"

const FindExplanationQuiz = ({ heading, quiz, filterProps, onFilterChange, onNextQuiz }) => {
  const [selectedExplanation, setSelectedExplanation] = useState(null)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const handleOnSubmit = (e) => {
    const correctExplanation = quiz.explanations.find((item) => item.isCorrect).explanation
    log(`handle form submit,
      selectedExplanation: ${JSON.stringify(selectedExplanation)}
      correctExplanation: ${JSON.stringify(correctExplanation)}`)
    setIsCorrectAnswer(selectedExplanation === correctExplanation)
    setShowResult(true)
    e.preventDefault()
  }

  const handlNextQuiz = (e) => {
    log("handle next quiz")
    setShowResult(false)
    setIsCorrectAnswer(false)
    setSelectedExplanation(null)
    onNextQuiz()
    e.preventDefault()
  }

  const handleApplyFilter = (data) => {
    log(`handle apply filter callback, data: ${JSON.stringify(data)}`)
    setShowResult(false)
    setIsCorrectAnswer(false)
    setSelectedExplanation(null)
    onFilterChange(data)
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
            <Form.Label className="kural-text">{quiz.kural}</Form.Label>
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
              className="mx-3"
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
                {CORRECT_EXPLANATION_MESSAGE}
              </Alert>
              <Alert variant="danger" show={showResult && !isCorrectAnswer}>
                {WRONG_EXPLANATION_MESSAGE}
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

export default FindExplanationQuiz