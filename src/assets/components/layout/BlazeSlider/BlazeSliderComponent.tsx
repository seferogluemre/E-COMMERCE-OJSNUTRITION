import BlazeSlider from "blaze-slider";
import "blaze-slider/dist/blaze.css";
import { useEffect, useRef } from "react";

const BlazeSliderComponent = () => {
  const sliderRef = useRef(null);

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
          slidesToShow: 2,
        },
      });
      const prevButton = document.querySelector(".blaze-prev");
      const nextButton = document.querySelector(".blaze-next");
      if (prevButton) {
        prevButton.addEventListener("click", () => slider.prev());
      }
      if (nextButton) {
        nextButton.addEventListener("click", () => slider.next());
      }
    }
  }, []);

  return (
    <>
      <div className="blaze-slider">
        <div className="blaze-container">
          <div className="blaze-track-container">
            <div className="blaze-track">
              <div>YORUM 1</div>
              <div>YORUM 2</div>
              <div>YORUM 3</div>
              <div>YORUM 4</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlazeSliderComponent;
