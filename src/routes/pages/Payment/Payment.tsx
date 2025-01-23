import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiCreditCard } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import { IoMap } from "react-icons/io5";
import {
  fetchAddresses,
  UserAddress,
} from "../../../services/api/collections/Addresses";
import { PHOTO_URL } from "../Products/components/types";
import { CartItem } from "../../../store/products/Cart";

function Payment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(
    null
  );
  const [addresses, setAddresses] = useState<UserAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [userAddress, setUserAddress] = useState<UserAddress | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    fetchAddresses(setAddresses, setUserAddress, setShowForm);

    const basketItems = localStorage.getItem("BasketItems");
    if (basketItems) {
      setCartItems(JSON.parse(basketItems));
    }
  }, []);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
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
                    {addresses.map((address) => (
                      <div
                        key={address.title}
                        className={`address-card p-3 mb-3 border rounded ${
                          selectedAddress?.title === address.title
                            ? "border-primary"
                            : ""
                        }`}
                        onClick={() => handleAddressSelect(address)}
                      >
                        <h5 className="text-danger">{address.title}</h5>
                        <p className="mb-0">
                          {address.first_name} {address.last_name}
                        </p>
                        <p className="my-2">{address.full_address}</p>
                        <div className="addreses-info">
                          <p className="mb-0">
                            {address.city} {address.district}
                          </p>
                        </div>
                        <p>{address.full_address}</p>
                        <p className="mb-0 text-primary">
                          {address.phone_number}
                        </p>
                      </div>
                    ))}
                    <button
                      className="btn btn-dark w-100"
                      onClick={handleContinue}
                      disabled={!selectedAddress}
                    >
                      Kargo ile Devam Et
                    </button>
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
                        <strong>{selectedAddress?.title}</strong>
                      </p>
                      <p>
                        {selectedAddress?.first_name}{" "}
                        {selectedAddress?.last_name}
                      </p>
                      <p>{selectedAddress?.full_address}</p>
                      <p>
                        {selectedAddress?.subregion.region.name} /{" "}
                        {selectedAddress?.subregion.name}
                      </p>
                      <p>{selectedAddress?.phone}</p>
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
                            {item.quantity} adet x {item.price} TL
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
