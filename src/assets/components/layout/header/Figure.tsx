import styled from "styled-components";

const StyledBanner = styled.img`
  width: 100%;
  height: 450px;
  margin-top: 100px;
  object-fit: cover; /* Görseli orantılı şekilde kırp ve alanı doldur */

  @media (max-width: 768px) {
    margin-top: 0;
    height: 520px;
    object-fit: cover;
    object-position: 84% 50%; /* Fotoğrafın tam ortanın hafif sağını almasını sağlar */
  }
`;

function TwitchBanner() {
  return (
    <>
      <div className="figure-container">
        <StyledBanner
          src="/public/assets/TwitchBanner.png"
          className="img-fluid "
          alt="Twitch Banner Fotograf"
        />
      </div>
    </>
  );
}

export default TwitchBanner;
