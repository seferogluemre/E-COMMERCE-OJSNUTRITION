import { Card, Button, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getOrderDetail, getOrders, Order, OrderDetail } from "../../../services/api/collections/Orders";
import { addProductComment } from "../../../services/api/collections/Products";
import { useToastStore } from "../../../store/toast/ToastStore";
import { PHOTO_URL } from "../../../services/api/collections/Auth";

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ slug: string, name: string } | null>(null);
  const [commentForm, setCommentForm] = useState({
    stars: 5,
    title: '',
    comment: ''
  });
  const [submitting, setSubmitting] = useState<boolean>(false);

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
      console.log(response);
      setSelectedOrder(orderNo);
    } catch (error) {
      console.error("Order detail fetching failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCommentModal = (slug: string, name: string) => {
    setSelectedProduct({ slug, name });
    setShowCommentModal(true);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    // Form validation
    if (!commentForm.stars || !commentForm.title.trim() || !commentForm.comment.trim()) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }

    try {
      setSubmitting(true);
      const commentData = {
        stars: Number(commentForm.stars), // Make sure stars is a number
        title: commentForm.title.trim(),
        comment: commentForm.comment.trim()
      };

      await addProductComment(selectedProduct.slug, commentData);
      setShowCommentModal(false);
      // Reset form
      setCommentForm({ stars: 5, title: '', comment: '' });
      useToastStore.getState().showToast("Geri bildiriminiz için teşekkür ederiz", "success");
    } catch (error: any) {
      console.error('Error submitting comment:', error);
      if (error.response?.data?.reason) {
        const errors = error.response.data.reason;
        let errorMessage = 'Lütfen aşağıdaki hataları düzeltin:\n';
        if (errors.stars) errorMessage += '- Yıldız seçimi zorunludur\n';
        if (errors.title) errorMessage += '- Başlık alanı zorunludur\n';
        if (errors.comment) errorMessage += '- Yorum alanı zorunludur\n';
        alert(errorMessage);
      } else {
        alert('Yorum eklenirken bir hata oluştu.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }
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
                  <div className="text-center">
                    <img
                      src={PHOTO_URL + item.product_variant_detail.photo_src}
                      className="img-fluid mb-2"
                      width={100}
                      height={100}
                      alt={item.product}
                    />
                    <div>
                      <Button
                        variant="link"
                        className="p-0 text-decoration-none"
                        onClick={() => handleOpenCommentModal(item.product_slug, item.product)}
                      >
                        <i className="bi bi-chat-left-text me-1"></i>
                        Yorum Ekle
                      </Button>
                    </div>
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

        <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.name} için Yorum Ekle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Puanınız <span className="text-danger">*</span></Form.Label>
                <div className="d-flex gap-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant={commentForm.stars >= star ? 'warning' : 'outline-warning'}
                      onClick={() => setCommentForm(prev => ({ ...prev, stars: star }))}
                      type="button"
                    >
                      <i className="bi bi-star-fill"></i>
                    </Button>
                  ))}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Başlık <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Yorumunuz için başlık girin"
                  value={commentForm.title}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Yorum <span className="text-danger">*</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ürün hakkında düşüncelerinizi yazın"
                  value={commentForm.comment}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, comment: e.target.value }))}
                  required
                />
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
                  İptal
                </Button>
                <Button type="submit" variant="primary" disabled={submitting}>
                  {submitting ? 'Gönderiliyor...' : 'Gönder'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }

  const orderCount = orders?.length || 0;

  return (
    <div className="content-area">
      <h3 className="mb-4">Siparişlerim ({orderCount})</h3>
      {orders.map((order) => (
        <Card key={order.order_no} className="mb-3  rounded" id="order-container">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h5 className="text-success">{order.order_status == "delivered" ? "Teslim Edildi" : "Sipariş Alındı"}</h5>
            </div>
            {order.cart_detail.slice(0, 1).map((item) => (
              <div key={item.product_variant_id} className="mb-3">
                <div className="d-flex flex-row  justify-content-between align-items-center">
                  <div className="left d-flex flex-row column-gap-4 align-items-center">
                    <img
                      src={PHOTO_URL + item.photo_src}
                      className="img-fluid"
                      width={100}
                      height={100}
                      alt={item.name}
                    />
                    <div className="detail">
                      <p className="mb-1">{order.cart_detail.map((item) => (item.name))}</p>
                      <p className="mb-1">Sipariş No: {order.order_no}</p>
                      <p className="mb-1">
                        Sipariş Tarihi: {new Date(order.created_at).toLocaleDateString('tr-TR')}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-2b btn  btn-outline-dark border-1"
                    onClick={() => handleViewDetail(order.order_no)}
                  >
                    Detay Görüntüle
                  </button>
                </div>

              </div>
            ))}


          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Orders;