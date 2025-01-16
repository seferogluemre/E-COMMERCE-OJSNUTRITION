import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardText,
  Container,
  Row,
} from "react-bootstrap";
import { LOCAL_KEY } from "../../ProductDetail";
import { useNavigate } from "react-router-dom";
import FiveStar from "../../../../../assets/components/layout/FiveStars/FiveStar";
import "./LastView.scss";

interface LastViewProduct {
  name: string;
  photo: string;
  slug: string;
  comment_count: number;
  price: number;
}

function LastView() {
  const [lastViewProducts, setLastViewProducts] = useState<LastViewProduct[]>(
    () => {
      const storedProducts = localStorage.getItem(LOCAL_KEY);
      return storedProducts ? JSON.parse(storedProducts) : [];
    }
  );

  const navigate = useNavigate();

  return (
    <>
      <Container className="py-3">
        <div>
          <h1 className="text-center fs-3">Son Görüntülenenler</h1>
        </div>
        <Row>
          {Array.isArray(lastViewProducts) &&
            lastViewProducts?.map((data) => (
              <div
                className="col-lg-4 col-md-6 col-sm-6 col-xxl-2 flex-wrap d-flex justify-content-center best_seller_column"
                key={data.slug}
                onClick={() => navigate(`/products/${data.slug}`)}
              >
                <Card className="best_seller-card border-0">
                  <CardHeader className="best-seller-card-header p-2 border-0 bg-transparent">
                    <img
                      src={data.photo_src}
                      className="best-seller-product-image"
                    />
                  </CardHeader>
                  <CardBody className="best_seller-card-body flex-wrap">
                    <CardText className="best_seller-card_name">
                      {data.name.toLocaleUpperCase()}
                    </CardText>
                    <CardText className="best_seller-card_title">
                      {data.slug?.toLocaleUpperCase()}
                    </CardText>
                    <CardText className="column-gap-1 d-flex pb-3 justify-content-center">
                      <FiveStar />
                    </CardText>
                    <CardText className="m-0">
                      {data.comment_count} Yorum
                    </CardText>
                    <CardText className="m-0">{data.price}TL</CardText>
                    <CardText className="best-seller-product-price"></CardText>
                  </CardBody>
                </Card>
              </div>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default LastView;
