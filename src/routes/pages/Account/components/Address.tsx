import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

function Addresses() {
  return (
    <div className="content-area">
      <h3 className="mb-4">Adreslerim</h3>
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <h5 className="card-title">Ev Adresi</h5>
                <div>
                  <Button variant="link" className="p-1">
                    {/* <Edit2 size={18} /> */}
                  </Button>
                  <Button variant="link" className="p-1 text-danger">
                    {/* <Trash2 size={18} /> */}
                  </Button>
                </div>
              </div>
              <p className="mb-1">Gülşah Seferoğlu</p>
              <p className="mb-1">+90 555 123 4567</p>
              <p className="mb-0">
                Ataşehir Mahallesi, Örnek Sokak No:123 D:4
                <br />
                Ataşehir/İstanbul
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-4">
          <Button
            variant="outline-primary"
            className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
            style={{ minHeight: "200px" }}
          >
            {/* <Plus size={24} className="mb-2" /> */}
            <span>Yeni Adres Ekle</span>
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default Addresses;
