import { useEffect, useState } from "react"
import { Button, Container, Form, Row, Col, Alert, Card, Badge } from "react-bootstrap"
import { getExplanations } from "../service/Quiz"
import { getRandomKural } from "../service/Thirukural"
import { CORRECT_EXPLANATION_MESSAGE, WRONG_EXPLANATION_MESSAGE, KURAL } from "../constants"

const FindExplanationQuiz = () => {
  const [kural, setKural] = useState(null)
  const [explanations, setExplanations] = useState([])
  const [selectedExplanationIdx, setSelectedExplanationIdx] = useState(null)
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (kural === null && explanations.length === 0) {
      const kural = getRandomKural()
      const explanations = getExplanations(kural)
      setKural(kural)
      setExplanations(explanations)
    }
  }, [kural, explanations])

  useEffect(() => {
    if (selectedExplanationIdx === null) {
      setSelectedExplanationIdx(0)
    }
  }, [selectedExplanationIdx])

  const handleOnSubmit = (e) => {
    const selectedExplanation = explanations[selectedExplanationIdx].explanation
    const correctExplanation = kural.explanations[0].explanation
    console.log(`handle form submit, selectedExplanation: ${selectedExplanation} correctExplanation: ${correctExplanation}`)
    setIsCorrectAnswer(selectedExplanation === correctExplanation)
    setShowResult(true)
    e.preventDefault()
  }

  const handlNextQuiz = (e) => {
    console.log("handle next quiz")
    setShowResult(false)
    setIsCorrectAnswer(false)
    setKural(null)
    setExplanations([])
    setSelectedExplanationIdx(null)
  }

  const renderKural = (kuralNo, kural) => (
    <Form.Group>
      <Row className="fs-5">
        <Col>
          <Badge bg="primary">{`${KURAL} ${kuralNo}`}</Badge>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Form.Label className="kural">{kural}</Form.Label>
        </Col>
      </Row>
    </Form.Group>
  )

  return (
    <Container>
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
                {kural !== null ? renderKural(kural.kuralNo, kural.kural) : renderKural("", "")}
                <Form.Group>
                  {
                    explanations.map((item, idx) => (
                      <Form.Check
                        key={idx}
                        id={`explanation-option-${idx}`}
                        value={idx}
                        name="explanations"
                        type="radio"
                        label={item.explanation}
                        onChange={(e) => setSelectedExplanationIdx(e.target.value)}
                        defaultChecked={idx === 0}
                      />
                    ))
                  }
                </Form.Group>
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