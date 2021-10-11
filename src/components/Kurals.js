import React, { useEffect, useState } from "react"
import { Badge, Button, Card, Col, Container, Form, Row, Tab, Tabs } from "react-bootstrap"
import { Typeahead } from "react-bootstrap-typeahead"
import { useTitle } from "react-use"
import { ADHIKARAM, APP_NAME, KURAL, KURALS, PAAL, SUBMIT } from "../constants"
import paals from "../data/paals.json"
import { getAdhikarams, getKurals } from "../service/Thirukural"

const Kurals = () => {
  const [selectedPaal, setSelectedPaal] = useState(null);
  const [adhikarams, setAdhikarams] = useState([]);
  const [selectedAdhikaram, setSelectedAdhikaram] = useState(null)
  const [kurals, setKurals] = useState([])

  useTitle(`${KURALS} | ${APP_NAME}`)

  useEffect(() => {
    console.log(">>>>> side-effect - selectedPaal")
    if (!selectedPaal) {
      const paal = paals[0]
      const adhikarams = getAdhikarams(paal)
      console.log(`adhikarams for ${paal}: ${adhikarams}`)
      const adhikaram = adhikarams[0]
      const kurals = getKurals(adhikaram.no)
      console.log(`kurals for ${adhikaram.no}-${adhikaram.name}: ${JSON.stringify(kurals)}`)

      setSelectedPaal([paal])
      setAdhikarams(adhikarams)
      setSelectedAdhikaram([adhikaram])
      setKurals(kurals)
    }
    console.log("<<<<< side-effect - selectedPaal")
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

  const handlePaalChange = (values) => {
    console.log(`handle paal change, values: ${values}`)
    setSelectedPaal(values)
    if (values.length) {
      const [paal] = values
      const adhikarams = getAdhikarams(paal)
      console.log(`adhikarams for ${paal}: ${adhikarams}`)
      setAdhikarams(adhikarams)
      setSelectedAdhikaram([adhikarams[0]])
    }
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
                <Col className="kural-text">
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
                    selected={selectedPaal !== null ? selectedPaal : []}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>{ADHIKARAM}</Form.Label>
                  <Typeahead
                    id="adhikaram-selector"
                    onChange={setSelectedAdhikaram}
                    labelKey={(option) => `${option.no} - ${option.name}`}
                    options={adhikarams}
                    placeholder={ADHIKARAM}
                    selected={selectedAdhikaram !== null ? selectedAdhikaram : []}
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group>
                  <Form.Label>&nbsp;</Form.Label>
                  <Form.Control as={Button} type="submit">
                    {SUBMIT}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {renderKurals()}

      <Row className="mb-2">
        <Col>&nbsp;</Col>
      </Row>
    </Container>
  )
}

export default Kurals
