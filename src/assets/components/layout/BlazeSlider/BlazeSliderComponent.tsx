import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";
import { useEffect, useRef } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import './BlazeSlider.scss'

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
      <div className="blaze-slider mt-5" ref={sliderRef}>
        <div className="control-buttons">
          <button ref={prevButtonRef} className="blaze-prev ">
            <FaChevronCircleLeft />
          </button>
          <button ref={nextButtonRef} className="blaze-next ">
            <FaChevronCircleRight />
          </button>
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
