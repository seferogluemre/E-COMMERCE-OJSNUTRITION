import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";

interface UserAddress {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  phone: string;
}

function Addresses() {
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    phone: "",
  });

  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setUserAddress(JSON.parse(storedAddress));
    } else {
      setShowForm(true);
    }
  }, []);

  const handleInputChange = (e: React.FormEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    localStorage.setItem("userAddress", JSON.stringify(formData));
    setUserAddress(formData);
    setShowForm(false);
  };

  return (
    <div className="content-area">
      <h3 className="mb-4">Adreslerim</h3>
      {showForm ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>*Adres Başlığı</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formFirstName">
            <Form.Label>*Ad</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>*Soyad</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>*Adres</Form.Label>
            <Form.Control
              type="text"
              name="address"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>*Şehir</Form.Label>
            <Form.Control
              type="text"
              name="city"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDistrict">
            <Form.Label>*İlçe</Form.Label>
            <Form.Control
              type="text"
              name="district"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>*Telefon</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Button type="submit">Kaydet</Button>
        </Form>
      ) : (
        <Row>
          <Col md={6} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="card-title">
                    {userAddress?.title || "Başlık Yok"}
                  </h5>
                  <div>
                    <Button variant="link" className="p-1">
                      {/* <Edit2 size={18} /> */}
                    </Button>
                    <Button variant="link" className="p-1 text-danger">
                      {/* <Trash2 size={18} /> */}
                    </Button>
                  </div>
                </div>
                <p className="mb-1">
                  {userAddress
                    ? `${userAddress.firstName} ${userAddress.lastName}`
                    : "Ad Soyad Yok"}
                </p>
                <p className="mb-1">{userAddress?.phone || "Telefon Yok"}</p>
                <p className="mb-0">
                  {userAddress?.address || "Adres Yok"}
                  <br />
                  {userAddress
                    ? `${userAddress.city}/${userAddress.district}`
                    : "Şehir/İlçe Yok"}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Button
              variant="outline-primary"
              className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "200px" }}
              onClick={() => setShowForm(true)}
            >
              {/* <Plus size={24} className="mb-2" /> */}
              <span>Yeni Adres Ekle</span>
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Addresses;
