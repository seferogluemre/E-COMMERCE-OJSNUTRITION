import { Card, Button } from "react-bootstrap";

function Orders() {
  return (
    <div className="content-area">
      <h3 className="mb-4">Siparişlerim (4)</h3>
      <Card className="mb-3">
        <Card.Body>
          <h5>Teslim Edildi</h5>
          <p>DEEP SLEEP</p>
          <p>31 Mart 2023 Tarihinde Sipariş Verildi</p>
          <p>427795 numaralı sipariş</p>
          <Button variant="link">Detay Görüntüle</Button>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5>Teslim Edildi</h5>
          <p>MELATONİN - GÜNLÜK VİTAMİN PAKETİ - BROMELAIN</p>
          <p>14 Aralık 2022 Tarihinde Sipariş Verildi</p>
          <p>290405 numaralı sipariş</p>
          <Button variant="link">Detay Görüntüle</Button>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5>Teslim Edildi</h5>
          <p>GAMER HACK - DETOX PAKETİ</p>
          <p>19 Kasım 2022 Tarihinde Sipariş Verildi</p>
          <p>255564 numaralı sipariş</p>
          <Button variant="link">Detay Görüntüle</Button>
        </Card.Body>
      </Card>
      <Card className="mb-3">
        <Card.Body>
          <h5>Teslim Edildi</h5>
          <p>CREAM OF RICE</p>
          <p>1 Ekim 2022 Tarihinde Sipariş Verildi</p>
          <p>190462 numaralı sipariş</p>
          <Button variant="link">Detay Görüntüle</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Orders;
