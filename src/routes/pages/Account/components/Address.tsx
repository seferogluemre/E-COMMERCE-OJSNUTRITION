import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import axios from "axios";
import { BASE_URL } from "../../../../services/api/products";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  removeTokenAndAuthUser,
} from "../../../../services/api/collections/storage";

interface UserAddress {
  title: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  district: string;
  phone: string;
}

// Token kontrolü yapan yardımcı fonksiyon
const checkToken = () => {
  const token = getAccessToken();
  if (!token) {
    return false;
  }
  return token;
};

const createAxiosInstance = () => {
  const token = checkToken();
  if (!token) {
    throw new Error("No token found");
  }
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Token'ları temizleyip login sayfasına yönlendiren yardımcı fonksiyon
const handleSessionExpired = (navigate: any) => {
  if (!checkToken()) {
    removeTokenAndAuthUser(); // storage.ts'deki fonksiyonu kullanıyoruz
    navigate("/login");
  }
};

function Addresses() {
  const navigate = useNavigate();
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
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [addresses, setAddresses] = useState([]);

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
        if (error.response?.status === 401) {
          handleSessionExpired(navigate);
        }
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
        if (error.response?.status === 401) {
          handleSessionExpired(navigate);
        }
      }
    };
    fetchDistricts();
  }, [selectedCity, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    setFormData((prev) => ({
      ...prev,
      city: selectedCity,
    }));
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
    }));
  };

  // Form gönderme
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const api = createAxiosInstance();
      const selectedCityData = cities.find(
        (city) => city.name === formData.city
      );
      const selectedDistrictData = districts.find(
        (district) => district.name === formData.district
      );

      if (!selectedCityData || !selectedDistrictData) {
        alert("Lütfen şehir ve ilçe seçiniz");
        return;
      }

      // Format phone number to ensure it starts with 0 and contains only numbers
      const formattedPhone = formData.phone.replace(/\D/g, "");
      const phoneNumber = formattedPhone.startsWith("0")
        ? formattedPhone
        : `0${formattedPhone}`;

      const addressData = {
        title: formData.title.trim(),
        country_id: 226,
        region_id: parseInt(selectedCityData.id), // Ensure it's a number
        subregion_id: parseInt(selectedDistrictData.id), // Ensure it's a number
        full_address: formData.address.trim(),
        phone_number: phoneNumber,
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
      };

      // Log the request data for debugging
      console.log("Sending address data:", addressData);

      const response = await api.post("/users/addresses", addressData);

      fetchAddresses();
      setShowForm(false);
      setFormData({
        title: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        district: "",
        phone: "",
      });
      setSelectedCity("");
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  // Adresleri getirme
  const fetchAddresses = async () => {
    try {
      const api = createAxiosInstance();
      const response = await api.get("/users/addresses", {
        params: {
          limit: 10,
          offset: 0,
        },
      });
      setAddresses(response.data.data.results);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      if (error.response?.status === 401) {
        handleSessionExpired(navigate);
      }
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [navigate]);

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
              name="phone"
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
