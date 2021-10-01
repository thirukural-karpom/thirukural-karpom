import React, { useEffect, useState } from "react"
import { PAAL, ADHIKARAM, KURALS, KURAL } from "../constants"
import { Container, Row, Col, Form, Button, Card, Tabs, Tab, Badge } from "react-bootstrap"
import paals from "../data/paals.json"
import { getAdhikarams, getKurals } from "../service/Thirukural"
import { Typeahead } from "react-bootstrap-typeahead"

import "./Kurals.css"

const Kurals = () => {
  const [selectedPaal, setSelectedPaal] = useState([paals[0]]);
  const [adhikarams, setAdhikarams] = useState([]);
  const [selectedAdhikaram, setSelectedAdhikaram] = useState([])
  const [kurals, setKurals] = useState([])

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
    const adhikaram = selectedAdhikaram[0]
    console.log(`get kurals for adhikaram: ${adhikaram}`)
    const kurals = getKurals(adhikaram.no)
    console.log(`kurals: ${JSON.stringify(kurals)}`)
    setKurals(kurals)
    event.preventDefault()
  }

  const renderKurals = () => (
    kurals.map((k, idx) => (
      <Row key={idx} className="my-3">
        <Col md={{ span: 8, offset: 2 }}>
          <Card border="secondary">
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col className="kural" xs={9}>
                    {k.kural}
                  </Col>
                  <Col xs={3} className="text-end">
                    <Badge bg="primary">{`${KURAL} ${k.kuralNo}`}</Badge>
                  </Col>
                </Row>
              </Card.Title>
              <Tabs defaultActiveKey="0" className="my-3">
                {k.explanations.map((e, idx) => (<Tab key={idx} eventKey={idx} title={e.author}>{e.explanation}</Tab>))}
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    ))
  )

  return (
    <Container onSubmit={handleSubmit}>
      <Form className="row">
        <Form.Group as={Col} md={{ span: 4, offset: 1 }} className="mb-3">
          <Form.Label>{PAAL}</Form.Label>
          <Typeahead
            id="paal-selector"
            onChange={setSelectedPaal}
            options={paals}
            placeholder={PAAL}
            selected={selectedPaal}
          />
        </Form.Group>
        <Form.Group as={Col} md={4} className="mb-3">
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
        <Form.Group as={Col} md={2} className="mb-3">
          <Form.Label>&nbsp;</Form.Label>
          <Form.Control as={Button} type="submit">
            Submit
          </Form.Control>
        </Form.Group>
      </Form>

      {renderKurals()}
    </Container>
  )
}

export default Kurals
