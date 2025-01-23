import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { CgShoppingCart } from "react-icons/cg";

interface CartProps {
  show: boolean;
  handleCloseTwo: () => void;
}

function MyCart({ show, handleCloseTwo }: CartProps) {

  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "COLLAGEN",
      price: 499,
      quantity: 1,
      image: "https://fe1111.projects.academy.onlyjs.com/media/creatine_120_.webp",
    },
  ]);



  return (
    <Offcanvas show={show} onHide={handleCloseTwo} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="d-flex align-items-center">
          <CgShoppingCart className="me-2" />
          SEPETİM
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1">
          {cartItems.length === 0 ? (
            <div className="text-center text-muted py-5">
              Sepetinizde Ürün Bulunmamaktadır
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-start border-bottom pb-3 mb-3"
              >
                <div
                  className="position-relative"
                  style={{ width: "80px", height: "80px" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="img-fluid object-fit-contain"
                  />
                </div>
                <div className="ms-3 flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h3 className="h6 mb-1">{item.name}</h3>
                      <h5 className="h6 mb-1">Aromasız</h5>
                      <h6>250G</h6>
                    </div>
                    <span className="fw-bold">{item.price * item.quantity} TL</span>
                  </div>
                  <div className="d-flex justify-content-end mt-2">
                    <div className="btn-group" role="group" aria-label="Quantity">
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        disabled
                      >
                        {item.quantity}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto pt-3 border-top">
          <div className="d-flex justify-content-between mb-3">
            <strong>TOPLAM</strong>
            <strong>499 TL</strong>
          </div>
          <Button variant="dark" className="w-100">
            DEVAM ET
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MyCart;
