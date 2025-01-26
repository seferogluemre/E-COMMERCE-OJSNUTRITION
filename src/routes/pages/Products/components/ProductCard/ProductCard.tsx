import { Card, CardBody, CardHeader, CardText } from "react-bootstrap";
import { ProductListProp } from "../../../../../components/type/type";
import FiveStar from "../../../../../components/layout/FiveStars/FiveStar";

function ProductCard({
  name,
  photo_src,
  comment_count,
  slug,
  price_info: { total_price, discount_percentage },
}: ProductListProp) {
  return (
    <>
      <Card className="product_list-card border-0">
        <CardHeader className="product_list-card-header p-2 border-0 bg-transparent">
          <img src={photo_src} className="product_list-card-image" />
        </CardHeader>
        <CardBody className="product_list-card-body flex-wrap">
          <CardText className="product_list-card_name">
            {name.toLocaleUpperCase()}
          </CardText>
          <CardText className="product_list-card_title">
            {slug?.toLocaleUpperCase()}
          </CardText>
          <CardText className="column-gap-1 d-flex pb-3 justify-content-center">
            <FiveStar />
          </CardText>
          <CardText className="m-0">{comment_count} Yorum</CardText>
          <CardText className="product_list-card-price">
            {total_price}₺
          </CardText>
          <CardText>
            {discount_percentage && (
              <p className="discounted-percentage">
                %{discount_percentage}
                <br />
                İNDİRİM
              </p>
            )}
          </CardText>
        </CardBody>
      </Card>
    </>
  );
}
export default ProductCard;
