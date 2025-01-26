import React, { useState, useEffect } from "react";
import { BiCreditCard } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { IoMap } from "react-icons/io5";
import {
  fetchAddresses,
  UserAddress,
  City,
  District,
} from "../../../services/api/collections/Addresses";
import { createAxiosInstance } from "../../../services/api/axios";
import { PHOTO_URL } from "../Products/components/types";
import { useCartStore } from "../../../store/products/Cart";

function Payment() {
  const [currentStep, setCurrentStep] = useState(1);
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
    address: "",
    city: "",
    district: "",
    phone_number: "",
  });
  const cartItems = useCartStore((state) => state.items);

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
        () => {}
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

  const handleContinue = () => {
    if (selectedAddress) {
      setCurrentStep(currentStep + 1);
    }
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
    setCurrentStep(2);
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <div className="d-flex flex-column gap-3 mb-4">
            <div
              className={`step p-3 rounded ${
                currentStep >= 1 ? "bg-dark text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => currentStep > 1 && setCurrentStep(1)}
            >
              <IoMap size={24} className="mb-2" />
              <div>Adres</div>
            </div>
            <div
              className={`step p-3 rounded ${
                currentStep >= 2 ? "bg-dark text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => currentStep > 2 && setCurrentStep(2)}
            >
              <BsTruck size={24} className="mb-2" />
              <div>Kargo</div>
            </div>
            <div
              className={`step p-3 rounded ${
                currentStep >= 3 ? "bg-dark text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => currentStep > 3 && setCurrentStep(3)}
            >
              <BiCreditCard size={24} className="mb-2" />
              <div>Ödeme</div>
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="row">
            <div className="col-md-8">
              {currentStep === 1 && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Teslimat Adresi</h5>
                    {isLoggedIn ? (
                      <div className="user-addresses">
                        {userAddresses.map((address) => (
                          <div
                            key={address.id}
                            className={`saved-address p-3 border rounded mb-3 ${
                              selectedAddress?.id === address.id
                                ? "border-primary"
                                : ""
                            }`}
                            onClick={() => handleAddressSelect(address)}
                            style={{ cursor: "pointer" }}
                          >
                            <h5 className="text-danger">{address.title}</h5>
                            <p className="mb-0">
                              {address.first_name} {address.last_name}
                            </p>
                            <p className="my-2">{address.full_address}</p>
                            <div className="address-info">
                              <p className="mb-0">
                                {address.city} {address.district}
                              </p>
                            </div>
                            <p className="mb-0 text-primary">
                              {address.phone_number}
                            </p>
                          </div>
                        ))}
                        {selectedAddress && (
                          <button
                            className="btn btn-dark w-100"
                            onClick={() => setCurrentStep(2)}
                          >
                            Kargo ile Devam Et
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="address-form">
                        <h6>Misafir Kullanıcı - Adres Bilgileri</h6>
                        <form onSubmit={handleFormSubmit}>
                          <div className="mb-3">
                            <label className="form-label">Adres Başlığı</label>
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="row mb-3">
                            <div className="col-6">
                              <label className="form-label">Ad</label>
                              <input
                                type="text"
                                className="form-control"
                                name="first_name"
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                            <div className="col-6">
                              <label className="form-label">Soyad</label>
                              <input
                                type="text"
                                className="form-control"
                                name="last_name"
                                onChange={handleInputChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">
                              Telefon Numarası
                            </label>
                            <input
                              type="tel"
                              className="form-control"
                              name="phone_number"
                              pattern="[0-9]{10,11}"
                              placeholder="05XXXXXXXXX"
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Şehir</label>
                            <select
                              className="form-control"
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
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">İlçe</label>
                            <select
                              className="form-control"
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
                            </select>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Tam Adres</label>
                            <textarea
                              className="form-control"
                              rows={3}
                              name="address"
                              onChange={handleInputChange}
                              required
                            ></textarea>
                          </div>
                          <button type="submit" className="btn btn-dark w-100">
                            Adresi Kaydet ve Devam Et
                          </button>
                        </form>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Kargo Bilgileri</h5>
                    <div className="selected-address mb-4">
                      <h6>Seçilen Adres:</h6>
                      <p>
                        <strong className="text-danger">
                          {selectedAddress?.title}
                        </strong>
                      </p>
                      <p>
                        {selectedAddress?.first_name}{" "}
                        {selectedAddress?.last_name}
                      </p>
                      <p>{selectedAddress?.full_address}</p>
                      <p>
                        {selectedAddress?.city} / {selectedAddress?.district}
                      </p>
                      <p className="text-primary">
                        {selectedAddress?.phone_number}
                      </p>
                    </div>
                    <button
                      className="btn btn-dark w-100"
                      onClick={() => setCurrentStep(3)}
                    >
                      Ödemeye Geç
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Ödeme Bilgileri</h5>
                    <form>
                      <div className="mb-3">
                        <label className="form-label">
                          Kart Üzerindeki İsim
                        </label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Kart Numarası</label>
                        <input
                          type="text"
                          className="form-control"
                          maxLength={16}
                        />
                      </div>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label className="form-label">
                            Son Kullanma Tarihi
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            maxLength={5}
                          />
                        </div>
                        <div className="col-6">
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            className="form-control"
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <div className="payment-summary mb-4">
                        <h6>Sipariş Özeti</h6>
                        {cartItems.map((item) => (
                          <div
                            key={item.id}
                            className="d-flex justify-content-between align-items-center mb-2"
                          >
                            <div className="d-flex align-items-center">
                              <img
                                src={PHOTO_URL + item.photo_src}
                                alt={item.name}
                                className="me-2"
                                style={{ width: 50, height: 50 }}
                              />
                              <span>{item.name}</span>
                            </div>
                            <span>{item.price.toFixed(2)} TL</span>
                          </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between">
                          <strong>Toplam</strong>
                          <strong>{totalAmount.toFixed(2)} TL</strong>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-dark w-100">
                        Ödemeyi Tamamla
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Sepet Özeti</h5>
                  {cartItems.map((item) => (
                    <div key={item.id} className="mb-3">
                      <div className="d-flex align-items-center">
                        <img
                          src={PHOTO_URL + item.photo_src}
                          alt={item.name}
                          className="me-2"
                          style={{ width: 90, height: 90, objectFit: "cover" }}
                        />
                        <div>
                          <div>{item.name}</div>
                          <small className="text-muted">
                            {item.pieces} adet x {item.price} TL
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Toplam</strong>
                    <strong>{totalAmount.toFixed(2)} TL</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
