import styled from "styled-components";

const StyledBanner = styled.img`
  width: 100%;
  height: 400px;
  margin-top: 100px;

  @media (max-width: 768px) {
    margin-top: 0;
    height: 500px;
  }
`;

function TwitchBanner() {
  return (
    <>
      <StyledBanner
        src="/src/assets/images/TwitchBanner.png"
        className="img-fluid w-100"
        alt="Twitch Banner Fotograf"
      />
    </>
  );
}

export default TwitchBanner;
