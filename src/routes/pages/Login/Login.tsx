import { useState } from "react";
import { Container, Row, Tab, Tabs } from "react-bootstrap";
import Signup from "./components/Signup";
import MemberLogin from "./components/MemberLogin";

function Login() {
  const [activeTab, setActiveTab] = useState<string>("signup");

  const renderContent = () => {
    switch (activeTab) {
      case "signup":
        return <Signup />;
      case "member_login":
        return <MemberLogin />;
      default:
        return <Signup />;
    }
  };

  return (
    <>
      <Container className="my-5">
        <Row className="px-lg-5">
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k!)}
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="signup" title="Üye Ol">
              {renderContent()}
            </Tab>
            <Tab eventKey="member_login" title="Üye Girişi">
              {renderContent()}
            </Tab>
          </Tabs>
        </Row>
      </Container>
    </>
  );
}
export default Login;
