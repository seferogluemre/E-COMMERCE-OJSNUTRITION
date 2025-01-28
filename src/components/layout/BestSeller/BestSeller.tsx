import { Container, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import BestSellerCard from "./BestSellerCard";
import { BestSellerPropsCS } from "../../type/type";
import "./_BestSeller.scss";
import { PHOTO_URL } from "../../../routes/pages/Products/components/types";
import React from 'react';

// HOC yapısında tipi belirleyelim
interface WithBestSellerProps {
  best_seller: BestSellerPropsCS[]; // best_seller'ı bir dizi olarak belirledik
}

// HOC fonksiyonu, WrappedComponent'in prop tipini de alacak
const WithBestSeller = <P extends WithBestSellerProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const { best_seller } = props;
    const products = useLoaderData();

    // If best_seller props exist, save them to localStorage
    React.useEffect(() => {
      if (best_seller && best_seller.length > 0) {
        localStorage.setItem('bestSeller', JSON.stringify(best_seller));
      }
    }, [best_seller]);

    // Get data from localStorage if no props provided
    const dataToDisplay = best_seller || (() => {
      try {
        const localData = localStorage.getItem('bestSeller');
        return localData ? JSON.parse(localData) : products;
      } catch (error) {
        console.error('Error reading from localStorage:', error);
        return products;
      }
    })();

    return <WrappedComponent {...props} best_seller={dataToDisplay} />;
  };
};


interface BestSellerProps {
  best_seller: BestSellerPropsCS[];
}

const BestSeller: React.FC<BestSellerProps> = ({ best_seller }) => {
  const navigate = useNavigate();

  return (
    <Container className="my-5 best-seller-container">
      <div className="text-center m-0">
        <h1 className="fs-3">Çok Satanlar</h1>
      </div>
      <Row className="d-flex justify-content-center row-gap-lg-5 row-gap-4">
        {best_seller.length > 0 ? (
          best_seller.map((product) => (
            <div
              className="col-lg-4 col-md-6 col-sm-6 col-xxl-2 flex-wrap d-flex justify-content-center best_seller_column"
              key={product.slug}
              onClick={() => navigate(`/products/${product.slug}`)}
            >
              <BestSellerCard
                slug={product.slug}
                name={product.name}
                photo_src={PHOTO_URL + product.photo_src}
                short_explanation={product.short_explanation.toUpperCase()}
                average_star={product.average_star}
                comment_count={product.comment_count}
                price_info={{
                  discounted_price: product.price_info.discounted_price,
                  total_price: product.price_info.total_price,
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
};

const BestSellerWithWrapper = WithBestSeller(BestSeller);

export default BestSellerWithWrapper;
