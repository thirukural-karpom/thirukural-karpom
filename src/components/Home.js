import { Container, Row, Col, Figure } from "react-bootstrap"

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={5}>
          <Figure>
            <Figure.Image
              width={500}
              alt="Thiruvalluvar statue at Kanyakumari"
              src="/thiruvalluvar-statue.jpg"
              className="mb-0"
            />
            <Figure.Caption>
              <small>
                <p className="text-end">By <a href="//commons.wikimedia.org/w/index.php?title=User:Darisi&action=edit&redlink=1" title="User:Darisi (page does not exist)">Darisi sumanth</a> - <span lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/3.0" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=28367057">Link</a></p>
              </small>
            </Figure.Caption>
          </Figure>
        </Col>
      </Row>
    </Container >
  )
}

export default Home