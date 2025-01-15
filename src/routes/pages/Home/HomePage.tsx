import BlazeSlider from "../../../assets/components/layout/BlazeSlider/BlazeSliderComponent";
import BestSeller from "../../../assets/components/layout/BestSeller/BestSeller";
import Header from "../../../assets/components/layout/header/Header";
import TwitchBanner from "../../../assets/components/layout/header/Figure";
import Categories from "../../../assets/components/layout/Categories/Categories";
import { useLoaderData } from "react-router-dom";

function HomePage() {
  const { products } = useLoaderData();

  return (
    <>
      <Header />
      <Categories />
      <BestSeller best_seller={products} />
      <TwitchBanner />
      <BlazeSlider />
    </>
  );
}

export default HomePage;
