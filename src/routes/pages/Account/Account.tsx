import { Col, Container, Nav, Row } from "react-bootstrap";
import "./Account.scss";
import AccountInfo from "./components/AccountInfo";
import Orders from "./components/Orders";
import Addresses from "./components/Address";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { LuPackageOpen } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
function Account() {
  const [activeTab, setActiveTab] = useState("account");

  const renderContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountInfo />;
      case "orders":
        return <Orders />;
      case "addresses":
        return <Addresses />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={3} className="sidebar">
            <h2 className="mb-4 fs-2">Hesabım</h2>
            <Nav className="flex-column tabs-link">
              <Nav.Link
                className={activeTab === "account" ? "active" : ""}
                onClick={() => setActiveTab("account")}
              >
                <CiUser className="fs-4 m-1" />
                Hesap Bilgilerim
              </Nav.Link>
              <Nav.Link
                className={activeTab === "orders" ? "active" : ""}
                onClick={() => setActiveTab("orders")}
              >
                <LuPackageOpen className="fs-4 m-1" />
                Siparişlerim
              </Nav.Link>
              <Nav.Link
                className={activeTab === "addresses" ? "active" : ""}
                onClick={() => setActiveTab("addresses")}
              >
                <CiLocationOn className="fs-5 m-1" />
                Adreslerim
              </Nav.Link>
            </Nav>
          </Col>
          <Col md={9}>{renderContent()}</Col>
        </Row>
      </Container>
    </>
  );
}

export default Account;
