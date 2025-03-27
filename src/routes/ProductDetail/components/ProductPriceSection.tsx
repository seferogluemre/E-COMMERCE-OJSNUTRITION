import { FaMinus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import ProductTrust from "./ProductTrust/ProductTrust";

interface ProductPriceSectionProps {
    matchingTotalPrice: number;
    originalPrice: number;
    discountPercentage: number;
    totalServices: number;
    count: number;
    handleCountChange: (increment: boolean) => void;
    handleAddToCart: () => void;
}

const ProductPriceSection: React.FC<ProductPriceSectionProps> = ({
    matchingTotalPrice,
    originalPrice,
    discountPercentage,
    totalServices,
    count,
    handleCountChange,
    handleAddToCart,
}) => {
    return (
        <div className="cart-container py-2">
            <div className="align-items-center justify-content-between">
                <div className="d-flex justify-content-between">
                    {discountPercentage > 0 ? (
                        <div className="d-flex flex-column">
                            <span className="text-decoration-line-through text-danger ">
                                {originalPrice}TL
                            </span>
                            <h1 className="fs-2">{matchingTotalPrice}TL</h1>
                        </div>
                    ) : (
                        <h1 className="fs-2 text-danger">
                            {matchingTotalPrice}TL
                        </h1>
                    )}
                    <p>{totalServices} Servis</p>
                </div>
            </div>
            <div className="d-flex pt-2 justify-content-between column-gap-md-3">
                <div className="count-box">
                    <button
                        onClick={() => handleCountChange(false)}
                        className="product-counter-btn"
                    >
                        <FaMinus />
                    </button>
                    <span className="fs-4 m-2">{count}</span>
                    <button
                        onClick={() => handleCountChange(true)}
                        className="product-counter-btn"
                    >
                        <GoPlus />
                    </button>
                </div>
                <div className="cart">
                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                    >
                        <MdShoppingCart className="fs-3" />
                        SEPETE EKLE
                    </button>
                </div>
            </div>
            <ProductTrust />
        </div>
    );
};

export default ProductPriceSection;