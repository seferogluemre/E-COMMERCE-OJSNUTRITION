import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import BestSellerCard from "./BestSellerCard";
export const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";
export const Photo_Url = "https://fe1111.projects.academy.onlyjs.com";

export interface PriceInfo {
  profit?: null;
  total_price: number;
  discounted_price?: number | null;
  price_per_servings?: number;
  discount_percentage?: number | null;
}
export interface BestSellerPropsCS {
  name: string;
  short_explanation: string;
  price_info: PriceInfo;
  photo_src: string;
  comment_count?: number;
  average_star: number;
  slug?: string;
}

function BestSeller() {
  const { products } = useLoaderData();

  return (
    <>
      <Container>
        <Row>
          {products?.map((data: BestSellerPropsCS, index: number) => (
            <div className="col-lg-3 col-md-6 col-xxl-2" key={data.slug}>
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
