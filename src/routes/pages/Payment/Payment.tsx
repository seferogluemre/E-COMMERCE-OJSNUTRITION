import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SAMPLE_ADDRESSES: Address[] = [
  {
    id: "1",
    title: "Ev",
    fullAddress:
      "Ahmet Mah. Mehmetoglu Sk. No: 5 Daire: 2, Ataşehir, İstanbul, Türkiye",
  },
  {
    id: "2",
    title: "Ofis",
    fullAddress:
      "Ayşe Mah. Fatmaoglu Cad. No: 8 D: 4, Ataşehir, İstanbul, Türkiye",
  },
];

const CART_ITEMS: CartItem[] = [
  {
    id: "1",
    name: "WHEY PROTEIN",
    price: 1099,
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=100",
  },
  {
    id: "2",
    name: "ARGININE",
    price: 457,
    image: "https://images.unsplash.com/photo-1579722820308-d74e571900a9?w=100",
  },
];

function Payment() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const totalAmount = CART_ITEMS.reduce((sum, item) => sum + item.price, 0);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleContinue = () => {
    if (selectedAddress) {
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          {/* Stepper */}
          <div className="d-flex justify-content-between mb-5">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <MapPin size={24} />
              <span>Adres</span>
            </div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <Truck size={24} />
              <span>Kargo</span>
            </div>
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
              <CreditCard size={24} />
              <span>Ödeme</span>
            </div>
          </div>

          {/* Step 1: Address Selection */}
          {currentStep === 1 && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Teslimat Adresi</h5>
                {SAMPLE_ADDRESSES.map((address) => (
                  <div
                    key={address.id}
                    className={`address-card p-3 mb-3 border rounded ${
                      selectedAddress?.id === address.id ? "border-primary" : ""
                    }`}
                    onClick={() => handleAddressSelect(address)}
                  >
                    <h6>{address.title}</h6>
                    <p className="mb-0">{address.fullAddress}</p>
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

          {/* Step 2: Shipping Confirmation */}
          {currentStep === 2 && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Kargo Bilgileri</h5>
                <div className="selected-address mb-4">
                  <h6>Seçilen Adres:</h6>
                  <p>{selectedAddress?.fullAddress}</p>
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

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ödeme</h5>
                <div className="selected-address mb-4">
                  <h6>Teslimat Adresi:</h6>
                  <p>{selectedAddress?.fullAddress}</p>
                </div>
                <div className="payment-summary mb-4">
                  <h6>Sipariş Özeti</h6>
                  {CART_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
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
                <button className="btn btn-dark w-100">Ödemeyi Tamamla</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
