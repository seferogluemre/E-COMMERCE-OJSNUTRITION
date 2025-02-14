import { Container, Row } from "react-bootstrap";
import styles from "./Categories.module.scss";
import { useNavigate } from "react-router-dom";

interface CategoryProp {
  CategoriesPhoto: string;
  to: string;
}

function Categories() {
  const navigate = useNavigate();

  const categoriesImagesArray: CategoryProp[] = [
    { CategoriesPhoto: "/assets/categoriesImages/card1.png", to: "/products/category/38fb5754-3068-4490-a12a-169fa564c675" },
    { CategoriesPhoto: "/assets/categoriesImages/card2.png", to: "/products/category/84229f35-1b8a-4e02-9688-245c39c8ec42" },
    { CategoriesPhoto: "/assets/categoriesImages/card3.png", to: "/products/category/cae64711-98b9-48f4-82b4-c5d460718dcf" },
    { CategoriesPhoto: "/assets/categoriesImages/card4.png", to: "/products/category/d3cdcefe-eedd-4ee0-a254-b821ed4e2b8c" },
    { CategoriesPhoto: "/assets/categoriesImages/card5.png", to: "/products/category/8eaeff30-3138-49ac-b120-0eac18866190" },
    { CategoriesPhoto: "/assets/categoriesImages/card6.png", to: "/products" },
  ];

  return (
    <Container className="my-5">
      <Row className="d-flex justify-content-center">
        {categoriesImagesArray.map((category, index) => (
          <div
            className={`col-lg-4 col-md-6 pb-3 ${styles.categoryColumn}`}
            key={index}
            onClick={() => navigate(category.to)}
          >
            <img src={category.CategoriesPhoto} className="img-fluid" alt="Category" />
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default Categories;
