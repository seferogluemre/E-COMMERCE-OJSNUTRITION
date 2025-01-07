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
      <Container>
        <Row className="d-flex justify-content-center row-gap-5">
          {products?.map((data: BestSellerPropsCS, index: number) => (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-xxl-2 best_seller_column"
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
