import { useEffect, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { getExplanations } from "../service/Quiz"
import { getRandomKural } from "../service/Thirukural"

const FindExplanationQuiz = () => {
  const [kural, setKural] = useState(null)
  const [explanations, setExplanations] = useState([])
  const [selectedExplanationIdx, setSelectedExplanationIdx] = useState(null)

  useEffect(() => {
    if (kural === null && explanations.length === 0) {
      const kural = getRandomKural()
      const explanations = getExplanations(kural)
      setKural(kural)
      setExplanations(explanations)
    }
  }, [kural, explanations])

  const handleOnSubmit = (e) => {
    const selectedExplanation = explanations[selectedExplanationIdx].explanation
    const correctExplanation = kural.explanations[0].explanation
    console.log(`handle form submit, selectedExplanation: ${selectedExplanation} correctExplanation: ${correctExplanation}`)
    if (selectedExplanation === correctExplanation) {
      console.log("correct option chosen")
    } else {
      console.log("wrong option chosen")
    }
    e.preventDefault()
  }

  return (
    <Container>
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
              />
            ))
          }
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default FindExplanationQuiz