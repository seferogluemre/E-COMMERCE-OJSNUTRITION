import BlazeSlider from "../../components/layout/BlazeSlider/BlazeSliderComponent";
import BestSeller from "../../components/layout/BestSeller/BestSeller";
import Header from "../../components/layout/header/Header";
import TwitchBanner from "../../components/layout/header/Figure";
import Categories from "../../components/layout/Categories/Categories";
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
