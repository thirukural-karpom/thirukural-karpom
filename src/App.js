import './App.css';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import getString from './strings';

function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">{getString("appName")}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="#">{getString("navBarBrowseTitle")}</Nav.Link>
              <NavDropdown title="Quiz">
                <NavDropdown.Item href="#">{getString("navBarQuizGuessExplanationTitle")}</NavDropdown.Item>
                <NavDropdown.Item href="#">{getString("navBarQuizGuessKuralTitle")}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default App;
