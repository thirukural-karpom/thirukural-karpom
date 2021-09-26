import React from "react"
import { Link } from "react-router-dom"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import getString from "../strings";

const Header = () => (
  <header>
    <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">{getString("appName")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/browse">{getString("navBarBrowseTitle")}</Nav.Link>
              <NavDropdown title="Quiz">
                <NavDropdown.Item href="/quiz/:guessExplanation">{getString("navBarQuizGuessExplanationTitle")}</NavDropdown.Item>
                <NavDropdown.Item href="/quiz/:guessKural">{getString("navBarQuizGuessKuralTitle")}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  </header>
)

export default Header
