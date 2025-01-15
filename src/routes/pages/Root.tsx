import { Outlet } from "react-router-dom";
import NavbarComp from "../../assets/components/layout/Navbar/Navbar";
import Footer from "../../assets/components/layout/Footer/Footer";
import NavDropdown from "../../assets/components/layout/SecondNavbar/NavDropdown";
import Nav from "../../assets/components/layout/SecondNavbar/Nav";

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
