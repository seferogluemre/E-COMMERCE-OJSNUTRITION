import { Container } from "react-bootstrap";
import "./NavDropdown.scss";

function NavDropdown() {
  const Links = [
    { Link: "Protein", to: "" },
    { Link: "Spor Gıdaları", to: "" },
    { Link: "Tüm ürünler", to: "/products" },
    { Link: "Saglık", to: "" },
    { Link: "Gıda", to: "" },
    { Link: "Vitamin", to: "" },
  ];

  return (
    <Container fluid className="bg-dark mx-0" id="NavDropdown">
      <div className="container">
        <div
          className="dropdown d-flex"
          style={{ color: "white", height: "40px", padding: "10px" }}
        >
          {Links.map((link, index) => (
            <a href={link.to} className="dropdown-item" key={index}>
              {link.Link}
            </a>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default NavDropdown;
