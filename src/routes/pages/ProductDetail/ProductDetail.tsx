import { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { PHOTO_URL } from "../../../services/api/products";
import "./_ProductDetail.scss";
import FiveStar from "../../../assets/components/layout/FiveStars/FiveStar";
import ProductComment from "./components/ProductComment/ProductComment";
import { FaMinus } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import ProductTrust from "./components/ProductTrust/ProductTrust";
import BestSeller from "../../../assets/components/layout/BestSeller/BestSeller";
import UseLocalStorage from "../../../hooks/UseSessionStorage";
import LastView from "./components/LastView/LastView";
import { AiOutlineCheck } from "react-icons/ai";
import { ProductImage } from "./components/ProductImage";

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
}

interface ColorProps {
  [key: string]: string;
}

export const LOCAL_KEY = "lastView";

function ProductDetail() {
  const { product, bestSeller } = useLoaderData();
  const [count, setCount] = useState<number>(0);
  const [storedValue, setStoredValue] = UseLocalStorage(LOCAL_KEY, "");
  const [selectedSize, setSelectedSize] = useState<number>();
  const [selectedAroma, setSelectedAroma] = useState<number>();

  useEffect(() => {
    window.scrollTo(0, 0);
    setProductState(Array.isArray(product) ? product : [product]);

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

      localStorage.setItem(LOCAL_KEY, JSON.stringify(updatedValue));

      return updatedValue;
    });

    setSelectedAroma(null);
    setSelectedSize(-1);
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
  console.log(productState[0]);

  return (
    <Container className="my-5">
      <Row>
        {productState?.map((product) => (
          <div
            key={product.id}
            className="row d-flex justify-content-center px-sm-3"
          >
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <ProductImage
                src={PHOTO_URL + product.variants[0].photo_src}
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
                    const isSelected = selectedAroma == index;
                    return (
                      <div
                        key={index}
                        className={`product-detail-variant-item flex-wrap d-flex column-gap-3 justify-content-center align-items-center ${
                          isSelected ? "border-primary" : ""
                        }`}
                        onClick={() => setSelectedAroma(index)}
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
                        ></img>
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
                <div className="d-flex column-gap-3 ">
                  {Array.from(
                    new Set(
                      product.variants.map((item) =>
                        JSON.stringify({
                          gram: item.size.gram,
                          totalServices: item.size.total_services,
                          discountPercentage:
                            item.price.discount_percentage || null, // Discount kontrolü
                        })
                      )
                    )
                  ).map((item, index) => {
                    const { gram, totalServices, discountPercentage } =
                      JSON.parse(item);
                    const isSelected = selectedSize == index;

                    return (
                      <div
                        className={`product-size-box d-flex align-items-center flex-column ${
                          isSelected ? "border-primary" : ""
                        }`}
                        key={index}
                        onClick={() => setSelectedSize(index)}
                      >
                        <span>{gram}G</span>
                        <span>{totalServices} Servis</span>
                        {discountPercentage && (
                          <div className="discounted-percentage-box">
                            <p>{discountPercentage}%</p>
                            <span>İNDİRİM</span>
                          </div>
                        )}
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
              <div className="cart-container py-2">
                <div className="  align-items-center justify-content-between">
                  {
                    <div className="d-flex justify-content-between">
                      <h1 className="fs-2">
                        {product.variants[1]?.price?.total_price}TL
                      </h1>
                      <p>{product.variants[0]?.size?.total_services}Servis</p>
                    </div>
                  }
                </div>
                <div className="d-flex pt-2 justify-content-between column-gap-md-3">
                  <div className="count-box">
                    <button
                      onClick={() => setCount((count) => count + 1)}
                      className="product-counter-btn"
                    >
                      <GoPlus />
                    </button>
                    <span className="fs-4 m-2">{count}</span>
                    <button
                      onClick={() => setCount((count) => count - 1)}
                      className="product-counter-btn"
                    >
                      <FaMinus />
                    </button>
                  </div>
                  <div className="cart">
                    <button className="add-to-cart-btn ">
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
