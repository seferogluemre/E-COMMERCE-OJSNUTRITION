import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { PHOTO_URL } from "../../../services/api/products";
import "./_ProductDetail.scss";
import FiveStar from "../../components/layout/FiveStars/FiveStar";
import { FaStar } from "react-icons/fa";
import { dummyCommentsData } from "../../../store/data/CommentsDummyData";

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
  const { product } = useLoaderData();

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

  const reviews = dummyCommentsData;
  const averageRating =
    reviews.reduce((acc, review) => acc + parseInt(review.stars), 0) /
    reviews.length;
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const currentReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  const ratingDistribution = Array.from({ length: 5 }, (_, index) => {
    const stars = index + 1;
    const count = reviews.filter(
      (review) => parseInt(review.stars) === stars
    ).length;
    const percentage = (count / reviews.length) * 100;
    return { stars, count, percentage };
  });

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const getVisiblePages = () => {
    const visiblePages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(pageCount, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
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
              <div className="cart-container">
                <div className="d-flex">
                  {
                    <h1 className="fs-2">
                      {product.variants[1].price.total_price}TL
                    </h1>
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </Row>
      <Container className=" product-comments-detail-container pt-5">
        <div className="product-reviews">
          <div className="overall-rating">
            <div className="rating-summary">
              <h2 className="average-rating">{averageRating.toFixed(1)}</h2>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    filled={star <= Math.round(averageRating)}
                    large={true}
                  />
                ))}
              </div>
              <p className="total-reviews">{reviews.length} YORUMA GÖRE</p>
            </div>
            <div className="rating-distribution">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="rating-bar">
                  <span className="star-count">
                    {rating.stars} <FaStar filled={true} />
                  </span>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="review-count">({rating.count})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="review-list">
            {currentReviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div>
                    <div className="star-rating">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          filled={star <= parseInt(review.stars)}
                        />
                      ))}
                    </div>
                    <span className="verified-buyer">DOĞRULANMIŞ SATICI</span>
                    <h3 className="reviewer-name">
                      {review.first_name} {review.last_name}
                    </h3>
                  </div>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString("tr-TR")}
                  </span>
                </div>
                <p className="review-content">{review.comment}</p>
              </div>
            ))}
          </div>
          <div className="pagination pt-3">
            <Row className="d-flex justify-content-center">
              <div className="pagination d-flex justify-content-center">
                {currentPage > 1 && (
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="mx-1"
                  >
                    &lt;
                  </Button>
                )}
                {getVisiblePages().map((page) => (
                  <Button
                    key={page}
                    className={`mx-1 ${currentPage === page ? "active" : ""}`}
                    onClick={() => handlePageChange(page)}
                    style={{
                      backgroundColor:
                        currentPage === page ? "blue" : "transparent",
                      color: currentPage === page ? "white" : "black",
                    }}
                  >
                    {page}
                  </Button>
                ))}
                {currentPage < pageCount && (
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="mx-1"
                  >
                    &gt;
                  </Button>
                )}
              </div>
            </Row>
          </div>
        </div>
      </Container>
    </Container>
  );
}

export default ProductDetail;
