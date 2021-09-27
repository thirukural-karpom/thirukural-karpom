import { React } from "react"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import { APP_NAME, KURALS, QUIZ, FIND_EXPLANATION, FIND_KURAL } from "../constants"

const Header = () => {

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">{APP_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/kurals">{KURALS}</Nav.Link>
              <NavDropdown menuVariant="dark" title={QUIZ}>
                <NavDropdown.Item href="/quiz/findExplanation">{FIND_EXPLANATION}</NavDropdown.Item>
                <NavDropdown.Item href="/quiz/findKural">{FIND_KURAL}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
