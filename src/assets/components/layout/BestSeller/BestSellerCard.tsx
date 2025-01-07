import { Card, CardBody, CardHeader, CardImg, CardText } from "react-bootstrap";
// import { BestSellerPropsCS } from "./BestSeller";

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

function BestSellerCard({
  name,
  photo_src,
  average_star,
  comment_count,
  slug,
  price_info: { total_price, discounted_price },
}: BestSellerProps) {
  return (
    <>
      <Card className="best_seller-card">
        <CardHeader>
          <CardImg src={photo_src} className="best-seller-product-image" />
        </CardHeader>
        <CardBody className="card-body">
          <CardText>{name}</CardText>
          <CardText>{slug}</CardText>
          <CardText>{comment_count}</CardText>
          <CardText>{average_star}</CardText>
          <CardText>{total_price}</CardText>
        </CardBody>
      </Card>
    </>
  );
}
export default BestSellerCard;
