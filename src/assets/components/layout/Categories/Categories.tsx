import { Container, Row } from "react-bootstrap";

function Categories() {

    const caategoriesImagesArray = [
        { categoriesPhoto: "/src/assets/images/categoriesImages/card1.png" },
        { categoriesPhoto: "/src/assets/images/categoriesImages/card2.png" },
        { categoriesPhoto: "/src/assets/images/categoriesImages/card3.png" },
        { categoriesPhoto: "/src/assets/images/categoriesImages/card4.png" },
        { categoriesPhoto: "/src/assets/images/categoriesImages/card5.png" },
        { categoriesPhoto: "/src/assets/images/categoriesImages/card6.png" },
    ]




    return <>
        <Container className="my-5">
            <Row>
                {
                    caategoriesImagesArray.map((category) => (
                        <div className="col-lg-4 pb-3">
                            <img src={category.categoriesPhoto} className="img-fluid rounded-4" alt="" />
                        </div>
                    ))
                }
            </Row>
        </Container>


    </>

}
export default Categories;