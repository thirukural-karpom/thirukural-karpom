import React from "react"
import { useTranslation } from "react-i18next";
import paals from "../data/thirukurals.json"
import { DropdownButton, Dropdown } from "react-bootstrap";

const Kurals = () => {
  const { t } = useTranslation();

  return (
    <div>
      <DropdownButton title={t("Paals")}>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </DropdownButton>
    </div>
  )
}

export default Kurals
