import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import { Container, Row } from "react-bootstrap";
import "./FAQ.scss";
import { FaRegCreditCard } from "react-icons/fa6";
import ContactForm from "../Contact/components/Form/Form";
import { SSS } from "../../data/FAQ";

interface SSSItem {
  request: string;
  reply: string;
}

export interface SSSData {
  genel: SSSItem[];
  ürünler?: SSSItem[];
  kargo?: SSSItem[];
}

function ControlledTabsExample() {
  const [key, setKey] = useState<string>("genel");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Container className="my-5 pt-3">
      <Row className="d-flex justify-content-center">
        <div className="col-sm-12 col-lg-12 col-md-12">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => k && setKey(k)}
            className=" border-0"
          >
            {["genel", "ürünler", "kargo"].map((tabKey) => (
              <Tab key={tabKey} eventKey={tabKey} className="tab-container" title={tabKey}>
                <Accordion>
                  <div className="mb-3 p-0" id="tab-title">
                    <span className="m-3">
                      <FaRegCreditCard className="fs-3 me-1 text-primary" />
                      {key}
                    </span>
                  </div>
                  {SSS[tabKey as keyof SSSData]?.map((item, index) => (
                    <div key={index}>
                      <Accordion.Item className="accordion-item" eventKey={index.toString()}>
                        <Accordion.Header
                          onClick={() => handleToggle(index)}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            width: "100%",
                          }}
                          className="accordion-header"
                        >
                          <span>{item.request}</span>
                          <span className="toggle-icon">{openIndex === index ? "−" : "+"}</span>
                        </Accordion.Header>
                        <Accordion.Body className="accordion-body">
                          {item.reply}
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  )) ?? <div>No items available.</div>}
                </Accordion>
              </Tab>
            ))}
          </Tabs>
        </div>
      </Row>
      <Row className="mt-3">
        <ContactForm />
      </Row>
    </Container >
  );
}

export default ControlledTabsExample;
