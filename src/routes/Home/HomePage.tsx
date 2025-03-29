import BlazeSlider from "./components/BlazeSlider/BlazeSliderComponent";
import BestSeller from "../../components/BestSeller/BestSeller";
import Header from "./components/Header/Header";
import TwitchBanner from "./components/Header/Figure";
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
