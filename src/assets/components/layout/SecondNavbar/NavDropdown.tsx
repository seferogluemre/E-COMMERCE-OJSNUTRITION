import { Container } from "react-bootstrap";
import "./NavDropdown.scss";

function NavDropdown() {
  return (
    <Container fluid className="bg-dark mx-0" id="NavDropdown">
      <div className="container">
        <div
          className="dropdown d-flex"
          style={{ color: "white", height: "40px", padding: "10px" }}
        >
          <a href="#" className="dropdown-item">
            Protein
          </a>
          <a href="#" className="dropdown-item">
            Spor Gıdaları
          </a>
          <a href="#" className="dropdown-item">
            Tüm ürünler
          </a>
          <a href="#" className="dropdown-item">
            Saglık
          </a>
          <a href="#" className="dropdown-item">
            Gıda
          </a>
          <a href="#" className="dropdown-item">
            Vitamin
          </a>
        </div>
      </div>
    </Container>
  );
}

export default NavDropdown;
