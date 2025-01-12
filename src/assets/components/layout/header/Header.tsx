import styled from "styled-components";

const StyledImage = styled.img`
  @media (max-width: 576px) {
    object-position: 50% 100%;
    object-fit: cover;
    width: 100%;
    height: 260px !important;
  }
`;

function Header() {
  return (
    <>
      <div className="container-fluid mx-0 p-0 h-75">
        <div className="row mx-0 px-0">
          <StyledImage
            src="/src/assets/images/sliderImages/banner.jpeg"
            className="img-fluid px-0"
          />
        </div>
      </div>
    </>
  );
}

export default Header;
