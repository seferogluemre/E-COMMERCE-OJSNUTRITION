import { Container } from "react-bootstrap";
import BestSeller from "../../components/layout/BestSeller/BestSeller";
import BlazeSlider from "../../components/layout/BlazeSlider/BlazeSliderComponent";

function HomePage() {
  return (
    <>
      <Container>
        <BestSeller />
        <BlazeSlider />
      </Container>
    </>
  );
}

export default HomePage;
