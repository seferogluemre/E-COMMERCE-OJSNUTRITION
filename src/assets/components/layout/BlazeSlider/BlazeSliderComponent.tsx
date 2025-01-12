import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";
import { useEffect, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import './BlazeSlider.scss'
import FiveStar from "../FiveStars/FiveStar";
import { Button } from "react-bootstrap";
import CommentCard from "../CommentCard/CommentCard";

export interface ReviewsProps {
  stars: string,
  comment: string,
  title: string,
  created_at: string,
  aroma: string,
  first_name: string,
  last_name: string
}

const BlazeSliderComponent = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const dummyCommentsData: ReviewsProps[] = [
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "İsmet",
      last_name: "Tarık",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "Ahmet",
      last_name: "Yılmaz",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "İsmet",
      last_name: "Tarık",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "Ahmet",
      last_name: "Yılmaz",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "Osman",
      last_name: "Çetin",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "Kadir",
      last_name: "Toprak",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "Ahmet",
      last_name: "Yılmaz",
    },
    {
      stars: "5",
      comment: "Harika bir ürün, kesinlikle tavsiye ederim.",
      title: "Mükemmel",
      created_at: "2024-11-01",
      aroma: "Tatlı ve ferah",
      first_name: "Ahmet",
      last_name: "Yılmaz",
    },
  ]



  useEffect(() => {
    if (sliderRef.current) {
      const slider = new BlazeSlider(sliderRef.current, {
        all: {
          slidesToShow: 4,
          slidesToScroll: 1,
          enableAutoplay: true,
          autoplayInterval: 4000,
          transitionDuration: 300,
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
          </div>
          <div className="control-buttons d-flex align-items-center column-gap-3">
            <FiveStar />
            <div className="controls">
              <Button ref={prevButtonRef} className="blaze-prev">
                <FaAngleLeft className="fs-3" />
              </Button>
              <Button ref={nextButtonRef} className="blaze-next">
                <FaAngleRight className="fs-3" />
              </Button>
            </div>
          </div>
        </div>
        <hr />
        <div className="blaze-container mt-5">
          <div className="blaze-track-container">
            <div className="blaze-track">
              {
                dummyCommentsData.map((review) => (
                  <CommentCard
                    created_at={review.created_at}
                    title={review.title}
                    comment={review.comment}
                    stars={review.stars}
                    aroma={review.aroma}
                    first_name={review.first_name}
                    last_name={review.last_name}
                  />
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlazeSliderComponent;
