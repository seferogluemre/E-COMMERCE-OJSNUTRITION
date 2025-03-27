import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import FiveStar from "../FiveStars/FiveStar";
import { BestSellerProps } from "./BestSeller";
import "./BestSeller.scss"

function BestSellerCard({
  name,
  photo_src,
  comment_count,
  slug,
  price_info,
  discounted_percentage,
}: BestSellerProps) {
  return (
    <Card className="best_seller_card">
      <CardHeader id="best_seller_card_header" className="best_seller_card_header border-0 bg-transparent">
        <div className="image-container">
          <img
            src={photo_src}
            className="best_seller_product_image"
            alt={name}
            loading="lazy"
          />
        </div>
        {discounted_percentage && (
          <p className="discounted_percentage">
            %{discounted_percentage}
            <br />
            İNDİRİM
          </p>
        )}
      </CardHeader>
      <CardBody className="best_seller_card_body flex-wrap">
        <CardText className="best_seller_card_name">
          {name.toLocaleUpperCase()}
        </CardText>
        <CardText className="best_seller_card_title">
          {slug?.toLocaleUpperCase()}
        </CardText>
        <CardText className="column-gap-1 d-flex pb-1 justify-content-center">
          <FiveStar />
        </CardText>
        <CardText className="m-0">{comment_count} Yorum</CardText>
        <div className="product-price">
          {price_info.discounted_price && (
            <span
              className="original-price"
              style={{ textDecoration: "line-through" }}
            >
              {price_info.total_price} TL
            </span>
          )}
          <span className="current-price m-1 text-danger">
            {price_info.discounted_price || price_info.total_price} TL
          </span>
        </div>
      </CardBody>
    </Card>
  );
}

export default BestSellerCard;
