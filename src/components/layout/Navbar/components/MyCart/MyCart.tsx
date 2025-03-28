import { Button, CardFooter, Offcanvas } from "react-bootstrap";
import { CgShoppingCart } from "react-icons/cg";
import { useCartStore } from "../../../../../store/products/Cart";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { PHOTO_URL } from "../../../../../services/api/collections/Auth";
import { CartProps } from "../../../../../types/CartTypes";

function MyCart({ show, handleCloseTwo }: CartProps) {
  const { items, removeFromCart, updateQuantity, getTotalPrice } =
    useCartStore();

  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("tr-TR", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Offcanvas show={show} onHide={handleCloseTwo} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="d-flex align-items-center">
          <CgShoppingCart className="me-2" />
          SEPETİM
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        {!items || !Array.isArray(items) || items.length === 0 ? (
          <div className="d-flex flex-column align-items-center justify-content-center h-100">
            <img
              src="/assets/emptycart.gif"
              alt="Boş Sepet"
              className="img-fluid mb-3"
              style={{ maxWidth: "200px" }}
            />
            <h5 className="text-muted">Sepetiniz boş</h5>
            <CardFooter className="position-absolute bottom-0 w-100">
              <div className="d-flex justify-content-end px-1">Toplam 0</div>
              <Button
                variant="dark"
                onClick={() => {
                  handleCloseTwo();
                  navigate("/products");
                }}
                className="w-100 rounded-0"
              >
                Alışverişe başla
              </Button>
            </CardFooter>
          </div>
        ) : (
          <>
            <div className="flex-grow-1">
              {items.map((item) => (
                <div
                  key={`${item.id}`}
                  className="d-flex align-items-start border-bottom pb-3 mb-3"
                >
                  <div
                    className="position-relative"
                    style={{ width: "80px", height: "80px" }}
                  >
                    <img
                      src={PHOTO_URL + item.photo_src}
                      className="img-fluid object-fit-contain"
                      alt={item.name}
                    />
                  </div>
                  <div className="ms-3 flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h3 className="h6 mb-1">{item.name}</h3>
                        <h5 className="h6 mb-1">{item.aroma}</h5>
                        <h6>{item.size.gram}G</h6>
                      </div>
                      <span className="fw-bold">
                        {formatPrice(item.price * item.pieces)} TL
                      </span>
                    </div>
                    <div className="d-flex justify-content-end align-items-center mt-2">
                      {item.pieces === 1 ? (
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <MdDelete />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() =>
                            updateQuantity(item.id, item.pieces - 1)
                          }
                        >
                          -
                        </button>
                      )}
                      <span className="mx-2">{item.pieces}</span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, item.pieces + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-auto pt-3 border-top">
              <div className="d-flex justify-content-between mb-3">
                <strong>TOPLAM</strong>
                <strong>{getTotalPrice().toFixed(2)} TL</strong>
              </div>
              <Button
                variant="dark"
                className="w-100"
                onClick={() => {
                  handleCloseTwo();
                  navigate(items.length > 0 ? "/payment" : "/");
                }}
              >
                DEVAM ET
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default MyCart;
