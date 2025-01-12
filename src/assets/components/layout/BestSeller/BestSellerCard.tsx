import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import { BestSellerProps } from "../../type/type";
import FiveStar from "../FiveStars/FiveStar";

function BestSellerCard({
  name,
  photo_src,
  comment_count,
  slug,
  price_info: { total_price },
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
          <CardText className="best-seller-product-price">
            {total_price}₺
          </CardText>
        </CardBody>
      </Card>
    </>
  );
}
export default BestSellerCard;
