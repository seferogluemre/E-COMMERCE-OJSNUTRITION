import { Outlet } from "react-router-dom";
import NavbarComp from "../../assets/components/layout/Navbar/Navbar";
import Footer from "../../assets/components/layout/Footer/Footer";
import GlobalToast from "../../assets/components/layout/ToastNotification/GlobalToast";

function RootLayout() {
  return (
    <>
      <NavbarComp />
      <GlobalToast />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default RootLayout;
