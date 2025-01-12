import styled from "styled-components";

const StyledImage = styled.img`
  width: 390px;
  height: 400px;
  object-fit: cover;
  box-sizing: content-box;

  @media (min-width: 768px) {
    width: auto;
    height: auto;
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
