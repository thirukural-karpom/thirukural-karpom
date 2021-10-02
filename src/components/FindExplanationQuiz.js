import { useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { getExplanations } from "../service/Quiz"
import { getRandomKural } from "../service/Thirukural"

const FindExplanationQuiz = () => {
  const [kural, setKural] = useState(getRandomKural())
  const [explanations, setExplanations] = useState(getExplanations(kural))

  return (
    <Container>
      <Form>
        <Form.Group>
          <Form.Label className="kural">{`${kural.kuralNo}: ${kural.kural}`}</Form.Label>
        </Form.Group>
        <Form.Group>
          {
            explanations.map((item, idx) => (
              <Form.Check
                key={idx}
                type="radio"
                label={item.explanation}
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