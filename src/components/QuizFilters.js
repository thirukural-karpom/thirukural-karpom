import { useEffect, useState } from "react"
import { Accordion, Button, Col, Form, Row } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import { ADHIKARAM, EXPLANATION, FILTERS, PAAL } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import paals from "../data/paals.json"
import { getAdhikarams, getAllAdhikarams } from "../service/Thirukural"

const QuizFilters = (props) => {
  const [selectedPaals, setSelectedPaals] = useState([])
  const [selectedAdhikarams, setSelectedAdhikarams] = useState([])
  const [selectedExplanationAuthor, setSelectedExplanationAuthor] = useState([props.defaultExplanationAuthor])
  const [adhikarams, setAdhikarams] = useState(null)

  useEffect(() => {
    console.log(">>>>> side-effect: adhikarams")
    if (!adhikarams) {
      const allAdhikarams = getAllAdhikarams()
      setAdhikarams(allAdhikarams)
    }
    console.log("<<<<< side-effect: adhikarams")
  }, [adhikarams])

  const handleOnSubmit = (e) => {
    console.log("handle filter form submit")
    props.onApply({
      paals: selectedPaals,
      adhikarams: selectedAdhikarams,
      explanationAuthor: selectedExplanationAuthor[0]
    })
    e.preventDefault()
  }

  const handleClear = () => {
    console.log("handle clear filter")
    setSelectedPaals([])
    setSelectedAdhikarams([])
    setSelectedExplanationAuthor([props.defaultExplanationAuthor])
    setAdhikarams(null)
  }

  const handlePaalChange = (paals) => {
    console.log(`handle paal change in filter, paals: ${paals}`)
    const adhikarams = paals.reduce((accumulator, paal) => accumulator.concat(...getAdhikarams(paal)), [])
    console.log(`handle paal change in filter, adhikarams: ${JSON.stringify(adhikarams)}`)
    setSelectedPaals(paals)
    setAdhikarams(adhikarams.length ? adhikarams : null)
    setSelectedAdhikarams([])
  }

  return (
    <Row className="mt-2">
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{FILTERS}</Accordion.Header>
            <Accordion.Body>
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
                  <Form.Label>{ADHIKARAM}</Form.Label>
                  <Typeahead
                    id="adhikaram-selector"
                    labelKey={(option) => `${option.no} - ${option.name}`}
                    options={adhikarams ? adhikarams : []}
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
                <Form.Group className="mt-3">
                  <Button
                    type="submit"
                    className="mx-2">
                    Apply
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={handleClear}
                    className="mx-2">
                    <i className="bi bi-x"></i> Clear
                  </Button>
                </Form.Group>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Row>
  )
}

export default QuizFilters