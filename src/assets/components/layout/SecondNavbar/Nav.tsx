import { Container } from "react-bootstrap";
import "./NavDropdown.scss";

function Nav() {
  return (
    <>
      <Container fluid className="m-0" style={{ height: "35px" }} id="Nav">
        <div className="container px-2">
          <div className="row px-2">
            <div className="col-4 d-flex column-gap-1 align-items-center justify-content-center">
              <img
                src="/src/assets/images/icons/cargoIcon.png"
                width={16}
                height={16}
                alt=""
              />
              <span>
                <strong>Aynı Gün kargo -</strong> 16:00'dan ÖNCEKİ SİPARİŞLERDE
              </span>
            </div>
            <div className="col-4 d-flex column-gap-1 align-items-center justify-content-center">
              <img
                src="/src/assets/images/icons/smileIcon.png"
                width={16}
                height={16}
                alt=""
              />
              <span>
                <strong>ÜCRETSİZ KARGO</strong> - 100 TL ÜZERİ SİPARİŞLERDE
              </span>
            </div>
            <div className="col-4 d-flex column-gap-1 align-items-center justify-content-center">
              <img
                src="/src/assets/images/icons/securityIShopcon.png"
                width={16}
                height={16}
                alt=""
              />
              <span>
                <strong>GÜVENLİ ALIŞVERİŞ</strong> - 1.000.000+ MUTLU MÜŞTERİ
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Nav;
