import React from "react"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { useTranslation } from "react-i18next";


const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">{t("Thirukural Karpom")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/kurals">{t("Kurals")}</Nav.Link>
              <NavDropdown title={t("Quiz")}>
                <NavDropdown.Item href="/quiz/:guessExplanation">{t("Find Explanation")}</NavDropdown.Item>
                <NavDropdown.Item href="/quiz/:guessKural">{t("Find Kural")}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
