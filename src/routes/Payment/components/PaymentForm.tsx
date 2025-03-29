import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { PaymentFormProps } from "../../../types/PaymentTypes";

const PaymentForm: React.FC<PaymentFormProps> = ({ onSubmit }) => {
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        cardHolderName: "",
    });

    const formatCardNumber = (value: string) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "");
        // Limit to 16 digits
        const limitedDigits = digits.slice(0, 16);
        // Add spaces after every 4 digits
        return limitedDigits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    };

    const formatExpirationDate = (value: string) => {
        // Remove all non-digits
        const digits = value.replace(/\D/g, "");
        // Limit to 4 digits
        const limitedDigits = digits.slice(0, 4);
        // Add slash after first 2 digits if we have more than 2
        if (limitedDigits.length > 2) {
            return `${limitedDigits.slice(0, 2)}-${limitedDigits.slice(2)}`;
        }
        return limitedDigits;
    };

    const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        let formattedValue = value;

        if (name === "cardNumber") {
            formattedValue = formatCardNumber(value);
        } else if (name === "expirationDate") {
            formattedValue = formatExpirationDate(value);
        } else if (name === "cvv") {
            // Only allow digits and limit to 3 characters
            formattedValue = value.replace(/\D/g, "").slice(0, 3);
        }

        setCardInfo((prev) => ({
            ...prev,
            [name]: formattedValue,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(cardInfo);
    };

    const isFormValid =
        cardInfo.cardNumber.replace(/\s/g, "").length === 16 &&
        cardInfo.expirationDate.length === 5 &&
        cardInfo.cvv.length === 3 &&
        cardInfo.cardHolderName.trim() !== "";

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Kart Üzerindeki İsim</Form.Label>
                <Form.Control
                    type="text"
                    name="cardHolderName"
                    value={cardInfo.cardHolderName}
                    onChange={handleCardInputChange}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Kart Numarası</Form.Label>
                <Form.Control
                    type="text"
                    name="cardNumber"
                    value={cardInfo.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="0000 0000 0000 0000"
                    required
                />
            </Form.Group>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Son Kullanma Tarihi</Form.Label>
                        <Form.Control
                            type="text"
                            name="expirationDate"
                            value={cardInfo.expirationDate}
                            onChange={handleCardInputChange}
                            placeholder="MM-YY"
                            required
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            type="text"
                            name="cvv"
                            value={cardInfo.cvv}
                            onChange={handleCardInputChange}
                            placeholder="000"
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>

            <Button
                id="payment-submit-button"
                variant="dark"
                className="w-100 py-2 icon-link-hover"
                type="submit"
                disabled={!isFormValid}
            >
                Ödeme Yap
            </Button>
        </Form>
    );
};

export default PaymentForm;