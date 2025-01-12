import { Container, Row } from "react-bootstrap";
import "./Categories.scss";

function Categories() {
  const caategoriesImagesArray = [
    { categoriesPhoto: "/assets/categoriesImages/card1.png" },
    { categoriesPhoto: "/assets/categoriesImages/card2.png" },
    { categoriesPhoto: "/assets/categoriesImages/card3.png" },
    { categoriesPhoto: "/assets/categoriesImages/card4.png" },
    { categoriesPhoto: "/assets/categoriesImages/card5.png" },
    { categoriesPhoto: "/assets/categoriesImages/card6.png" },
  ];

  return (
    <>
      <Container className="my-5">
        <Row className="d-flex justify-content-center">
          {caategoriesImagesArray.map((category, index) => (
            <div
              className="col-lg-4 col-md-6  pb-3 category-column text-center"
              key={index}
            >
              <img
                src={category.categoriesPhoto}
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
