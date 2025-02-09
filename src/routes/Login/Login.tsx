import { useState } from "react";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import Signup from "./components/Signup";
import MemberLogin from "./components/MemberLogin";
import { useCartStore } from "../../store/products/Cart";
import "./Login.scss";

function Login() {
  const [activeTab, setActiveTab] = useState<string>("signup");
  const fetchUserCart = useCartStore((state) => state.fetchUserCart);


  // Login başarılı olduğunda çağrılacak callback
  const onLoginSuccess = () => {
    // Kullanıcı sepetini yükle
    fetchUserCart();
  };

  const renderContent = () => {
    switch (activeTab) {
      case "signup":
        return <Signup />;
      case "member_login":
        return <MemberLogin onLoginSuccess={onLoginSuccess} />;
      default:
        return <Signup />;
    }
  };

  return (
    <>
      <Container className="my-5 w-75">
        <Row className="px-lg-5 d-flex justify-content-center">
          <div className="form-container">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k!)}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="signup" title="Üye Ol" id="tab">
              {renderContent()}
            </Tab>
            <Tab eventKey="member_login" title="Üye Girişi" id="tab">
              {renderContent()}
            </Tab>
          </Tabs>
          </div>
        </Row>
      </Container>
    </>
  );
}

export default Login;
