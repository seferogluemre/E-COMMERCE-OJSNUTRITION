import BlazeSlider from "../../components/layout/BlazeSlider/BlazeSliderComponent";
import BestSeller from "../../components/layout/BestSeller/BestSeller";
import Header from "../../components/layout/header/Header";
import TwitchBanner from "../../components/layout/header/Figure";
import Categories from "../../components/layout/Categories/Categories";

function HomePage() {
  return (
    <>
      <Header />
      <Categories />
      <BestSeller />
      <TwitchBanner />
      <BlazeSlider />
    </>
  );
}

export default HomePage;
