import { AiOutlineCheck } from "react-icons/ai";
import { ProductVariantSelectorProps } from "../../../../types/ProductTypes";

const ProductVariantSelector: React.FC<ProductVariantSelectorProps> = ({
    variants,
    selectedAroma,
    setSelectedAroma,
    selectedSize,
    setSelectedSize,
    updatePhotoBasedOnSelection,
    aromaColors,
}) => {
    const isVariantAvailable = (
        aroma: string,
        gram: number,
        totalServices: number
    ) => {
        return variants.some(
            (variant) =>
                variant.aroma === aroma &&
                variant.size.gram === gram &&
                variant.size.total_services === totalServices &&
                variant.is_available
        );
    };
    return (
        <>
            <div className="variants-container">
                <div className="text-start">
                    <h3 className="fs-4">Aroma:</h3>
                </div>
                <div className="d-flex flex-wrap column-gap-2">
                    {Array.from(
                        new Set(variants.map((variant) => variant.aroma))
                    ).map((item, index) => {
                        const isSelected = selectedAroma === index;

                        return (
                            <div
                                key={index}
                                className={`product-detail-variant-item flex-wrap d-flex column-gap-3 justify-content-center align-items-center ${isSelected ? "border-primary" : ""}`}
                                onClick={() => {
                                    setSelectedAroma(index);
                                    updatePhotoBasedOnSelection(index, selectedSize);
                                }}
                            >
                                {item}
                                <img
                                    src={aromaColors[item.trim()] || "transparent"}
                                    style={{
                                        display: "inline-block",
                                        width: "43px",
                                        padding: "3px",
                                        height: "104%",
                                        objectFit: "cover"
                                    }}
                                    alt={`${item} aroma`}
                                />
                                {isSelected && (
                                    <div className="tick-icon">
                                        <AiOutlineCheck
                                            className="text-light text-primary"
                                            size={20}
                                            color="white"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
            <hr />
            <div className="product-size-container mt-2">
                <div className="text-start pb-lg-2 pb-md-3">
                    <h3 className="fs-4">Boyut:</h3>
                </div>
                <div className="d-flex column-gap-3">
                    {[
                        ...new Map(
                            variants.map((item) => [
                                `${item.size.gram}-${item.size.total_services}`,
                                {
                                    gram: item.size.gram,
                                    pieces: item.size.gram ? item.size.gram : item.size.pieces,
                                    totalServices: item.size.total_services,
                                    discountPercentage:
                                        item.price.discount_percentage || null,
                                    photo_src: item.photo_src,
                                },
                            ])
                        ).values(),
                    ].map((item, index) => {
                        const {
                            gram,
                            pieces,
                            totalServices,
                            discountPercentage,
                        } = item;
                        const isSelected = selectedSize === index;
                        const isAvailable =
                            selectedAroma !== undefined &&
                            isVariantAvailable(
                                Array.from(
                                    new Set(
                                        variants.map((variant) => variant.aroma)
                                    )
                                )[selectedAroma],
                                gram,
                                totalServices
                            );

                        return (
                            <div
                                className={`product-size-box d-flex align-items-center flex-column position-relative
                  ${isSelected ? "border-primary" : ""}
                  ${!isAvailable ? "opacity-50" : ""}`}
                                key={index}
                                onClick={() => {
                                    if (isAvailable) {
                                        setSelectedSize(index);
                                        updatePhotoBasedOnSelection(selectedAroma, index);
                                    }
                                }}
                                style={{
                                    cursor: isAvailable ? "pointer" : "not-allowed",
                                }}
                            >
                                <span>{gram ? gram + "G" : pieces + " Adet"}</span>
                                <span>{totalServices ? totalServices + " Servis" : ""}</span>
                                {!isAvailable && (
                                    <div
                                        className="position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                                        style={{
                                            background: "rgba(255,255,255,0.8)",
                                            top: 0,
                                            left: 0,
                                        }}
                                    >
                                        <div
                                            className="text-danger"
                                            style={{ fontSize: "24px" }}
                                        >
                                            ✕
                                        </div>
                                        <div
                                            className="text-danger"
                                            style={{ fontSize: "12px" }}
                                        >
                                            Stokta Yok
                                        </div>
                                    </div>
                                )}
                                {discountPercentage && isAvailable && (
                                    <div className="discounted-percentage-box">
                                        <p>{discountPercentage}%</p>
                                        <span>İNDİRİM</span>
                                    </div>
                                )}
                                {isSelected && isAvailable && (
                                    <div className="tick-icon">
                                        <AiOutlineCheck
                                            className="text-light text-primary"
                                            size={20}
                                            color="white"
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default ProductVariantSelector;