import { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { dummyCommentsData } from "../../../../data/CommentsDummyData";

function ProductComment() {
  const reviews = dummyCommentsData;
  const averageRating =
    reviews.reduce((acc, review) => acc + parseInt(review.stars), 0) /
    reviews.length;
  const reviewsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
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
    <>
      <Container className=" product-comments-detail-container pt-5">
        <div className="product-reviews">
          <div className="overall-rating">
            <div className="rating-summary">
              <h2 className="average-rating">{averageRating.toFixed(1)}</h2>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
              </div>
              <p className="total-reviews">{reviews.length} YORUMA GÖRE</p>
            </div>
            <div className="rating-distribution">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="rating-bar">
                  <span className="star-count">
                    {rating.stars} <FaStar className=" text-warning" />
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
                <div className="review-header d-flex ">
                  <div>
                    <div className="d-flex align-items-center column-gap-3">
                      <div className="star-rating text-warning">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} />
                        ))}
                      </div>
                      <span className="verified-buyer">DOĞRULANMIŞ MÜŞTERİ</span>
                    </div>
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
    </>
  );
}

export default ProductComment;
