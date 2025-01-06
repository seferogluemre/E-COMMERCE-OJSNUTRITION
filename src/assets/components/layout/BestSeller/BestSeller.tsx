import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import BestSellerCard from "./BestSellerCard";

export const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

export interface BestSellerProps {
  name: string;
  short_explanation: string;
  slug?: string;
  price_info: {
    profit?: null;
    total_price: number;
    discounted_price?: number | null;
    price_per_servings?: number;
    discount_percentage?: number | null;
  };
  photo_src: string;
  comment_count?: number;
  average_star: number;
}

export async function loader() {
  const bestSellerResponse = await fetch(base_url + "/products/best-sellers");
  const bestSellerData = await bestSellerResponse.json();
  console.log(bestSellerData.data);
  return { products: bestSellerData.data };
}

function BestSeller() {
  const { products } = useLoaderData() as { products: BestSellerProps };

  if (!products) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <>
      <Container>
        <Row>
          {products.data.map((product: any) => (
            <div className="col-lg-3 col-md-6 col-xxl-2" key={product.slug}>
              <BestSellerCard
                image={product.photo_src}
                slug={product.slug}
                title={product.name}
              />
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default BestSeller;
