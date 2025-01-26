import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../../../services/api/axios";
import {
  City,
  deleteAddress,
  District,
  fetchAddresses,
  handleSubmitAddress,
  updateUserAddress,
} from "../../../../services/api/collections/Addresses";
import { MdDelete, MdEdit } from "react-icons/md";

interface UserAddress {
  title: string;
  first_name: string;
  last_name: string;
  full_address: string;
  city: string;
  district: string;
  phone_number: string;
  id: string;
}

function Addresses() {
  const navigate = useNavigate();
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [formData, setFormData] = useState<UserAddress>({
    title: "",
    first_name: "",
    last_name: "",
    full_address: "",
    city: "",
    district: "",
    phone_number: "",
    id: "",
  });
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [addresses, setAddreses] = useState<UserAddress[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(
    null
  );

  useEffect(() => {
    const storedAddress = localStorage.getItem("userAddress");
    if (storedAddress) {
      setUserAddress(JSON.parse(storedAddress));
    } else {
      setShowForm(true);
    }
  }, []);

  // Şehirleri getirme
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const api = createAxiosInstance();
        const response = await api.get("/world/region", {
          params: {
            "country-name": "turkey",
            limit: 82,
            offset: 0,
          },
        });
        setCities(response.data.data.results);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, [navigate]);

  // İlçeleri getirme
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedCity) {
        setDistricts([]);
        return;
      }
      try {
        const api = createAxiosInstance();
        const response = await api.get("/world/subregion", {
          params: {
            "region-name": selectedCity,
            limit: 30,
            offset: 0,
          },
        });
        setDistricts(response.data.data.results);
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };
    fetchDistricts();
  }, [selectedCity, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmitAddress(
      formData,
      cities,
      districts,
      setShowForm,
      fetchAddresses
    );
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
    }));
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
    }));
  };

  useEffect(() => {
    fetchAddresses(setAddreses, setUserAddress, setShowForm);
  }, [navigate]);

  const handleEditClick = (address: UserAddress) => {
    setEditingAddress(address);
    setSelectedCity(address.city);
    setFormData({
      title: address.title,
      first_name: address.first_name,
      last_name: address.last_name,
      full_address: address.full_address,
      city: address.city,
      district: address.district,
      phone_number: address.phone_number,
      id: address.id,
    });
    console.log(address);
    setShowEditModal(true);
  };

  const handleUpdateAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateUserAddress({
        ...formData,
        region: cities.find((city) => city.name === formData.city) || {
          id: 0,
          name: "",
        },
        subregion: districts.find(
          (district) => district.name === formData.district
        ) || { id: 0, name: "" },
      });
      setShowEditModal(false);
      fetchAddresses(setAddreses, setUserAddress, setShowForm);
      window.location.reload();
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="content-area">
      <h3 className="mb-4">Adreslerim</h3>
      {showForm ? (
        <Form onSubmit={handleSubmit}>
          {showAlert ? (
            <Alert variant="success">
              <Alert.Heading>Adres Bulunamadı</Alert.Heading>
              <p>Kayıtlı adresiniz bulunamadı. Lütfen yeni adres ekleyiniz.</p>
            </Alert>
          ) : (
            ""
          )}
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
              name="first_name"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>*Soyad</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formAddress">
            <Form.Label>*Adres</Form.Label>
            <Form.Control
              type="text"
              name="full_address"
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>*Şehir</Form.Label>
            <Form.Select
              name="city"
              value={formData.city}
              onChange={handleCityChange}
              required
            >
              <option value="">Şehir Seçiniz</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formDistrict">
            <Form.Label>*İlçe</Form.Label>
            <Form.Select
              name="district"
              value={formData.district}
              onChange={handleDistrictChange}
              required
              disabled={!selectedCity}
            >
              <option value="">İlçe Seçiniz</option>
              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>*Telefon</Form.Label>
            <Form.Control
              type="tel"
              name="phone_number"
              pattern="[0-9]{10,11}"
              placeholder="05XXXXXXXXX"
              onChange={handleInputChange}
              required
            />
            <Form.Text className="text-muted">
              Telefon numaranızı başında 0 olacak şekilde 11 haneli olarak
              giriniz
            </Form.Text>
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>
            Kaydet
          </Button>
        </Form>
      ) : (
        <Row>
          {addresses.map((address: UserAddress) => (
            <Col md={6} className="mb-4" key={address.id}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title">
                      {address.title || "Başlık Yok"}
                    </h5>
                  </div>
                  <p className="mb-1">
                    {`${address.first_name} ${address.last_name}`}
                  </p>
                  <p className="mb-1">
                    {address.phone_number || "Telefon Yok"}
                  </p>
                  <p className="mb-0">
                    {address.full_address || "Adres Yok"}
                    <br />
                    {`${address.region.name}/${address.subregion.name}`}
                  </p>
                </Card.Body>
                <Card.Footer className="border-0 bg-transparent d-flex justify-content-between align-items-center">
                  <div className="delete-address">
                    <MdDelete
                      className="fs-3"
                      onClick={() => deleteAddress(address.id)}
                    />
                  </div>
                  <div
                    className="edit-address"
                    onClick={() => handleEditClick(address)}
                    style={{ cursor: "pointer" }}
                  >
                    <MdEdit className="fs-3" />
                    Adresi Düzenle
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
          <Col md={6} className="mb-4">
            <Button
              variant="outline-primary"
              className="w-100 h-100 d-flex flex-column align-items-center justify-content-center"
              style={{ minHeight: "200px" }}
              onClick={() => {
                setShowAlert(false);
                setShowForm(true);
              }}
            >
              <span>Yeni Adres Ekle</span>
            </Button>
          </Col>
        </Row>
      )}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adres Düzenle</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateAddress}>
            <Form.Group controlId="editTitle">
              <Form.Label>Adres Başlığı</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editFirstName">
              <Form.Label>Ad</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editLastName">
              <Form.Label>Soyad</Form.Label>
              <Form.Control
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editAddress">
              <Form.Label>Adres</Form.Label>
              <Form.Control
                type="text"
                name="full_address"
                value={formData.full_address}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="editCity">
              <Form.Label>Şehir</Form.Label>
              <Form.Select
                name="city"
                value={formData.city}
                onChange={handleCityChange}
                required
              >
                <option value="">Şehir Seçiniz</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="editDistrict">
              <Form.Label>İlçe</Form.Label>
              <Form.Select
                name="district"
                value={formData.district}
                onChange={handleDistrictChange}
                required
                disabled={!selectedCity}
              >
                <option value="">İlçe Seçiniz</option>
                {districts.map((district) => (
                  <option key={district.id} value={district.name}>
                    {district.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="editPhone">
              <Form.Label>Telefon</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-3">
              Güncelle
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Addresses;
