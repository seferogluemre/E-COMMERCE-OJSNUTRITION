import { Card } from "react-bootstrap";
import "./CommentCard.scss";
import { ReviewsProps } from "../BlazeSlider/BlazeSliderComponent";

function CommentCard({
  created_at,
  title,
  comment,
  first_name,
  last_name,
}: ReviewsProps) {
  return (
    <>
      <Card className="d-flex flex-column row-gap-2 border-0">
        <Card.Header className="text-muted border-0 bg-transparent">
          {created_at}
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{comment}</Card.Text>
          <Card.Text>
            {first_name} {last_name}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default CommentCard;
