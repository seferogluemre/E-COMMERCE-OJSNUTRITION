import { Card, Button } from "react-bootstrap";
import { PHOTO_URL } from "../../Products/components/types";
import { useEffect, useState } from "react";
import { getOrderDetail, getOrders, Order, OrderDetail } from "../../../../services/api/collections/Orders";

// Interface güncellemeleri
interface Address {
  title: string;
  country: string;
  region: string;
  subregion: string;
  full_address: string;
  phone_number: string;
}

interface PaymentDetail {
  card_digits: string;
  card_expiration_date: string;
  card_security_code: string;
  payment_type: string;
  card_type: string;
  base_price: number;
  shipment_fee: number;
  payment_fee: number;
  discount_ratio: number;
  discount_amount: number;
  final_price: number;
}

interface ProductVariantDetail {
  size: {
    gram: number;
    pieces: number;
    total_services: number;
  };
  aroma: string;
  photo_src: string;
}

interface CartItem {
  product_id: string;
  product_slug: string;
  product_variant_id: string;
  product: string;
  product_variant_detail: ProductVariantDetail;
  pieces: number;
  unit_price: number;
  total_price: number;
}

interface ShoppingCart {
  total_price: number;
  items: CartItem[];
}

interface OrderDetail {
  order_no: string;
  order_status: string;
  shipment_tracking_number: string;
  address: Address;
  payment_detail: PaymentDetail;
  shopping_cart: ShoppingCart;
}

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrders();
        setOrders(response || []);
      } catch (error) {
        console.error("Orders fetching failed:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetail = async (orderNo: string) => {
    try {
      setLoading(true);
      const response = await getOrderDetail(orderNo);
      console.log(response);
      setOrderDetail(response);
      setSelectedOrder(orderNo);
    } catch (error) {
      console.error("Order detail fetching failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (selectedOrder && orderDetail) {
    return (
      <div className="content-area">
        <Button 
          variant="link" 
          className="d-flex align-items-center mb-4"
          onClick={() => {
            setSelectedOrder(null);
            setOrderDetail(null);
          }}
        >
          <i className="bi bi-arrow-left me-2"></i> Tüm siparişlerim
        </Button>

        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h5>Sipariş No: {orderDetail.order_no}</h5>
                <h5 className={`text-${getStatusColor(orderDetail.order_status)}`}>
                  {getStatusText(orderDetail.order_status)}
                </h5>
              </div>
            </div>

            <div className="border-bottom pb-4 mb-4">
              {orderDetail.shopping_cart.items.map((item) => (
                <div key={item.product_variant_id} className="d-flex column-gap-4 mb-3">
                  <div>
                    <img
                      src={PHOTO_URL + item.product_variant_detail.photo_src}
                      className="img-fluid"
                      width={100}
                      height={100}
                      alt={item.product}
                    />
                  </div>
                  <div>
                    <h6>{item.product}</h6>
                    <p className="mb-1">Aroma: {item.product_variant_detail.aroma}</p>
                    <p className="mb-1">Miktar: {item.product_variant_detail.size.gram}g</p>
                    <p className="mb-1">Adet: {item.pieces}</p>
                    <p className="mb-1">Birim Fiyat: ₺{item.unit_price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                    <p className="mb-1">Toplam: ₺{item.total_price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              <div className="col-md-6">
                <h6>Teslimat Adresi</h6>
                <p className="fw-bold mb-1">{orderDetail.address.title}</p>
                <p className="mb-1">{orderDetail.address.full_address}</p>
                <p className="mb-1">{orderDetail.address.subregion}, {orderDetail.address.region}</p>
                <p className="mb-1">{orderDetail.address.country}</p>
                <p className="mb-1">Tel: {orderDetail.address.phone_number}</p>
              </div>
              <div className="col-md-6">
                <h6>Ödeme Bilgileri</h6>
                <p className="mb-1">Kart Tipi: {orderDetail.payment_detail.card_type}</p>
                <p className="mb-1">Kart No: **** **** **** {orderDetail.payment_detail.card_digits.slice(-4)}</p>
                <p className="mb-1">Son Kullanma: {orderDetail.payment_detail.card_expiration_date}</p>
                <div className="mt-3">
                  <p className="mb-1">Ara Toplam: ₺{orderDetail.payment_detail.base_price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                  {orderDetail.payment_detail.shipment_fee > 0 && (
                    <p className="mb-1">Kargo Ücreti: ₺{orderDetail.payment_detail.shipment_fee.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                  )}
                  {orderDetail.payment_detail.discount_amount > 0 && (
                    <p className="mb-1">İndirim: ₺{orderDetail.payment_detail.discount_amount.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} (%{orderDetail.payment_detail.discount_ratio})</p>
                  )}
                  <p className="fw-bold mb-1">Toplam: ₺{orderDetail.payment_detail.final_price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>

            {orderDetail.shipment_tracking_number && (
              <div className="mt-4">
                <h6>Kargo Takip</h6>
                <p>Takip No: {orderDetail.shipment_tracking_number}</p>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  }

  const orderCount = orders?.length || 0;

  return (
    <div className="content-area">
      <h3 className="mb-4">Siparişlerim ({orderCount})</h3>
      {orders.map((order) => (
        <Card key={order.order_no} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5 className="text-success">{order.order_status=="delivered"?"Teslim Edildi":"Sipariş Alındı"}</h5>
              <h6>Toplam: ₺{order.total_price.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}</h6>
            </div>
            {order.cart_detail.map((item) => (
              <div key={item.variant_id} className="d-flex column-gap-4 mb-3">
                <div>
                  <img
                    src={PHOTO_URL + item.photo_src}
                    className="img-fluid"
                    width={100}
                    height={100}
                    alt={item.name}
                  />
                </div>
                <div>
                  <h6>{item.name}</h6>
                  <p className="mb-1">Adet: {item.pieces}</p>
                  <p className="mb-1">Birim Fiyat: ₺{item.unit_price}</p>
                </div>
              </div>
            ))}
            <div className="border-top pt-2">
              <p className="mb-1">Sipariş No: {order.order_no}</p>
              <p className="mb-1">
                Sipariş Tarihi: {new Date(order.created_at).toLocaleDateString('tr-TR')}
              </p>
              <Button 
                variant="link" 
                className="p-0"
                onClick={() => handleViewDetail(order.order_no)}
              >
                Detay Görüntüle
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

// Sipariş durumuna göre renk belirleme
const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'success';
    case 'in_cargo':
      return 'info';
    case 'getting_ready':
      return 'warning';
    default:
      return 'primary';
  }
};

// Sipariş durumunu Türkçe metne çevirme
const getStatusText = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'Teslim Edildi';
    case 'in_cargo':
      return 'Kargoda';
    case 'getting_ready':
      return 'Hazırlanıyor';
    default:
      return 'Sipariş Alındı';
  }
};

export default Orders;
