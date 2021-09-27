import React from "react"
import { PAALGAL } from "../constants"
import { DropdownButton, Dropdown } from "react-bootstrap"

const Kurals = () => {

  return (
    <div>
      <DropdownButton title={PAALGAL}>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default Kurals
