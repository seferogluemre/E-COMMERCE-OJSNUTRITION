import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";
import { useEffect, useRef } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import './BlazeSlider.scss'
import FiveStar from "../../FiveStars/FiveStar";
import { Button } from "react-bootstrap";

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
          transitionDuration: 300,
        },
        "(max-width: 768px)": {
          slidesToShow: 4,
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
        <div className="blaze-container mt-5">
          <div className="blaze-track-container">
            <div className="blaze-track">
              <div>YORUM 3</div>
              <div>YORUM 2</div>
              <div>YORUM 3</div>
              <div>YORUM 4</div>
              <div>YORUM 5</div>
              <div>YORUM 6</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlazeSliderComponent;
