import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../../../services/api/axios";
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
  const [addresses, setAddreses] = useState([]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Formun sayfa yenilemesini engelle

    // Telefon numarasına +90 ekliyoruz
    const formattedPhone = `+90${formData.phone.replace(/^\+90/, "")}`;

    // Adresin tam formatını oluşturuyoruz
    const fullAddress = `${formData.address}, ${formData.district}, ${formData.city}`;

    // API'ye gönderilecek veri (backend'in beklediği formata uygun hale getiriyoruz)
    const addressData = {
      title: formData.title,
      country_id: 226, // Türkiye için sabit ülke id
      region_id: cities.find(city => city.name === formData.city)?.id, // Seçilen şehir id'si
      subregion_id: districts.find(district => district.name === formData.district)?.id, // Seçilen ilçe id'si
      full_address: fullAddress,
      phone_number: formattedPhone,
      first_name: formData.firstName, // Backend 'name' alanı 
      last_name: formData.lastName, // Backend 'last_name' alanı
    };

    try {
      const api = createAxiosInstance();
      const response = await api.post("/users/addresses", addressData); // Veriyi backend'e gönder
      if (response.status === 200) {
        console.log("Adres başarıyla kaydedildi.");
        setShowForm(false); // Formu kapat
        fetchAddresses(); // Adresleri tekrar getir
      } else {
        console.error("Adres kaydedilemedi:", response.data);
      }
    } catch (error) {
      console.error("Adres gönderilirken hata oluştu:", error);
    }
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
      setAddreses(response.data.data.results);
      // Eğer adres varsa, ilk adresi userAddress'e set et ve formu gizle
      if (response.data.data.results.length > 0) {
        const firstAddress = response.data.data.results[0];
        setUserAddress({
          title: firstAddress.title,
          firstName: firstAddress.first_name,
          lastName: firstAddress.last_name,
          address: firstAddress.full_address,
          city: firstAddress.region?.name || "",
          district: firstAddress.subregion?.name || "",
          phone: firstAddress.phone_number
        });
        setShowForm(false);
      } else {
        setShowForm(true);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setShowForm(true);
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
          <Button type="submit" onClick={handleSubmit}>Kaydet</Button>
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
