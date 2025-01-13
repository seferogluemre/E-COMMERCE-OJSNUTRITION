import { Container } from "react-bootstrap";
import "./NavDropdown.scss";

function NavDropdown() {
  const Links = [
    { Link: "Protein" },
    { Link: "Spor Gıdaları" },
    { Link: "Tüm ürünler" },
    { Link: "Saglık" },
    { Link: "Gıda" },
    { Link: "Vitamin" },
  ];

  return (
    <Container fluid className="bg-dark mx-0" id="NavDropdown">
      <div className="container">
        <div
          className="dropdown d-flex"
          style={{ color: "white", height: "40px", padding: "10px" }}
        >
          {Links.map((link) => (
            <a href="#" className="dropdown-item">
              {link.Link}
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default NavDropdown;
