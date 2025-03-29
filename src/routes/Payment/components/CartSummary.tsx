import React from "react";
import { Card, Image } from "react-bootstrap";
import { CartSummaryProps } from "../../../types/PaymentTypes";

const CartSummary: React.FC<CartSummaryProps> = ({ cartItems, totalAmount, photoUrl }) => {
    return (
        <Card>
            <Card.Body>
                <h5 className="mb-4">Sepet Özeti</h5>
                {cartItems.map((item) => (
                    <div key={item.id} className="mb-3 pb-3 border-bottom">
                        <div className="d-flex gap-3">
                            <Image
                                src={photoUrl + item.photo_src || "/placeholder.svg"}
                                alt={item.name}
                                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                rounded
                            />
                            <div>
                                <h6 className="mb-1">{item.name}</h6>
                                <p className="text-secondary small mb-1">{item.variant_name}</p>
                                <p className="text-secondary small mb-0">
                                    {item.pieces} adet x {item.price} TL
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="pt-3">
                    <div className="d-flex justify-content-between text-secondary small">
                        <span>Ara Toplam</span>
                        <span>{totalAmount.toFixed(2)} TL</span>
                    </div>
                    <div className="d-flex justify-content-between fw-bold mt-2">
                        <span>Toplam</span>
                        <span>{totalAmount.toFixed(2)} TL</span>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};

export default CartSummary;
