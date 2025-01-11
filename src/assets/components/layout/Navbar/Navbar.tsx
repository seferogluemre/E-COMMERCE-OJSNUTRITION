import { Button, Container, NavbarBrand, NavbarCollapse, Navbar, Form, NavbarToggle, NavDropdown } from 'react-bootstrap';
import './Navbar.scss'

function NavbarComp() {

    return <>
        <Navbar className="bg-body-tertiary px-5">
            <Container>
                <NavbarBrand href="#">
                    <img src="/src/assets/images/Logo1.png" className='Navbar-Logo' />
                </NavbarBrand>
                <NavbarToggle aria-controls="navbarScroll" />
                <NavbarCollapse className='d-flex justify-content-center'>
                    <Form className="d-flex me-3">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <Button variant="secondary">Search</Button>
                    </Form>
                    <div className="dropdown">
                        <Button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Hesap
                        </Button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                    </div>
                </NavbarCollapse>
            </Container>
        </Navbar>

    </>
}

export default NavbarComp;