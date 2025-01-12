import { Container } from "react-bootstrap";
import "./Dropdown.scss";
import { FaChevronDown } from "react-icons/fa";

function NavDropdown() {
  return (
    <Container fluid className="bg-dark mx-0">
      <div className="container">
        <div
          className="dropdown"
          style={{ backgroundColor: "black", color: "white", height: "40px" }}
        >
          <a href="#" className="dropdown-item">
            Link 1 <FaChevronDown />
          </a>
          <a href="#" className="dropdown-item">
            Link 2 <FaChevronDown />
          </a>
          <a href="#" className="dropdown-item">
            Link 3 <FaChevronDown />
          </a>
        </div>
      </div>
    </Container>
  );
}

export default NavDropdown;
