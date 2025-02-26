import {
  Container,
  NavbarBrand,
  NavbarCollapse,
  Navbar,
  Form,
} from "react-bootstrap";
import "./_Navbar.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { useSearchProduct } from "../../../store/products/useSearchProduct";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import { NavLink } from "react-router-dom";
import MobileSidebar from "./components/MobileSidebar/MobileSidebar";
import {
  isAuthenticated,
  getAccessToken,
  isTokenExpired,
  refreshAccessToken,
} from "../../../services/api/collections/auth";
import {
  getAuthUser,
  removeTokenAndAuthUser,
} from "../../../services/api/collections/storage";
import { useNavigate } from "react-router-dom";
import MyCart from "./components/MyCart/MyCart";
import { useCartStore } from "../../../store/products/Cart";
import { useToastStore } from "../../../store/toast/ToastStore";

function NavbarComp() {
  const [query, setQuery] = useState<string>("");
  const { searchProducts } = useSearchProduct((state) => state);
  const [show, setShow] = useState<boolean>(false);

  const user = getAuthUser() ? JSON.parse(getAuthUser()!) : null;
  const authenticated = isAuthenticated();
  const navigate = useNavigate();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSearch = () => {
    searchProducts(query);
  };

  const handleLogout = () => {
    removeTokenAndAuthUser();
    useToastStore.getState().showToast("Çıkış yapıldı", "success");
    navigate("/");
  };

  const [showTwo, setShowTwo] = useState<boolean>(false);

  const handleShowTwo = () => setShowTwo(true);
  const handleCloseTwo = () => setShowTwo(false);

  const getTotalItems = useCartStore((state) => state.getTotalItems);
  // Token kontrolü

  useEffect(() => {
    const checkToken = async () => {
      const token = getAccessToken();
      if (token && isTokenExpired(token)) {
        try {
          await refreshAccessToken();
        } catch (error) {
          console.error("Token yenileme hatası:", error);
          handleLogout();
        }
      }
    };

    checkToken();
  }, []);

  return (
    <>
      <Navbar className="bg-white px-0">
        <Container>
          <div
            className="d-flex align-items-center justify-content-start "
            id="navbar-left"
          >
            <GiHamburgerMenu
              className="fs-1 hamburger-menu m-1"
              onClick={handleShow}
            />
            <NavbarBrand href="/" className="bg-transparent">
              <img src="/assets/Logo1.png" className="Navbar-Logo" />
            </NavbarBrand>
          </div>

          <div className="mx-5">
            <Form
              className="d-flex rounded-4 align-items-center"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <Search />
              <input
                type="search"
                placeholder="Aradıgınız ürünü yazınız...."
                aria-label="Search"
                id="search-input"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  handleSearch();
                }}
              />
              <button type="submit" className="btn-search text-center">
                Ara
              </button>
            </Form>
          </div>

          <NavbarCollapse className="d-flex justify-content-center column-gap-lg-3">
            <div className="dropdown me-1" id="nav-dropdown-account">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <AiOutlineUser className="fs-4" />
                {authenticated && user
                  ? `${user.first_name || user.first_name}`
                  : "Hesap"}
              </button>
              <ul className="dropdown-menu">
                {authenticated && user ? (
                  <>
                    <li>
                      <NavLink
                        to="/account"
                        className="dropdown-item bg-transparent text-black"
                      >
                        Hesabım
                      </NavLink>
                    </li>
                    <hr className="m-0" />
                    <li>
                      <button
                        onClick={handleLogout}
                        className="dropdown-item bg-transparent text-black"
                      >
                        Çıkış Yap
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/login"
                        className="dropdown-item bg-transparent text-black"
                      >
                        Üye Ol
                      </NavLink>
                    </li>
                    <hr className="m-0" />
                    <li>
                      <NavLink
                        to="/login"
                        className="dropdown-item bg-transparent text-black"
                      >
                        Üye Girişi
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button
              className={`btn btn-secondary d-flex align-items-center justify-content-center gap-2`}
              onClick={handleShowTwo}
              id="cart-container"
              style={{ transition: 'all 0.3s ease' }}
            >
              <div className="position-relative">
                <span
                  className="position-absolute badge rounded-pill bg-danger"
                  id="cart-badge"
                  style={{
                    top: '-8px',
                    right: '-8px',
                    fontSize: '0.75rem',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getTotalItems()}
                </span>
                <IoCartOutline className="fs-3" />
              </div>
              <span>Sepetim</span>
            </button>
            <NavbarBrand>
              <div
                className="position-relative cart-icon-container"
                onClick={() => handleShowTwo()}
              >
                <AiOutlineShoppingCart className=" text-primary cart-icon" />
                <span className=" position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                  {getTotalItems()}
                </span>
              </div>
            </NavbarBrand>
          </NavbarCollapse>
        </Container>
      </Navbar>
      <Form
        className="d-flex rounded-4 mx-1 mb-2 align-items-center bg-body-secondary"
        id="custom-form-control"
      >
        <IoSearchOutline className="fs-4" />
        <Form.Control
          type="search"
          placeholder="Aradıgınız ürünü yazınız...."
          className="border-0 rounded-4 bg-body-secondary custom-form-control"
          aria-label="Search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            handleSearch();
          }}
        />
      </Form>
      <MobileSidebar show={show} handleClose={handleClose} />
      <MyCart handleCloseTwo={handleCloseTwo} show={showTwo} />
    </>
  );
}

export default NavbarComp;
