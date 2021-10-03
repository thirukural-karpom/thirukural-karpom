import React, { useEffect, useState } from "react"
import { Badge, Button, Card, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import { ADHIKARAM, KURAL, PAAL } from "../constants"
import paals from "../data/paals.json"
import { getAdhikarams, getKurals } from "../service/Thirukural"
import "./Kurals.css"


const Kurals = () => {
  const [selectedPaal, setSelectedPaal] = useState([paals[0]]);
  const [adhikarams, setAdhikarams] = useState([]);
  const [selectedAdhikaram, setSelectedAdhikaram] = useState([])
  const [kurals, setKurals] = useState([])
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (selectedPaal.length !== 0) {
      const paal = selectedPaal[0]
      console.log(`get adhikarams for paal: ${paal}`)
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

  useEffect(() => {
    if (selectedAdhikaram.length !== 0 && !hasInteracted) {
      const adhikaram = selectedAdhikaram[0]
      console.log(`get kurals for adhikaram: ${adhikaram}`)
      const kurals = getKurals(adhikaram.no)
      console.log(`kurals: ${JSON.stringify(kurals)}`)
      setKurals(kurals)
    }
  }, [selectedAdhikaram, hasInteracted])

  const handleSubmit = (event) => {
    console.log("handle form submit")
    const adhikaram = selectedAdhikaram[0]
    console.log(`get kurals for adhikaram: ${adhikaram}`)
    const kurals = getKurals(adhikaram.no)
    console.log(`kurals: ${JSON.stringify(kurals)}`)
    setKurals(kurals)
    console.log("user has interacted with submit button so setting hasInteracted to true")
    setHasInteracted(true)
    event.preventDefault()
  }

  const handlePaalChange = (value) => {
    setSelectedPaal(value)
    console.log("user has interacted with paal selector so setting hasInteracted to true")
    setHasInteracted(true)
  }

  const handleAdhikaramChange = (value) => {
    setSelectedAdhikaram(value)
    console.log("user has interacted with adhikaram selector so setting hasInteracted to true")
    setHasInteracted(true)
  }

  const renderKurals = () => (
    kurals.map((k, idx) => (
      <Row key={idx} className="my-3">
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="fs-5">
                <Col >
                  <Badge bg="primary">{`${KURAL} ${k.kuralNo}`}</Badge>
                </Col>
              </Row>
              <Row className="my-3">
                <Col className="kural">
                  {k.kural}
                </Col>
              </Row>
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
    <Container>
      <Row className="my-3">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={{ span: 4, offset: 1 }}>
                <Form.Group>
                  <Form.Label>{PAAL}</Form.Label>
                  <Typeahead
                    id="paal-selector"
                    onChange={handlePaalChange}
                    options={paals}
                    placeholder={PAAL}
                    selected={selectedPaal}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>{ADHIKARAM}</Form.Label>
                  <Typeahead
                    id="adhikaram-selector"
                    onChange={handleAdhikaramChange}
                    labelKey={(option) => `${option.no} - ${option.name}`}
                    options={adhikarams}
                    placeholder={ADHIKARAM}
                    selected={selectedAdhikaram}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control as={Button} type="submit">
                    Submit
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {renderKurals()}

      <Row className="mb-5">
        <Col>&nbsp;</Col>
      </Row>
    </Container>
  )
}

export default Kurals
