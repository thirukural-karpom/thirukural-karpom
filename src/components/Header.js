import { React } from "react"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { APP_NAME, FIND_EXPLANATION, FIND_KURAL, QUIZ } from "../constants"

const Header = () => {

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title={QUIZ}>
                <NavDropdown.Item href="/quiz/findExplanation">{FIND_EXPLANATION}</NavDropdown.Item>
                <NavDropdown.Item href="/quiz/findKural">{FIND_KURAL}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link
                target="_blank"
                href="https://github.com/thirukural-karpom/thirukural-karpom"
                className="py-0">
                <i className="bi bi-github fs-4"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
