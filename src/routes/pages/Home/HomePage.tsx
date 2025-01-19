import BlazeSlider from "./components/BlazeSlider/BlazeSliderComponent";
import BestSeller from "../../../assets/components/layout/BestSeller/BestSeller";
import Header from "./components/header/Header";
import TwitchBanner from "./components/header/Figure";
import Categories from "./components/Categories/Categories";
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
