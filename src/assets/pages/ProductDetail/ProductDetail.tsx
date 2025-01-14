import { useEffect, useState } from "react";
import { Accordion, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { PHOTO_URL } from "../../../services/api/products";
import "./_ProductDetail.scss";
import FiveStar from "../../components/layout/FiveStars/FiveStar";
import ProductComment from "./ProductComment";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FiMic, FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { MdShoppingCart } from "react-icons/md";
import ProductTrust from "./ProductTrust";
import BestSeller from "../../components/layout/BestSeller/BestSeller";

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

interface Product {
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

function ProductDetail() {
  const { product, bestSeller } = useLoaderData();
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    window.scrollTo(0, 0); // Sayfa yüklendiğinde en üstte kaydır
  }, []);

  const [productState, setProductState] = useState<Product[]>(
    Array.isArray(product) ? product : [product]
  );

  const aromaColors: ColorProps = {
    Bisküvi: "#D8C3A5",
    Çikolata: "#3E2723",
    Muz: "#FFEB3B",
    "Salted Caramel": "#D2691E",
    "Choco Nut": "#8B4513",
    "Hindistan Cevizi": "#FFEBCD",
    "Raspberry Cheesecake": "#E91E63",
    Çilek: "#FF1744",
    Aromasız: "#C0C0C0",
    Karpuz: "#FF637D",
    Limonata: "#FFF700",
    "Fruit Fusion": "#FF4500",
    "Yeşil Elma": "#8DB600",
    "Lemon Cheesecake": "#F5EA7E",
    Muhallebi: "#F5E3D7",
    Ahududu: "#D32F2F",
    Şeftali: "#FFB07C", //
  };

  return (
    <Container className="my-5">
      <Row>
        {productState?.map((product) => (
          <div
            key={product.id}
            className="row d-flex justify-content-center px-sm-3"
          >
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <img
                src={PHOTO_URL + product.variants[0].photo_src}
                alt={product.slug}
                className="product-detail_image mb-2"
              />
            </div>
            <div className="col-lg-6 col-sm-12 col-xxl-6 col-md-12 product-detail_column">
              <h1 className="fs-2 m-0">{product.name}</h1>
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
                  ).map((item, index) => (
                    <div
                      key={index}
                      className="product-detail-variant-item flex-wrap d-flex column-gap-3 justify-content-center align-items-center"
                    >
                      {item}
                      <span
                        style={{
                          display: "inline-block",
                          width: "20px",
                          padding: "4ßpx",
                          height: "100%",
                          backgroundColor:
                            aromaColors[item.trim()] || "transparent",
                        }}
                      ></span>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div className="product-size-container mt-2">
                <div className="text-start pb-lg-2">
                  <h3 className="fs-4">Boyut:</h3>
                </div>
                <div className="d-flex column-gap-3 ">
                  {product.explanation.nutritional_content.nutrition_facts.portion_sizes.map(
                    (size) => (
                      <div className="product-size-box d-flex align-items-center">
                        {size}
                      </div>
                    )
                  )}
                </div>
              </div>
              <hr />
              <div className="cart-container py-2">
                <div className="  align-items-center justify-content-between">
                  {
                    <div className="d-flex justify-content-between">
                      <h1 className="fs-2">
                        {product.variants[1].price.total_price}TL
                      </h1>
                      <p>{product.variants[0].size.total_services}Servis</p>
                    </div>
                  }
                </div>
                <div className="d-flex pt-2 justify-content-between">
                  <div className="count-box">
                    <button
                      onClick={() => setCount((count) => count + 1)}
                      className="product-counter-btn"
                    >
                      <GoPlus />
                    </button>
                    <span>{count}</span>
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
              <div className="properties pt-1">
                <div className="text-start pb-3">
                  <span>Son Kullanma Tarihi: 07.2025</span>
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
                              {product.explanation.nutritional_content.amino_acid_facts?.ingredients.map(
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
      <Container className="mt-5">
        <ProductComment />
      </Container>
      <Container>
        <BestSeller best_seller={bestSeller} />
      </Container>
    </Container>
  );
}

export default ProductDetail;
