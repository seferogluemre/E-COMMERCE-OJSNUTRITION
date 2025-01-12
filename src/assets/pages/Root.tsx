import { Outlet } from "react-router-dom";
import NavbarComp from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import NavDropdown from "../components/layout/SecondNavbar/NavDropdown";
import Nav from "../components/layout/SecondNavbar/Nav";

function RootLayout() {
  return (
    <>
      <NavbarComp />
      <NavDropdown />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
