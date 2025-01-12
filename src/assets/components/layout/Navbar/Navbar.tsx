import {
  Button,
  Container,
  NavbarBrand,
  NavbarCollapse,
  Navbar,
  Form,
  NavbarToggle,
} from "react-bootstrap";
import "./_Navbar.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

function NavbarComp() {
  return (
    <>
      <Navbar className="bg-body-tertiary px-0">
        <Container>
          <GiHamburgerMenu className="fs-1 hamburger-menu" />
          <NavbarBrand href="#" className="bg-transparent">
            <img src="/src/assets/images/Logo1.png" className="Navbar-Logo" />
          </NavbarBrand>

          <NavbarToggle aria-controls="navbarScroll" className="d-lg-none" />
          <NavbarCollapse className="d-flex justify-content-end">
            <Form className="d-flex me-3" id="nav-search-form">
              <Form.Control
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button variant="secondary">Search</Button>
            </Form>
            <div className="dropdown" id="nav-dropdown">
              <Button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Hesap
              </Button>
            </div>
            <NavbarBrand>
              <AiOutlineShoppingCart className="fs-1 text-primary" />
            </NavbarBrand>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComp;
