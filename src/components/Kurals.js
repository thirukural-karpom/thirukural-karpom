import React, { useState } from "react"
import { PAAL, ADHIKARAM } from "../constants"
import { DropdownButton, Dropdown, Container } from "react-bootstrap"
import paals from "../data/paals.json"
import { getAdhikarams } from "../service/Thirukural"

const Kurals = () => {
  const [paalIdx, setPaalIdx] = useState(0)
  const paal = paals[paalIdx]
  const adhikarams = getAdhikarams(paal)
  const [adhikaramIdx, setAdhikaramIdx] = useState(0)
  const adhikaram = adhikarams[adhikaramIdx]

  return (
    <div>
      <Container>
        <DropdownButton id="paal-selector" title={`${PAAL}: ${paal}`} variant="white">
          {
            paals.map((paal, idx) => (
              <Dropdown.Item
                as="button"
                value={idx}
                onClick={(e) => setPaalIdx(e.target.value)}
              >
                {paal}
              </Dropdown.Item>))
          }
        </DropdownButton>

        <DropdownButton id="adhikaram-selector" title={`${ADHIKARAM}: ${adhikaram}`} variant="white">
          {
            adhikarams.map((adhikaram, idx) => (
              <Dropdown.Item
                as="button"
                value={idx}
                onClick={(e) => setAdhikaramIdx(e.target.value)}
              >
                {adhikaram}
              </Dropdown.Item>))
          }
        </DropdownButton>
      </Container>
    </div >
  )
}

export default Kurals
