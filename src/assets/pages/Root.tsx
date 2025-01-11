import { Outlet } from "react-router-dom";
import NavbarComp from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

function RootLayout() {
  return (
    <>
      <NavbarComp />
      <Outlet />
      <Footer />
    </>
  );
}

export default RootLayout;
