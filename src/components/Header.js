import { React, useState } from "react"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { useTranslation } from "react-i18next";
import { ButtonGroup, ToggleButton } from "react-bootstrap"

const Header = () => {
  const { t, i18n } = useTranslation();
  const [radioValue, setRadioValue] = useState(i18n.language);
  const languages = [
    { name: "English", value: "en" },
    { name: "Tamil", value: "ta" }
  ]

  const handleLanguageChange = (e) => {
    const lang = e.currentTarget.value
    i18n.changeLanguage(lang)
    setRadioValue(lang)
  }

  const languageSelector = () => (
    <ButtonGroup>
      {
        languages.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant="primary"
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={handleLanguageChange}
          >
            {t(radio.name)}
          </ToggleButton>
        ))
      }
    </ButtonGroup>
  )

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">{t("Thirukural Karpom")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/kurals">{t("Kurals")}</Nav.Link>
              <NavDropdown title={t("Quiz")}>
                <NavDropdown.Item href="/quiz/findExplanation">{t("Find Explanation")}</NavDropdown.Item>
                <NavDropdown.Item href="/quiz/findKural">{t("Find Kural")}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav as={languageSelector}></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
