import { Container } from "react-bootstrap";

function ProductTrust() {
  return (
    <>
      <Container className="mt-5">
        <div className="row px-2">
          <div className="col-lg-4 col-sm-6 d-flex column-gap-1 align-items-center justify-content-start">
            <img
              src="/src/assets/images/icons/cargoIcon.png"
              width={16}
              height={16}
              alt=""
            />
            <span>
              <strong>Aynı Gün kargo ücretsiz </strong>
            </span>
          </div>
          <div className="col-lg-4 col-sm-6 d-flex column-gap-1 align-items-center justify-content-start">
            <img
              src="/src/assets/images/icons/smileIcon.png"
              width={16}
              height={16}
              alt=""
            />
            <span>750.000+ Mutlu müşteri</span>
          </div>
          <div className="col-lg-4 col-sm-6 d-flex column-gap-1 align-items-center justify-content-start">
            <img
              src="/src/assets/images/icons/securityIShopcon.png"
              width={16}
              height={16}
              alt=""
            />
            <span>Memnuniyet garantisi</span>
          </div>
        </div>
      </Container>
    </>
  );
}

export default ProductTrust;
