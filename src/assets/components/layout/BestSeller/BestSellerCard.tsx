import { Card, CardBody, CardHeader, CardImg, CardText } from "react-bootstrap";

interface BestSellerCardProps {
  image: string;
  title: string;
  slug: string;
  price?: number;
  comment?: string;
  rating?: number;
}

function BestSellerCard({ image, title, slug }: BestSellerCardProps) {
  return (
    <>
      <Card className="best_seller-card">
        <CardHeader>
          <CardImg src={image} className="best-seller-product-image" />
        </CardHeader>
        <CardBody className="card-body">
          <CardText>{title}</CardText>
          <CardText>{slug}</CardText>
          {/* <CardText >{comment}</CardText>
                <CardText >{rating}</CardText>
                <CardText >{price}</CardText> */}
        </CardBody>
      </Card>
    </>
  );
}
export default BestSellerCard;
