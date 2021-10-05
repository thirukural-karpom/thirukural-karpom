import { useEffect, useState } from "react"
import { Button, Col, Form, Row } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import { ADHIKARAM, EXPLANATION, PAAL } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import paals from "../data/paals.json"
import { getAdhikarams } from "../service/Thirukural"

const QuizFilters = (props) => {
  const [selectedPaals, setSelectedPaals] = useState([])
  const [selectedAdhikarams, setSelectedAdhikarams] = useState([])
  const [selectedExplanationAuthor, setSelectedExplanationAuthor] = useState([explanationAuthors[0]])
  const [adhikarams, setAdhikarams] = useState([])

  const handleOnSubmit = (e) => {
    props.onApply({
      paals: selectedPaals,
      adhikarams: selectedAdhikarams,
      explanationAuthor: selectedExplanationAuthor[0]
    })
    e.preventDefault()
  }

  const handlePaalChange = (paals) => {
    setSelectedPaals(paals)
    console.log(`handle paal change in filter, paals: ${paals}`)
    const adhikarams = paals.reduce((accumulator, paal) => {
      accumulator.push(...getAdhikarams(paal))
      return accumulator
    }, [])
    console.log(`handle paal change in filter, adhikarams: ${JSON.stringify(adhikarams)}`)
    setAdhikarams(adhikarams)
  }

  return (
    <Row>
      <Col>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group>
            <Form.Label>{PAAL}</Form.Label>
            <Typeahead
              id="paal-selector"
              options={paals}
              placeholder={PAAL}
              selected={selectedPaals}
              onChange={handlePaalChange}
              multiple
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{PAAL}</Form.Label>
            <Typeahead
              id="adhikaram-selector"
              labelKey={(option) => `${option.no} - ${option.name}`}
              options={adhikarams}
              placeholder={ADHIKARAM}
              selected={selectedAdhikarams}
              onChange={setSelectedAdhikarams}
              multiple
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>{EXPLANATION}</Form.Label>
            <Typeahead
              id="explanation-author-selector"
              options={explanationAuthors}
              placeholder={EXPLANATION}
              selected={selectedExplanationAuthor}
              onChange={setSelectedExplanationAuthor}
            />
          </Form.Group>
          <Form.Group>
            <Button type="submit">Apply</Button>
          </Form.Group>
        </Form>
      </Col>
    </Row>
  )
}

export default QuizFilters