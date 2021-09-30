import React, { useEffect, useState } from "react"
import { PAAL, ADHIKARAM } from "../constants"
import { Container, Col, Form, Button } from "react-bootstrap"
import paals from "../data/paals.json"
import { getAdhikarams } from "../service/Thirukural"
import { Typeahead } from "react-bootstrap-typeahead"

const Kurals = () => {
  const [selectedPaal, setSelectedPaal] = useState([paals[0]]);
  const [adhikarams, setAdhikarams] = useState([]);
  const [selectedAdhikaram, setSelectedAdhikaram] = useState([])

  useEffect(() => {
    if (selectedPaal.length !== 0) {
      const paal = selectedPaal[0]
      console.log(`loading adhikarams for paal: ${paal}`)
      const adhikarams = getAdhikarams(paal)
      console.log(`adhikarams: ${adhikarams}`)
      setAdhikarams(adhikarams)
      setSelectedAdhikaram([adhikarams[0]])
    } else {
      console.log("no selected paal")
      setAdhikarams([])
      setSelectedAdhikaram([])
    }
  }, [selectedPaal])

  const handleSubmit = (event) => {
    console.log("handle form submit")
    event.preventDefault();
  }

  return (
    <Container onSubmit={handleSubmit}>
      <Form className="row">
        <Form.Group as={Col} md={5} className="mb-3">
          <Form.Label>{PAAL}</Form.Label>
          <Typeahead
            id="paal-selector"
            onChange={setSelectedPaal}
            options={paals}
            placeholder={PAAL}
            selected={selectedPaal}
          />
        </Form.Group>
        <Form.Group as={Col} md={5} className="mb-3">
          <Form.Label>{ADHIKARAM}</Form.Label>
          <Typeahead
            id="adhikaram-selector"
            onChange={setSelectedAdhikaram}
            labelKey={(option) => `${option.no} - ${option.name}`}
            options={adhikarams}
            placeholder={ADHIKARAM}
            selected={selectedAdhikaram}
          />
        </Form.Group>
        <Form.Group as={Col} md={1} className="mb-3">
          <Form.Label>&nbsp;</Form.Label>
          <Form.Control as={Button} type="submit">
            Submit
          </Form.Control>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default Kurals
