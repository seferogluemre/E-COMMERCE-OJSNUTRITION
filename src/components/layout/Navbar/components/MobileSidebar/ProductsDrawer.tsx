import { Offcanvas } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ProductsDrawerProps } from "../../../../../types/SidebarTypes";

function ProductsDrawer({
  show,
  onHide,
  items,
  title,
  onSubCategoryClick,
}: ProductsDrawerProps) {
  const navigate = useNavigate();

  const handleProductClick = (slug: string) => {
    navigate(`/products/${slug}`);
    onHide();
  };

  return (
    <Offcanvas show={show} onHide={onHide} placement="start">
      <Offcanvas.Header closeButton>
        <button
          onClick={onHide}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          <FaArrowLeft />
        </button>
        <Offcanvas.Title>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length > 0 ? (
          <div className="categories-list">
            {items.map((item) => (
              <div
                key={item.id || item.slug}
                className="category-item border-bottom"
              >
                {item.sub_children ? (
                  // Eğer sub_children varsa, tıklanabilir kategori olarak göster
                  <div
                    className="py-3 d-flex justify-content-between align-items-center cursor-pointer"
                    onClick={() =>
                      onSubCategoryClick?.(item.sub_children, item.name)
                    }
                  >
                    <h5 className="m-0">{item.name}</h5>
                    <FaArrowRight />
                  </div>
                ) : (
                  <div
                    className="product-card p-3 cursor-pointer"
                    onClick={() => handleProductClick(item.slug)}
                  >
                    <h5 className="product-name">{item.name}</h5>
                    {item.description && (
                      <p className="product-description small text-muted">
                        {item.description}
                      </p>
                    )}
                    {item.price && (
                      <div className="product-price fw-bold">
                        {item.price} TL
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-5">
            <p className="text-muted">Bu kategoride ürün bulunmamaktadır.</p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
export default ProductsDrawer;
