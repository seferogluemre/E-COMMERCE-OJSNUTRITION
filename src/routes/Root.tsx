import { Outlet } from "react-router-dom";
import NavbarComp from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";
import NavDropdown from "../components/layout/SecondNavbar/NavDropdown";
import Nav from "../components/layout/SecondNavbar/Nav";
import Notification from "../components/ToastNotification/Notification";
import { useToastStore } from "../store/toast/ToastStore";

function RootLayout() {
  const { message, type, isVisible, hideToast } = useToastStore();

  return (
    <>
      <NavbarComp />
      <NavDropdown />
      <Nav />
      <Outlet />
      <Footer />
      <Notification
        type={type}
        message={message}
        isVisible={isVisible}
        onClose={hideToast}
      />
    </>
  );
}

export default RootLayout;
