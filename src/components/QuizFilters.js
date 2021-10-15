import { useEffect, useState } from "react"
import { Accordion, Button, Col, Form, Row } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import { ADHIKARAM, CLEAR, EXPLANATION, FILTERS, PAAL, SUBMIT } from "../constants"
import explanationAuthors from "../data/explanation-authors.json"
import paals from "../data/paals.json"
import { log } from "../helpers"
import { getAdhikarams, getAllAdhikarams } from "../service/Thirukural"

const QuizFilters = ({ onApply, hasAdhikaramSelector = true, hasPaalSelector = true }) => {
  const [selectedPaals, setSelectedPaals] = useState([])
  const [selectedAdhikarams, setSelectedAdhikarams] = useState([])
  const defaultExplanationAuthor = explanationAuthors[0]
  const [selectedExplanationAuthor, setSelectedExplanationAuthor] = useState([defaultExplanationAuthor])
  const [adhikarams, setAdhikarams] = useState(null)

  useEffect(() => {
    log(">>>>> side-effect: adhikarams")
    if (!adhikarams) {
      const allAdhikarams = getAllAdhikarams()
      setAdhikarams(allAdhikarams)
    }
    log("<<<<< side-effect: adhikarams")
  }, [adhikarams])

  const handleOnSubmit = (e) => {
    log("handle filter form submit")
    onApply({
      paals: selectedPaals,
      adhikarams: selectedAdhikarams,
      explanationAuthor: selectedExplanationAuthor[0]
    })
    e.preventDefault()
  }

  const handleClear = () => {
    log("handle clear filter")
    setSelectedPaals([])
    setSelectedAdhikarams([])
    setSelectedExplanationAuthor([defaultExplanationAuthor])
    setAdhikarams(null)
  }

  const handlePaalChange = (paals) => {
    log(`handle paal change in filter, paals: ${paals}`)
    const adhikarams = paals.reduce((accumulator, paal) => accumulator.concat(...getAdhikarams(paal)), [])
    log(`handle paal change in filter, adhikarams: ${JSON.stringify(adhikarams)}`)
    setSelectedPaals(paals)
    setAdhikarams(adhikarams.length ? adhikarams : null)
    setSelectedAdhikarams([])
  }

  return (
    <Row>
      <Col>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{FILTERS}</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleOnSubmit}>
                {
                  hasPaalSelector ?
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
                    : ""
                }
                {
                  hasAdhikaramSelector ?
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
                    : ""
                }
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
                    {SUBMIT}
                  </Button>
                  <Button
                    variant="danger"
                    type="button"
                    onClick={handleClear}
                    className="mx-2">
                    <i className="bi bi-x"></i> {CLEAR}
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