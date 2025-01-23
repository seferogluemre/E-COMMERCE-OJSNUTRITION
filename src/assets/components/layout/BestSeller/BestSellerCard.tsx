import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import { BestSellerProps } from "../../type/type";
import FiveStar from "../FiveStars/FiveStar";

function BestSellerCard({
  name,
  photo_src,
  comment_count,
  slug,
  price_info,
  discounted_percentage,
}: BestSellerProps) {
  return (
    <>
      <Card className="best_seller-card border-0">
        <CardHeader className="best-seller-card-header p-2 border-0 bg-transparent">
          <img src={photo_src} className="best-seller-product-image" />
        </CardHeader>
        <CardBody className="best_seller-card-body flex-wrap">
          <CardText className="best_seller-card_name">
            {name.toLocaleUpperCase()}
          </CardText>
          <CardText className="best_seller-card_title">
            {slug?.toLocaleUpperCase()}
          </CardText>
          <CardText className="column-gap-1 d-flex pb-3 justify-content-center">
            <FiveStar />
          </CardText>
          <CardText className="m-0">{comment_count} Yorum</CardText>
          <div className="product-price">
            {price_info.discounted_price && (
              <span
                className="original-price "
                style={{ textDecoration: "line-through" }}
              >
                {price_info.total_price} TL
              </span>
            )}
            <span className="current-price m-1 text-danger">
              {price_info.total_price} TL
            </span>
            {discounted_percentage && (
              <p className="discounted-percentage">
                %{discounted_percentage}
                <br />
                İNDİRİM
              </p>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  );
}
export default BestSellerCard;
