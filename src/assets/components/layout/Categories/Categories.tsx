import { Container, Row } from "react-bootstrap";
import "./Categories.scss";
import { useNavigate } from "react-router-dom";

interface CategoryProp {
  CategoriesPhoto: string;
  to: string;
}

function Categories() {
  const navigate = useNavigate();

  const caategoriesImagesArray: CategoryProp[] = [
    { CategoriesPhoto: "/assets/categoriesImages/card1.png", to: "/" },
    { CategoriesPhoto: "/assets/categoriesImages/card2.png", to: "/" },
    { CategoriesPhoto: "/assets/categoriesImages/card3.png", to: "/" },
    { CategoriesPhoto: "/assets/categoriesImages/card4.png", to: "/" },
    { CategoriesPhoto: "/assets/categoriesImages/card5.png", to: "/" },
    { CategoriesPhoto: "/assets/categoriesImages/card6.png", to: "/products" },
  ];

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          {caategoriesImagesArray.map((category, index) => (
            <div
              className="col-lg-4 col-md-6  pb-3 category-column text-center"
              key={index}
              onClick={() => navigate(category.to)}
            >
              <img
                src={category.CategoriesPhoto}
                className="img-fluid rounded-4"
              />
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}
export default Categories;
