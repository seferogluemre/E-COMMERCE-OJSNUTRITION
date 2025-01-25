import { Outlet } from "react-router-dom";
import NavbarComp from "../../assets/components/layout/Navbar/Navbar";
import Footer from "../../assets/components/layout/Footer/Footer";
import NavDropdown from "../../assets/components/layout/SecondNavbar/NavDropdown";
import Nav from "../../assets/components/layout/SecondNavbar/Nav";
import Notification from "../../assets/components/layout/ToastNotification/Notification";
import { useToastStore } from "../../store/toast/ToastStore";

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
