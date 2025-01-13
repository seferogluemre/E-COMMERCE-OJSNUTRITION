import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import { ProductListProp } from "../../components/type/type";
import { PHOTO_URL } from "../../../services/api/products";
import ProductCard from "./ProductCard";
import "./_ProductCard.scss";

function Products() {
  const { allProducts } = useLoaderData();

  return (
    <>
      <Container className="my-5">
        <div className="text-center">
          <h1 className="fs-2">Tüm Ürünler</h1>
        </div>
        <Row>
          {allProducts.data.results?.map((product: ProductListProp) => (
            <div
              className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 my-3 product_list_card_column"
              key={product.id}
            >
              <ProductCard
                key={product.id}
                name={product.name}
                average_star={product.average_star}
                photo_src={PHOTO_URL + product.photo_src}
                slug={product.slug}
                price_info={product.price_info}
                comment_count={product.comment_count}
                id={product.id}
                short_explanation={product.short_explanation}
              />
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Products;
