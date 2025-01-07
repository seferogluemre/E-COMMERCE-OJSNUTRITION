import { Container } from "react-bootstrap";
import BestSeller from "../../components/layout/BestSeller/BestSeller";
import BlazeSliderComponent from "../../components/layout/BlazeSlider/BlazeSliderComponent";

function HomePage() {
  return (
    <>
      <Container>
        <BestSeller /> x
        <BlazeSliderComponent />
      </Container>
    </>
  );
}

export default HomePage;
