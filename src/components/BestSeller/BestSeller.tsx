import { Container, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import BestSellerCard from "./BestSellerCard";
import { PriceInfo } from "../../routes/Products/Products";
import { PHOTO_URL } from "../../services/api/collections/auth";
import "./BestSeller.scss"

export interface BestSellerPropsCS {
  name: string;
  short_explanation: string;
  price_info: PriceInfo;
  photo_src: string;
  comment_count?: number;
  average_star: number;
  discounted_percentage: number | null;
  slug?: string;
}

export interface BestSellerProps {
  name: string;
  short_explanation: string;
  slug?: string;
  price_info: PriceInfo;
  photo_src: string;
  discounted_percentage?: number | null;
  comment_count?: number;
  average_star: number;
}

const WithBestSeller = (WrappedComponent: React.ComponentType<any>) => {
  return (props: { best_seller?: any }) => {
    const { best_seller } = props;
    const products = useLoaderData();
    const dataToDisplay = best_seller || products;

    return <WrappedComponent {...props} best_seller={dataToDisplay} />;
  };
};

function BestSeller({ best_seller }) {
  const navigate = useNavigate();
  const dataToDisplay = Array.isArray(best_seller) ? best_seller : [];

  return (
    <Container className={`my-5 best_seller_container`}>
      <div className="text-center m-0">
        <h1 className="fs-3">Çok Satanlar</h1>
      </div>
      <Row className="d-flex justify-content-center row-gap-lg-5 row-gap-4">
        {dataToDisplay.length > 0 ? (
          dataToDisplay.map((data: BestSellerPropsCS, index: number) => (
            <div
              className={`col-lg-4 col-md-6 col-sm-6 col-xxl-2 flex-wrap d-flex justify-content-center best_seller_column`}
              key={data.slug}
              onClick={() => navigate(`/products/${data.slug}`)}
            >
              <BestSellerCard
                slug={data.slug}
                key={index}
                discounted_percentage={data.price_info?.discount_percentage}
                name={data.name}
                photo_src={PHOTO_URL + data.photo_src}
                short_explanation={data.short_explanation.toUpperCase()}
                average_star={data.average_star}
                comment_count={data.comment_count}
                price_info={{
                  discounted_price: data.price_info.discounted_price,
                  total_price: data.price_info.total_price,
                }}
              />
            </div>
          ))
        ) : (
          <div className="text-center">Ürün bulunamadı.</div>
        )}
      </Row>
    </Container>
  );
}

const BestSellerWithWrapper = WithBestSeller(BestSeller);
export default BestSellerWithWrapper;
