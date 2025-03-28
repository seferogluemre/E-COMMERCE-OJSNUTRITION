import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";
import { useEffect, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import "./BlazeSlider.scss";
import { Button } from "react-bootstrap";
import CommentCard from "../CommentCard/CommentCard";
import { dummyCommentsData } from "../../../../data/CommentsDummyData";
import FiveStar from "../../../../components/FiveStars/FiveStar";

const BlazeSliderComponent = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (sliderRef.current) {
      const slider = new BlazeSlider(sliderRef.current, {
        all: {
          slidesToShow: 4,
          slidesToScroll: 1,
          enableAutoplay: true,
          autoplayInterval: 3000,
          transitionDuration: 1000,
        },
        "(max-width: 768px)": {
          slidesToShow: 3,
        },
        "(max-width: 480px)": {
          slidesToShow: 1,
        },
      });

      const handlePrev = () => slider.prev();
      const handleNext = () => slider.next();

      prevButtonRef.current?.addEventListener("click", handlePrev);
      nextButtonRef.current?.addEventListener("click", handleNext);

      return () => {
        prevButtonRef.current?.removeEventListener("click", handlePrev);
        nextButtonRef.current?.removeEventListener("click", handleNext);
      };
    }
  }, []);

  return (
    <>
      <div className="blaze-slider mt-5 container-xxl" ref={sliderRef}>
        <div className="header d-flex justify-content-between">
          <div className="blaze-header">
            <div className="text-start">
              <h1 className="fs-4">Gerçek Müşteri yorumları</h1>
            </div>
            <FiveStar />
            <div className="comment-count m-2">
              <h4 className="text-decoration-underline">
                {dummyCommentsData.length} Yorum
              </h4>
            </div>
          </div>
          <div className="control-buttons d-flex align-items-center  column-gap-3">
            <div className="controls d-flex">
              <Button
                ref={prevButtonRef}
                className="blaze-prev btn bg-transparent"
              >
                <FaAngleLeft className="fs-3" />
              </Button>
              <Button
                ref={nextButtonRef}
                className="blaze-next btn bg-transparent"
              >
                <FaAngleRight className="fs-3" />
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div className="blaze-container mt-5">
          <div className="blaze-track-container">
            <div className="blaze-track">
              {dummyCommentsData.map((review, index) => (
                <CommentCard
                  key={index}
                  created_at={review.created_at}
                  title={review.title}
                  comment={review.comment}
                  stars={review.stars}
                  aroma={review.aroma}
                  first_name={review.first_name}
                  last_name={review.last_name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlazeSliderComponent;
