import React, { useEffect, useState } from "react"
import { PAAL, ADHIKARAM } from "../constants"
import { Container, Row, Col, Form, Button, Card, Tabs, Tab, Badge } from "react-bootstrap"
import paals from "../data/paals.json"
import { getAdhikarams, getKurals } from "../service/Thirukural"
import { Typeahead } from "react-bootstrap-typeahead"

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

      <Row className="mt-2">
        <Col md={{ span: 8, offset: 2 }}>
          <Card>
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col xs={9}>
                    ஒழுக்கத்து நீத்தார் பெருமை விழுப்பத்து <br />வேண்டும் பனுவல் துணிவு
                  </Col>
                  <Col xs={3} className="text-end">
                    <Badge bg="secondary">குறள்: 1</Badge>
                  </Col>
                </Row>
              </Card.Title>
              <Tabs defaultActiveKey="0" className="my-3">
                <Tab eventKey="0" title="மு.வரதராசன்">
                  ஒழுக்கத்தில் நிலைத்து நின்று பற்று விட்டவர்களின் பெருமையைச் சிறந்ததாக போற்றி கூறுவதே நூல்களின் துணிவாகும்.
                </Tab>
                <Tab eventKey="1" title="சாலமன் பாப்பையா">
                  தமக்குரிய ஒழுக்கத்தில் வாழ்ந்து, ஆசைகளை அறுத்து, உயர்ந்த மேன்மக்களின் பெருமையே, சிறந்தனவற்றுள் சிறந்தது என்று நூல்கள் சொல்கின்றன.
                </Tab>
                <Tab eventKey="2" title="மு.கருணாநிதி">
                  ஒழுக்கத்தில் உறுதியான துறவிகளின் பெருமை, சான்றோர் நூலில் விருப்பமுடனும், உயர்வாகவும் இடம் பெறும்
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Kurals
