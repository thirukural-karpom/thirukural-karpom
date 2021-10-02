import { Container, Navbar, NavbarBrand } from "react-bootstrap"

const Footer = () => {
  return (
    <footer className="fixed-bottom">
      <Navbar variant="dark" bg="secondary">
        <Container>
          <NavbarBrand>Footer</NavbarBrand>
        </Container>
      </Navbar>
    </footer>
  )
}

export default Footer