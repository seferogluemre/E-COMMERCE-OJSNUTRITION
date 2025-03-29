import { type PaymentData, handlePaymentSubmit } from "../../../services/api/collections/Payment";
import SuccessScreen from "./SuccessScreen";
import PaymentForm from "./PaymentForm";
import { PaymentStepProps } from "../../../types/PaymentTypes";

const PaymentStep: React.FC<PaymentStepProps> = ({
    isLoading,
    setIsLoading,
    paymentSuccess,
    setPaymentSuccess,
    selectedAddress,
    clearCart,
    navigate,
}) => {
    const handleSubmitPayment = async () => {
        if (!selectedAddress?.id) return;
        setIsLoading(true);
        try {

            const paymentData: PaymentData = {
                address_id: selectedAddress.id,
                payment_type: "credit_cart",
                card_digits: "1234567891234567",
                card_expiration_date: "06-25",
                card_security_code: "123",
                card_type: "VISA",
            };

            console.log("Sending payment data:", paymentData);

            try {
                const response = await handlePaymentSubmit(paymentData);

                if (response.status === "success") {
                    setPaymentSuccess(true);
                    clearCart();
                    setTimeout(() => navigate("/"), 3800);
                }
            } catch (error: any) {
                console.error("Payment failed:", error);
                // Log more detailed error information if available
                if (error.response) {
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                }
                setPaymentSuccess(false);
            }
        } catch (error) {
            console.error("Payment preparation failed:", error);
            setPaymentSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Ödemeniz işleniyor...</p>
            </div>
        );
    }

    if (paymentSuccess) {
        return <SuccessScreen navigate={navigate} />;
    }

    return (
        <div className="mt-4">
            <PaymentForm onSubmit={handleSubmitPayment} />
        </div>
    );
};

export default PaymentStep;