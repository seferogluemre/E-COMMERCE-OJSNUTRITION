
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchAddresses, type UserAddress } from "../../services/api/collections/Addresses";
import { useCartStore } from "../../store/products/Cart";
import { getAuthUser } from "../../services/api/collections/Storage";
import { PHOTO_URL } from "../../services/api/collections/Auth";
import "./Payment.scss";
import StepIndicator from "./components/StepIndicator";
import AddressStep from "./components/AddressStep";
import PaymentStep from "./components/PaymentStep";
import ShippingStep from "./components/ShippingStep";
import CartSummary from "./components/CartSummary";

function Payment() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [selectedAddress, setSelectedAddress] = useState<UserAddress | null>(null);
  const [userAddresses, setUserAddresses] = useState<UserAddress[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore(state => state.clearCart);
  const navigate = useNavigate();
  const user = JSON.parse(getAuthUser() || "{}");

  useEffect(() => {
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
        () => { },
      );
    } catch (error) {
      console.error("Error fetching user addresses:", error);
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((sum, item) => sum + item.price * (item.pieces || 1), 0);
  };

  return (
    <div className="min-vh-100 bg-light py-4">
      <Container>
        <div className="row d-flex justify-content-between align-items-center mb-3">
          <div className="col">
            <img src="/assets/Logo1.png" width={200} height={200} alt="Logo" className="img-fluid" />
          </div>
          <div className="col">
            <p className="mb-0">
              {user.first_name} {user.last_name}
            </p>
            <p>{user.email}</p>
          </div>
        </div>
        <Row className="g-4">
          <Col lg={8}>
            <Card>
              <Card.Body>
                <div className="mb-4">
                  <StepIndicator
                    stepNumber={1}
                    title="Adres"
                    isActive={activeStep >= 1}
                    isClickable={activeStep > 1}
                    onClick={() => activeStep > 1 && setActiveStep(1)}
                  />
                  {activeStep === 1 && (
                    <AddressStep
                      isLoggedIn={isLoggedIn}
                      userAddresses={userAddresses}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress}
                      fetchUserAddresses={fetchUserAddresses}
                    />
                  )}
                </div>

                <div className="mb-4">
                  <StepIndicator
                    stepNumber={2}
                    title="Kargo"
                    isActive={activeStep >= 2}
                    isClickable={activeStep > 2}
                    onClick={() => activeStep > 2 && setActiveStep(2)}
                  />
                  {activeStep === 2 && (
                    <ShippingStep selectedAddress={selectedAddress} />
                  )}
                </div>

                <div>
                  <StepIndicator
                    stepNumber={3}
                    title="Ödeme"
                    isActive={activeStep === 3}
                    isClickable={false}
                    onClick={() => { }}
                  />
                  {activeStep === 3 && (
                    <PaymentStep
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      paymentSuccess={paymentSuccess}
                      setPaymentSuccess={setPaymentSuccess}
                      selectedAddress={selectedAddress}
                      clearCart={clearCart}
                      navigate={navigate}
                    />
                  )}
                </div>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-between mt-3">
              {activeStep > 1 && (
                <Button variant="outline-secondary" onClick={() => setActiveStep(activeStep - 1)}>
                  Geri
                </Button>
              )}
              {activeStep < 3 && selectedAddress && (
                <Button variant="primary" className="ms-auto" onClick={() => setActiveStep(activeStep + 1)}>
                  Devam Et
                </Button>
              )}
              {activeStep === 3 && !paymentSuccess && !isLoading && (
                <Button
                  variant="primary"
                  className="ms-auto"
                  onClick={() => document.getElementById('payment-submit-button')?.click()}
                >
                  Ödemeyi Tamamla
                </Button>
              )}
            </div>
          </Col>

          <Col lg={4}>
            <CartSummary cartItems={cartItems} totalAmount={calculateTotalAmount()} photoUrl={PHOTO_URL} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Payment;