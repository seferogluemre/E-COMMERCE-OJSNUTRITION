import { Card, Button } from "react-bootstrap";
import { PHOTO_URL } from "../../Products/components/types";
import { useEffect, useState } from "react";
import { getOrders, Order } from "../../../../services/api/collections/Orders";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Orders fetching failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="content-area">
      <h3 className="mb-4">Siparişlerim ({orders.length})</h3>
      {orders.map((order) => (
        <Card key={order.id} className="mb-3">
          <Card.Body className="d-flex column-gap-5">
            <div className="">
              <img
                src={PHOTO_URL + order.imageUrl}
                className="img-fluid"
                width={100}
                height={100}
                alt=""
              />
            </div>
            <div className="">
              <h5 className="text-success">{order.status}</h5>
              <p>{order.products}</p>
              <p>{order.orderDate} Tarihinde Sipariş Verildi</p>
              <p>{order.orderNumber} numaralı sipariş</p>
              <Button variant="link">Detay Görüntüle</Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Orders;
