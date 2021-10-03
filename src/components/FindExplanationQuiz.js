import { useEffect, useState } from "react"
import { Button, Container, Form, Row, Col, Alert } from "react-bootstrap"
import { getExplanations } from "../service/Quiz"
import { getRandomKural } from "../service/Thirukural"

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

  return (
    <Container>
      <Row>
        <Col>
          <Alert variant="success" show={showResult && isCorrectAnswer}>
            Correct
          </Alert>
          <Alert variant="danger" show={showResult && !isCorrectAnswer}>
            Wrong
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group>
              {
                kural !== null ?
                  <Form.Label className="kural">{`${kural.kuralNo}: ${kural.kural}`}</Form.Label>
                  : <Form.Label className="kural"></Form.Label>
              }
            </Form.Group>
            <Form.Group>
              {
                explanations.map((item, idx) => (
                  <Form.Check
                    key={idx}
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
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default FindExplanationQuiz