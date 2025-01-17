import { Table, Badge } from "react-bootstrap";

function Orders() {
  return (
    <div className="content-area">
      <h3 className="mb-4">Siparişlerim</h3>
      <Table responsive>
        <thead>
          <tr>
            <th>Sipariş No</th>
            <th>Tarih</th>
            <th>Tutar</th>
            <th>Durum</th>
            <th>Detay</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>#12345</td>
            <td>01.03.2024</td>
            <td>1.250 TL</td>
            <td>
              <Badge bg="success">Teslim Edildi</Badge>
            </td>
            <td>
              <a href="#" className="text-decoration-none">
                Detaylar
              </a>
            </td>
          </tr>
          <tr>
            <td>#12346</td>
            <td>28.02.2024</td>
            <td>750 TL</td>
            <td>
              <Badge bg="warning" text="dark" className="w-50">
                Kargoda
              </Badge>
            </td>
            <td>
              <a href="#" className="text-decoration-none">
                Detaylar
              </a>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default Orders;
