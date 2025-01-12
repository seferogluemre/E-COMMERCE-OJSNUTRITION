import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import BestSellerCard from "./BestSellerCard";
import { BestSellerPropsCS } from "../../type/type";
import "./_BestSeller.scss";

export const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const Photo_Url = "https://fe1111.projects.academy.onlyjs.com";

function BestSeller() {
  const { products } = useLoaderData();

  return (
    <>
      <Container className="my-5 best-seller-container  " fluid>
        <div className="text-center">
          <h1 className="fs-3">Çok Satanlar</h1>
        </div>
        <Row className="d-flex justify-content-center row-gap-lg-5 row-gap-4">
          {products?.map((data: BestSellerPropsCS, index: number) => (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-xxl-2 d-flex justify-content-center best_seller_column"
              key={data.slug}
            >
              <BestSellerCard
                slug={data.slug}
                key={index}
                name={data.name}
                photo_src={Photo_Url + data.photo_src}
                short_explanation={data.short_explanation.toUpperCase()}
                average_star={data.average_star}
                comment_count={data.comment_count}
                price_info={data.price_info}
              />
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default BestSeller;
