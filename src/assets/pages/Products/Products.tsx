import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { getAllProducts } from "../../../services/api/products";

function Products() {
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Container className="my-5">
        <Row>
          <h1>Emre Seferoglu</h1>
        </Row>
      </Container>
    </>
  );
}

export default Products;
