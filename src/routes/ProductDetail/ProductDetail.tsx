import { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import "./_ProductDetail.scss";
import FiveStar from "../../components/FiveStars/FiveStar";
import ProductComment from "./components/ProductComment/ProductComment";
import { FaMinus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import ProductTrust from "./components/ProductTrust/ProductTrust";
import BestSeller from "../../components/BestSeller/BestSeller";
import UseLocalStorage from "../../hooks/UseSessionStorage";
import LastView from "./components/LastView/LastView";
import { AiOutlineCheck } from "react-icons/ai";
import { ProductImage } from "./components/ProductImage";
import { useCartStore, CartItem } from "../../store/products/Cart";
import { useToastStore } from "../../store/toast/ToastStore";
import { PHOTO_URL } from "../../services/api/collections/Auth";

interface NutritionalContent {
  ingredients: { aroma: string; value: string[] }[];
  nutrition_facts: {
    ingredients: { name: string; amounts: string[] }[];
    portion_sizes: string[];
  };
  amino_acid_facts?: {
    ingredients: { name: string; amounts: string[] }[];
    portion_sizes: string[];
  };
}

interface Variant {
  id: string;
  size: {
    gram: number;
    pieces: number;
    total_services: number;
  };
  aroma: string;
  price: {
    profit: number;
    total_price: number;
    discounted_price: number;
    price_per_servings: number;
    discount_percentage: number;
  };
  photo_src: string;
  is_available: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  short_explanation: string;
  explanation: {
    usage: string;
    features: string;
    description: string;
    nutritional_content: NutritionalContent;
  };
  main_category_id: string;
  sub_category_id: string;
  tags: string[];
  variants: Variant[];
  comment_count: number;
  average_star: number;
  price?: number;
  commentCount?: number;
  photo_src?: string;
}

interface ColorProps {
  [key: string]: string;
}

export const LOCAL_KEY = "lastView";

function ProductDetail() {
  const { product, bestSeller } = useLoaderData() as {
    product: Product;
    bestSeller: Product[];
  };
  const [count, setCount] = useState<number>(0);
  const [, setStoredValue] = UseLocalStorage(LOCAL_KEY, "");
  const [selectedSize, setSelectedSize] = useState<number>();
  const [selectedAroma, setSelectedAroma] = useState<number>();
  const [photoSrc, setPhotoSrc] = useState<string>("");
  const [matchingTotalPrice, setMatchingTotalPrice] = useState<number>(0);
  const [totalServices, setTotalServices] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);
  const [discountPercentage, setDiscountPercentage] = useState<number>(0);
  const { addToCart } = useCartStore();
  const toast = useToastStore();

  const updatePhotoBasedOnSelection = (
    selectedAromaIndex: number | undefined,
    selectedSizeIndex: number | undefined
  ) => {
    if (selectedAromaIndex === undefined || selectedSizeIndex === undefined)
      return;

    const selectedAromaName = Array.from(
      new Set(product.variants.map((variant: Variant) => variant.aroma))
    )[selectedAromaIndex];

    interface SizeInfo {
      gram: number;
      totalServices: number;
    }

    const selectedSizeInfo = [
      ...new Map(
        product.variants.map((item: Variant) => [
          `${item.size.gram}-${item.size.total_services}`,
          {
            gram: item.size.gram,
            totalServices: item.size.total_services,
          } as SizeInfo,
        ])
      ).values(),
    ][selectedSizeIndex] as SizeInfo;

    const matchingVariant = product.variants.find(
      (variant: Variant) =>
        variant.aroma === selectedAromaName &&
        variant.size.gram === selectedSizeInfo.gram &&
        variant.size.total_services === selectedSizeInfo.totalServices
    );

    if (matchingVariant) {
      setPhotoSrc(matchingVariant.photo_src);
      setTotalServices(matchingVariant.size.total_services);
      setOriginalPrice(matchingVariant.price.total_price);
      setDiscountPercentage(matchingVariant.price.discount_percentage || 0);

      const discountedPrice = matchingVariant.price.discount_percentage
        ? matchingVariant.price.total_price *
        (1 - matchingVariant.price.discount_percentage / 100)
        : matchingVariant.price.total_price;

      setMatchingTotalPrice(Math.round(discountedPrice));
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setProductState(Array.isArray(product) ? product : [product]);

    // İlk variant'ın değerlerini set et
    if (product.variants && product.variants.length > 0) {
      const initialVariant = product.variants[0];
      setPhotoSrc(initialVariant.photo_src);
      setTotalServices(initialVariant.size.total_services);
      setOriginalPrice(initialVariant.price.total_price);
      setDiscountPercentage(initialVariant.price.discount_percentage || 0);

      // İndirimli fiyatı hesapla
      const discountedPrice = initialVariant.price.discount_percentage
        ? initialVariant.price.total_price *
        (1 - initialVariant.price.discount_percentage / 100)
        : initialVariant.price.total_price;

      setMatchingTotalPrice(Math.round(discountedPrice));
    }

    setSelectedAroma(0);
    setSelectedSize(0);

    const productData = {
      price: product.variants[0].price.total_price,
      commentCount: product.comment_count,
      name: product.name,
      slug: product.slug,
      photo: PHOTO_URL + product.variants[0].photo_src,
    };

    setStoredValue((prevValue: Product[]) => {
      const updatedValue = Array.isArray(prevValue) ? prevValue : [];
      const existingProductIndex = updatedValue.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex !== -1) {
        updatedValue.splice(existingProductIndex, 1);
      }
      updatedValue.unshift({
        id: product.id,
        name: product.name,
        slug: product.slug,
        short_explanation: product.short_explanation,
        explanation: product.explanation,
        main_category_id: product.main_category_id,
        sub_category_id: product.sub_category_id,
        tags: product.tags,
        variants: product.variants,
        comment_count: product.comment_count,
        average_star: product.average_star,
        price: productData.price,
        commentCount: productData.commentCount,
        photo_src: productData.photo,
      });
      // Ürün aromaları varsa state'i
      if (product.variants && product.variants.length > 0) {
        setPhotoSrc(product.variants[0].photo_src);
      }
      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedValue));

      return updatedValue;
    });
  }, [product]);

  const [productState, setProductState] = useState<Product[]>(
    Array.isArray(product) ? product : [product]
  );

  const aromaColors: ColorProps = {
    Bisküvi: "/assets/icons/bisküvi.webp",
    Çikolata: "/assets/icons/çikolata.webp",
    Muz: "/assets/icons/muz.webp",
    "Salted Caramel": "/assets/icons/karamel.webp",
    "Choco Nut": "/assets/icons/çokonat.webp",
    "Hindistan Cevizi": "#FFEBCD",
    "Raspberry Cheesecake": "/assets/icons/rasperryChescake.webp",
    Çilek: "/assets/icons/çilek.webp",
    Aromasız: "/assets/icons/aromasız.webp",
    Karpuz: "/assets/icons/karpuz.webp",
    Limonata: "/assets/icons/limonata.webp",
    "Fruit Fusion": "/assets/icons/fruitfusion.webp",
    "Yeşil Elma": "/assets/icons/yesilelma.webp",
    "Lemon Cheesecake": "/assets/icons/lemonCheescake.webp",
    Muhallebi: "/assets/icons/muhallebi.webp",
    Ahududu: "/assets/icons/ahududu.webp",
    Şeftali: "/assets/icons/seftali.webp",
  };


  const isVariantAvailable = (
    aroma: string,
    gram: number,
    totalServices: number
  ) => {
    return product.variants.some(
      (variant) =>
        variant.aroma === aroma &&
        variant.size.gram === gram &&
        variant.size.total_services === totalServices &&
        variant.is_available
    );
  };

  const handleCountChange = (increment: boolean) => {
    if (increment) {
      setCount(count + 1);
    } else if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (
      count > 0 &&
      selectedAroma !== undefined &&
      selectedSize !== undefined
    ) {
      const selectedAromaName = Array.from(
        new Set(product.variants.map((variant: Variant) => variant.aroma))
      )[selectedAroma];

      interface SizeInfo {
        gram: number;
        totalServices: number;
      }

      const selectedSizeInfo = [
        ...new Map(
          product.variants.map((item: Variant) => [
            `${item.size.gram}-${item.size.total_services}`,
            {
              gram: item.size.gram,
              totalServices: item.size.total_services,
            } as SizeInfo,
          ])
        ).values(),
      ][selectedSize] as SizeInfo;

      const selectedVariant = product.variants.find(
        (variant: Variant) =>
          variant.aroma === selectedAromaName &&
          variant.size.gram === selectedSizeInfo.gram &&
          variant.size.total_services === selectedSizeInfo.totalServices
      );

      if (!selectedVariant) {
        toast.showToast("Ürün seçimi yapılamadı");
        return;
      }

      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        variant_name: `${selectedSizeInfo.gram}g ${selectedAromaName}`,
        product_variant_id: selectedVariant.id,
        aroma: selectedAromaName,
        size: {
          gram: selectedSizeInfo.gram,
          total_services: selectedSizeInfo.totalServices,
        },
        price: matchingTotalPrice,
        pieces: count,
        photo_src: selectedVariant.photo_src,
      };
      console.log("Seçilen varyant numarası:", selectedVariant.id);
      addToCart(cartItem);
      setCount(0);
      toast.showToast("Ürün sepete eklendi");
    }
  };

  return (
    <Container className="my-5">
      <Row>
        {productState?.map((product: Product) => (
          <div
            key={product.id}
            className="row d-flex justify-content-center px-sm-3"
          >
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <ProductImage
                src={PHOTO_URL + photoSrc}
                magnifierHeight={180}
                magnifierWidth={180}
                zoomLevel={1.3}
                className="product-detail_image mb-2"
              />
              <div className="properties pt-1 d-none d-md-block d-xl-none">
                <div className="text-start pb-3">
                  <span>Son kullanma tarihi: 07.2025</span>
                </div>
                <div className="accordion-container">
                  <Accordion className="accordion border-0">
                    <Accordion.Item eventKey="0" className="border-0">
                      <Accordion.Header className="accordion-header">
                        Özellikler
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        {product.explanation.features}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="border-0">
                      <Accordion.Header className="accordion-header">
                        Besin içerigi
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        <div className="d-flex justify-content-between">
                          <span className="fs-5">Besin degeri</span>{" "}
                          {`${product.variants[0].size.gram}gram,  ${product.variants[0].size.total_services} servis`}
                        </div>
                        <div className="list pt-4">
                          {product.explanation.nutritional_content.nutrition_facts.ingredients.map(
                            (data, index) => (
                              <div
                                className="d-flex mb-1 justify-content-between"
                                key={index}
                              >
                                <li className="list-unstyled">{data.name}</li>
                                <li className="list-unstyled">
                                  {data.amounts}
                                </li>
                              </div>
                            )
                          )}
                        </div>
                        <div className="features-list pt-3">
                          {product.explanation.nutritional_content.ingredients.map(
                            (aroma, index) => (
                              <p className="" key={index}>
                                <strong className="fs-6 text-danger">
                                  {aroma.aroma}:{" "}
                                </strong>
                                <span>{aroma.value}</span>
                              </p>
                            )
                          )}
                        </div>
                        <div className="amino-acid-facts-list">
                          {
                            <div className="list pt-4">
                              {product.explanation.nutritional_content?.amino_acid_facts?.ingredients?.map(
                                (data, index) => (
                                  <div
                                    className="d-flex mb-1 justify-content-between"
                                    key={index}
                                  >
                                    <li className="list-unstyled">
                                      {data.name}
                                    </li>
                                    <li className="list-unstyled">
                                      {data.amounts}
                                    </li>
                                  </div>
                                )
                              )}
                            </div>
                          }
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="border-0">
                      <Accordion.Header className="accordion-header">
                        Kullanım Şekli
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        {product.explanation.usage}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <h1 className="fs-2 m-0 pt-md-3">{product.name}</h1>
              <p className="m-1">{product.slug}</p>
              <div className="d-flex column-gap-2 ">
                <span>
                  <FiveStar />
                </span>
                <p>{product.comment_count} Yorum</p>
              </div>
              <div className="product-tags-container">
                <div className="d-flex column-gap-2">
                  {product.tags.map((tag, index) => (
                    <div className="product-detail_tag" key={index}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div className="variants-container">
                <div className="text-start">
                  <h3 className="fs-4">Aroma:</h3>
                </div>
                <div className="d-flex flex-wrap column-gap-2">
                  {Array.from(
                    new Set(product.variants.map((variant) => variant.aroma))
                  ).map((item, index) => {
                    const isSelected = selectedAroma === index;

                    return (
                      <div
                        key={index}
                        className={`product-detail-variant-item flex-wrap d-flex column-gap-3 justify-content-center align-items-center ${isSelected ? "border-primary" : ""
                          }`}
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
                            width: "35px",
                            padding: "5px",
                            height: "100%",
                          }}
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
                      product.variants.map((item) => [
                        `${item.size.gram}-${item.size.total_services}`,
                        {
                          gram: item.size.gram,
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
                      totalServices,
                      discountPercentage,
                    } = item;
                    const isSelected = selectedSize === index;
                    const isAvailable =
                      selectedAroma !== undefined &&
                      isVariantAvailable(
                        Array.from(
                          new Set(
                            product.variants.map((variant) => variant.aroma)
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
                        <span>{gram}G</span>
                        <span>{totalServices} Servis</span>
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
              <hr />
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
              <hr />
              <div className="properties pt-1 d-block d-md-none d-xl-block">
                <div className="text-start pb-3">
                  <span>Son kullanma tarihi: 07.2025</span>
                </div>
                <div className="accordion-container">
                  <Accordion className="accordion border-0">
                    <Accordion.Item eventKey="0" className="border-0">
                      <Accordion.Header className="accordion-header">
                        Özellikler
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        {product.explanation.features}
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="border-0">
                      <Accordion.Header className="accordion-header">
                        Besin içerigi
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        <div className="d-flex justify-content-between">
                          <span className="fs-5">Besin degeri</span>{" "}
                          {`${product.variants[0].size.gram}gram,  ${product.variants[0].size.total_services} servis`}
                        </div>
                        <div className="list pt-4">
                          {product.explanation.nutritional_content.nutrition_facts.ingredients.map(
                            (data, index) => (
                              <div
                                className="d-flex mb-1 justify-content-between"
                                key={index}
                              >
                                <li className="list-unstyled">{data.name}</li>
                                <li className="list-unstyled">
                                  {data.amounts}
                                </li>
                              </div>
                            )
                          )}
                        </div>
                        <div className="features-list pt-3">
                          {product.explanation.nutritional_content.ingredients.map(
                            (aroma, index) => (
                              <p className="" key={index}>
                                <strong className="fs-6 text-danger">
                                  {aroma.aroma}:{" "}
                                </strong>
                                <span>{aroma.value}</span>
                              </p>
                            )
                          )}
                        </div>
                        <div className="amino-acid-facts-list">
                          {
                            <div className="list pt-4">
                              {product.explanation.nutritional_content?.amino_acid_facts?.ingredients?.map(
                                (data, index) => (
                                  <div
                                    className="d-flex mb-1 justify-content-between"
                                    key={index}
                                  >
                                    <li className="list-unstyled">
                                      {data.name}
                                    </li>
                                    <li className="list-unstyled">
                                      {data.amounts}
                                    </li>
                                  </div>
                                )
                              )}
                            </div>
                          }
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="border-0">
                      <Accordion.Header className="accordion-header">
                        Kullanım Şekli
                      </Accordion.Header>
                      <Accordion.Body className="accordion-body">
                        {product.explanation.usage}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Row>
      <Container className="my-5">
        <Row>
          <LastView />
        </Row>
      </Container>
      <Container className="mt-5">
        <ProductComment />
      </Container>
      <Container className="pb-4">
        <BestSeller best_seller={bestSeller} />
      </Container>
    </Container>
  );
}

export default ProductDetail;
