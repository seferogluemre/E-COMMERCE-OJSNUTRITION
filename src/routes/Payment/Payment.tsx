import React, { useState, useEffect } from "react";
import {
  fetchAddresses,
  UserAddress,
  City,
  District,
  updateUserAddress,
  handleSubmitAddress,
} from "../../services/api/collections/Addresses";
import { createAxiosInstance } from "../../services/api/axios";
import { useCartStore } from "../../store/products/Cart";
import { getAuthUser } from "../../services/api/collections/Storage";
import { Card, Container, Row, Col, Form, Button, Image, InputGroup } from 'react-bootstrap';
import { BiCheckCircle, BiMapPin, BiPlus, BiCheck } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import "./Payment.scss";
import { handlePaymentSubmit, PaymentData } from "../../services/api/collections/Payment";
import { useNavigate } from "react-router-dom";
import { PHOTO_URL } from "../../services/api/collections/Auth";

function Payment() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cities, setCities] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [formData, setFormData] = useState<UserAddress>({
    title: "",
    first_name: "",
    last_name: "",
    full_address: "",
    city: "",
    district: "",
    phone_number: "",
    id: "",
    region: { name: "", id: 0 },
    subregion: { name: "", id: 0 }
  });
  const cartItems = useCartStore((state) => state.items);
  const [editingAddress, setEditingAddress] = useState<UserAddress | null>(null);
  const [showNewAddressForm, setShowNewAddressForm] = useState<boolean>(false);
  const [newlyAddedAddressId, setNewlyAddedAddressId] = useState<string | null>(null);
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardHolderName: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);

    // Fetch user addresses if logged in
    if (token) {
      fetchUserAddresses();
    }

    // Check saved guest address
    if (!token) {
      const savedAddress = localStorage.getItem("guestAddress");
      if (savedAddress) {
        const parsedAddress = JSON.parse(savedAddress);
        setSelectedAddress(parsedAddress);
      }
    }
  }, []);

  const fetchUserAddresses = async () => {
    try {
      await fetchAddresses(
        setUserAddresses,
        (address) => setSelectedAddress(address),
        () => { }
      );
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

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
  }, []);

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
  }, [selectedCity]);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.pieces || 1),
    0
  );

  const handleAddressSelect = (address: UserAddress) => {
    setSelectedAddress(address);
  };


  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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

  const handleEditAddress = (address: UserAddress) => {
    setEditingAddress(address);
    setFormData({
      title: address.title,
      first_name: address.first_name,
      last_name: address.last_name,
      full_address: address.full_address,
      city: address.city,
      district: address.district,
      phone_number: address.phone_number,
      id: address.id || "",
      region: address.region || { name: "", id: 0 },
      subregion: address.subregion || { name: "", id: 0 }
    });
    setSelectedCity(address.city);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingAddress) {
      // Update existing address
      try {
        const updatedAddress = {
          ...editingAddress,
          title: formData.title,
          first_name: formData.first_name,
          last_name: formData.last_name,
          full_address: formData.full_address,
          city: formData.city,
          district: formData.district,
          phone_number: formData.phone_number,
        };

        await updateUserAddress(updatedAddress);
        await fetchUserAddresses();
        setEditingAddress(null);
      } catch (error) {
        console.error("Error updating address:", error);
      }
    } else {
      // Adresi localStorage'a kaydet
      const addressData = {
        ...formData,
        full_address: formData.full_address,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      };

      localStorage.setItem("guestAddress", JSON.stringify(addressData));
      setSelectedAddress(addressData);
      setActiveStep(2);
    }
  };

  const handleNewAddressClick = () => {
    setShowNewAddressForm(true);
    setFormData({
      title: "",
      first_name: "",
      last_name: "",
      full_address: "",
      city: "",
      district: "",
      phone_number: "",
      id: "",
      region: { name: "", id: 0 },
      subregion: { name: "", id: 0 },
    });
  };

  const handleNewAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const addressData = {
        ...formData,
        full_address: formData.full_address,
      };

      await handleSubmitAddress(
        addressData,
        cities,
        districts,
        setShowNewAddressForm,
        setUserAddresses,
        setSelectedAddress,
        fetchUserAddresses
      );

      // Adres listesini yenile ve yeni eklenen adresi işaretle
      await fetchUserAddresses();
      const addresses = userAddresses;
      if (addresses && addresses.length > 0) {
        setNewlyAddedAddressId(addresses[0].id);
        setTimeout(() => setNewlyAddedAddressId(null), 5000);
      }
      setShowNewAddressForm(false);
    } catch (error) {
      console.error("Error adding new address:", error);
    }
  };

  const user = JSON.parse(getAuthUser() || "{}");

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === 'cardNumber') {
      // Sadece rakamları al ve 16 karakterle sınırla
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
    } else if (name === 'expirationDate') {
      // Sadece rakamları al ve 4 karakterle sınırla
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (name === 'cvv') {
      // Sadece rakamları al ve 3 karakterle sınırla
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setCardInfo(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const handleSubmitPayment = async () => {
    if (!selectedAddress?.id) return;

    setIsLoading(true);
    try {
      const paymentData: PaymentData = {
        address_id: selectedAddress.id,
        payment_type: 'credit_cart',
        card_digits: "1234567891234567",
        card_expiration_date: "06-25",
        card_security_code: "123",
        card_type: "VISA"
      };

      console.log("Sending payment data:", paymentData);
      const response = await handlePaymentSubmit(paymentData);

      if (response.status === 'success') {
        setPaymentSuccess(true);
        setTimeout(() => navigate('/'), 3800);
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSuccessScreen = () => (
    <div className="text-center py-5" id="success-screen">
      <div className="mb-4">
        <img src="/assets/succes_checkmark.gif" alt="Success" className="mb-3" width={100} height={100} />
        <h4 className="text-success">Ödemeniz başarıyla alındı.</h4>
        <div className="d-flex justify-content-center column-gap-3">
          <button className="btn btn-primary" onClick={() => navigate('/')}>Anasayfa</button>
        </div>
      </div>
    </div>
  );

  const renderAddressStep = () => (
    <div>
      {isLoggedIn ? (
        <>
          {!editingAddress && !showNewAddressForm ? (
            // Show address list
            <>
              {userAddresses.map((address) => (
                <Card
                  key={address.id}
                  className={`mb-3 cursor-pointer ${selectedAddress?.id === address.id ? 'border-primary bg-light' : ''
                    }`}
                  onClick={() => handleAddressSelect(address)}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center gap-2">
                        <BiMapPin className="text-secondary" size={20} />
                        <span className="text-danger fw-medium">{address.title}</span>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        {newlyAddedAddressId === address.id && (
                          <div className="d-flex align-items-center text-success">
                            <BiCheck size={20} />
                            <small>Yeni Eklendi</small>
                          </div>
                        )}
                        {selectedAddress?.id === address.id && (
                          <BiCheckCircle className="text-primary" size={20} />
                        )}
                        <Button
                          variant="link"
                          className="p-0 text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditAddress(address);
                          }}
                        >
                          Adresi Düzenle
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-secondary">
                      <p className="fw-medium mb-1">{address.first_name} {address.last_name}</p>
                      <p className="mb-1">{address.full_address}</p>
                      <p className="mb-1">{address.city} / {address.district}</p>
                      <p className="text-primary mb-0">{address.phone_number}</p>
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <Button
                variant="link"
                className="text-primary p-0 d-flex align-items-center gap-2"
                onClick={handleNewAddressClick}
              >
                <BiPlus size={16} />
                <span>Yeni Adres Ekle</span>
              </Button>
            </>
          ) : showNewAddressForm ? (
            // Show new address form
            <Form onSubmit={handleNewAddressSubmit}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Yeni Adres Ekle</h5>
                <Button
                  variant="link"
                  className="text-secondary p-0"
                  onClick={() => setShowNewAddressForm(false)}
                >
                  Vazgeç
                </Button>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Adres Başlığı *</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Ad *</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Soyad *</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Telefon Numarası</Form.Label>
                <InputGroup>
                  <InputGroup.Text>
                    <Image src="/tr-flag.png" width={20} height={15} alt="TR" />
                    +90
                  </InputGroup.Text>
                  <Form.Control
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    placeholder="5XX XXX XX XX"
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>İl *</Form.Label>
                    <Form.Select
                      name="city"
                      value={selectedCity}
                      onChange={handleCityChange}
                      required
                    >
                      <option value="">İl Seçiniz</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>İlçe *</Form.Label>
                    <Form.Select
                      name="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      required
                    >
                      <option value="">İlçe Seçiniz</option>
                      {districts.map((district) => (
                        <option key={district.id} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Tam Adres *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="full_address"
                  value={formData.full_address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Adresi Kaydet
              </Button>
            </Form>
          ) : (
            // Show edit form when editing
            <Form onSubmit={handleFormSubmit}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Adres Düzenle</h5>
                <Button
                  variant="link"
                  className="text-secondary p-0"
                  onClick={() => setEditingAddress(null)}
                >
                  Vazgeç
                </Button>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Adres Başlığı</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Ad</Form.Label>
                    <Form.Control
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Soyad</Form.Label>
                    <Form.Control
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleInputChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label>Telefon Numarası</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  placeholder="05XXXXXXXXX"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Tam Adres</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="full_address"
                  value={formData.full_address}
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="w-100">
                Kaydet
              </Button>
            </Form>
          )}
        </>
      ) : (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Adres Başlığı</Form.Label>
            <Form.Control
              type="text"
              name="title"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Ad</Form.Label>
                <Form.Control
                  type="text"
                  name="first_name"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Soyad</Form.Label>
                <Form.Control
                  type="text"
                  name="last_name"
                  onChange={handleInputChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Telefon Numarası</Form.Label>
            <Form.Control
              type="tel"
              name="phone_number"
              pattern="[0-9]{10,11}"
              placeholder="05XXXXXXXXX"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Şehir</Form.Label>
                <Form.Select
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                  required
                >
                  <option value="">Şehir Seçiniz</option>
                  {/* Add your cities here */}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>İlçe</Form.Label>
                <Form.Select
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                  required
                >
                  <option value="">İlçe Seçiniz</option>
                  {/* Add your districts here */}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Tam Adres</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="full_address"
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Adresi Kaydet ve Devam Et
          </Button>
        </Form>
      )}
    </div>
  );

  const renderShippingStep = () => {
    if (!selectedAddress) return null;
    return (
      <Card className="mt-4">
        <Card.Body>
          <div className="d-flex align-items-center gap-2 mb-3">
            <BsTruck className="text-secondary" size={20} />
            <h5 className="mb-0">Teslimat Adresi</h5>
          </div>
          <div>
            <p className="text-danger fw-medium mb-1">{selectedAddress.title}</p>
            <p className="mb-1">{selectedAddress.first_name} {selectedAddress.last_name}</p>
            <p className="text-secondary mb-1">{selectedAddress.full_address}</p>
            <p className="text-secondary mb-1">{selectedAddress.city} / {selectedAddress.district}</p>
            <p className="text-primary mb-0">{selectedAddress.phone_number}</p>
          </div>
        </Card.Body>
      </Card>
    );
  };

  const renderPaymentStep = () => (
    <div className="mt-4">
      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Ödemeniz işleniyor...</p>
        </div>
      ) : paymentSuccess ? (
        renderSuccessScreen()
      ) : (
        <div className="mb-4">
          <Form className="mt-4">
            <Form.Group className="mb-3">
              <Form.Label>Kart Üzerindeki İsim</Form.Label>
              <Form.Control
                type="text"
                name="cardHolderName"
                value={cardInfo.cardHolderName}
                onChange={handleCardInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kart Numarası</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={cardInfo.cardNumber}
                onChange={handleCardInputChange}
                maxLength={16}
                placeholder="0000 0000 0000 0000"
                required
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Son Kullanma Tarihi</Form.Label>
                  <Form.Control
                    type="text"
                    name="expirationDate"
                    value={cardInfo.expirationDate}
                    onChange={handleCardInputChange}
                    placeholder="MMYY"
                    maxLength={4}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    name="cvv"
                    value={cardInfo.cvv}
                    onChange={handleCardInputChange}
                    maxLength={3}
                    placeholder="000"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              variant="dark"
              className="w-100 py-2"
              onClick={handleSubmitPayment}
              disabled={!cardInfo.cardNumber || !cardInfo.expirationDate || !cardInfo.cvv}
            >
              Ödeme Yap
            </Button>
          </Form>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-vh-100 bg-light py-4">
      <Container>
        <div className="row d-flex justify-content-between align-items-center mb-3">
          <div className="col">
            <img src="/assets/Logo1.png" width={200} height={200} alt="Logo" className="img-fluid" />
          </div>
          <div className="col">
            <p className="mb-0">{user.first_name} {user.last_name}</p>
            <p>{user.email}</p>
          </div>
        </div>
        <Row className="g-4">
          {/* Sol Kolon - Ödeme Adımları */}
          <Col lg={8}>
            <Card>
              <Card.Body>
                {/* Adres Adımı */}
                <div className="mb-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    onClick={() => activeStep > 1 && setActiveStep(1)}
                  >
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${activeStep >= 1 ? 'bg-primary text-white' : 'bg-secondary'
                      }`} style={{ width: '32px', height: '32px' }}>
                      1
                    </div>
                    <h5 className="mb-0">Adres</h5>
                  </div>
                  {activeStep === 1 && renderAddressStep()}
                </div>

                {/* Kargo Adımı */}
                <div className="mb-4">
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    onClick={() => activeStep > 2 && setActiveStep(2)}
                  >
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${activeStep >= 2 ? 'bg-primary text-white' : 'bg-secondary'
                      }`} style={{ width: '32px', height: '32px' }}>
                      2
                    </div>
                    <h5 className="mb-0">Kargo</h5>
                  </div>
                  {activeStep === 2 && renderShippingStep()}
                </div>

                {/* Ödeme Adımı */}
                <div>
                  <div
                    className="d-flex align-items-center gap-3 cursor-pointer"
                    onClick={() => activeStep > 3 && setActiveStep(3)}
                  >
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${activeStep === 3 ? 'bg-primary text-white' : 'bg-secondary'
                      }`} style={{ width: '32px', height: '32px' }}>
                      3
                    </div>
                    <h5 className="mb-0">Ödeme</h5>
                  </div>
                  {activeStep === 3 && renderPaymentStep()}
                </div>
              </Card.Body>
            </Card>

            {/* Navigasyon Butonları */}
            <div className="d-flex justify-content-between mt-3">
              {activeStep > 1 && (
                <Button
                  variant="outline-secondary"
                  onClick={() => setActiveStep(activeStep - 1)}
                >
                  Geri
                </Button>
              )}
              {activeStep < 3 && selectedAddress && (
                <Button
                  variant="primary"
                  className="ms-auto"
                  onClick={() => setActiveStep(activeStep + 1)}
                >
                  Devam Et
                </Button>
              )}
              {activeStep === 3 && (
                <Button variant="primary" className="ms-auto">
                  Ödemeyi Tamamla
                </Button>
              )}
            </div>
          </Col>

          {/* Sağ Kolon - Sepet Özeti */}
          <Col lg={4}>
            <Card>
              <Card.Body>
                <h5 className="mb-4">Sepet Özeti</h5>
                {cartItems.map((item) => (
                  <div key={item.id} className="mb-3 pb-3 border-bottom">
                    <div className="d-flex gap-3">
                      <Image
                        src={PHOTO_URL + item.photo_src}
                        alt={item.name}
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        rounded
                      />
                      <div>
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-secondary small mb-1">{item.variant_name}</p>
                        <p className="text-secondary small mb-0">
                          {item.pieces} adet x {item.price} TL
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-3">
                  <div className="d-flex justify-content-between text-secondary small">
                    <span>Ara Toplam</span>
                    <span>{totalAmount.toFixed(2)} TL</span>
                  </div>
                  <div className="d-flex justify-content-between fw-bold mt-2">
                    <span>Toplam</span>
                    <span>{totalAmount.toFixed(2)} TL</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Payment;
