import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";
import { Product } from "../../../services/api/products";

function ProductDetail() {
  const { productSlug } = useParams();
  const { loading, error, data }: { data: Product | null } = useFetch(
    String(productSlug)
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No product found.</div>;

  return (
    <Container className="my-5">
      <Row>
        {/* <Col md={6}>
          {hasVariants && (
            <img
              src={photo_url + selectedVariant.photo_src}
              alt={data.name}
              className="img-fluid"
            />
          )}
        </Col>
        <Col md={6}>
          <h1>{data.name}</h1>
          <p>{data.short_explanation}</p>
          <h3>Açıklama</h3>
          <p>{data.explanation.description}</p>
          <h3>Özellikler</h3>
          <p>{data.explanation.features}</p>
          <h3>Fiyatlar</h3>
          {hasVariants ? (
            data.variants.map((variant) => (
              <div key={variant.id}>
                <h4>
                  {variant.aroma} - {variant.size.gram}g
                </h4>
                <p>Fiyat: {variant.price.total_price}₺</p>
                <p>İndirimli Fiyat: {variant.price.discounted_price}₺</p>
                <p>Servis Başına Fiyat: {variant.price.price_per_servings}₺</p>
                <p>{variant.is_available ? "Stokta Var" : "Stokta Yok"}</p>
              </div>
            ))
          ) : (
            <p>Bu ürün için mevcut varyant yok.</p>
          )}
        </Col> */}
      </Row>
    </Container>
  );
}

export default ProductDetail;
