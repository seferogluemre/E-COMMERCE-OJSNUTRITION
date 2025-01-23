import { Card, Button } from "react-bootstrap";
import { PHOTO_URL } from "../../../../services/api/types";

function Orders() {
  return (
    <div className="content-area">
      <h3 className="mb-4">Siparişlerim (4)</h3>
      <Card className="mb-3">
        <Card.Body className="d-flex column-gap-5">
          <div className="">
            <img
              src={PHOTO_URL + "/media/b12vitamini_.webp"}
              className="img-fluid"
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="">
            <h5 className="text-success">Teslim Edildi</h5>
            <p>MELATONİN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN</p>
            <p>14 Aralık 2022 Tarihinde Sipariş Verildi</p>
            <p>290405 numaralı sipariş</p>
            <Button variant="link">Detay Görüntüle</Button>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body className="d-flex column-gap-5">
          <div className="">
            <img
              src={PHOTO_URL + "/media/b12vitamini_.webp"}
              className="img-fluid"
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="">
            <h5 className="text-success">Teslim Edildi</h5>
            <p>MELATONİN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN</p>
            <p>14 Aralık 2022 Tarihinde Sipariş Verildi</p>
            <p>290405 numaralı sipariş</p>
            <Button variant="link">Detay Görüntüle</Button>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body className="d-flex column-gap-5">
          <div className="">
            <img
              src={PHOTO_URL + "/media/b12vitamini_.webp"}
              className="img-fluid"
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="">
            <h5 className="text-success">Teslim Edildi</h5>
            <p>MELATONİN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN</p>
            <p>14 Aralık 2022 Tarihinde Sipariş Verildi</p>
            <p>290405 numaralı sipariş</p>
            <Button variant="link">Detay Görüntüle</Button>
          </div>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body className="d-flex column-gap-5">
          <div className="">
            <img
              src={PHOTO_URL + "/media/b12vitamini_.webp"}
              className="img-fluid"
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="">
            <h5 className="text-success">Teslim Edildi</h5>
            <p>MELATONİN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN</p>
            <p>14 Aralık 2022 Tarihinde Sipariş Verildi</p>
            <p>290405 numaralı sipariş</p>
            <Button variant="link">Detay Görüntüle</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Orders;
