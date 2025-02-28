import { useToastStore } from "../../../store/toast/ToastStore";
import { createAxiosInstance } from "../axios";

export type PaymentType = 'credit_cart';

export interface PaymentData {
  address_id: string;
  payment_type: PaymentType;
  card_digits: string;
  card_expiration_date: string;
  card_security_code: string;
  card_type: string;
}

interface PaymentResponse {
  status: string;
  data: {
    order_no: string;
  };
}

export const handlePaymentSubmit = async (paymentData: PaymentData): Promise<PaymentResponse> => {
  try {
    const api = createAxiosInstance();
    console.log("Request Data:", JSON.stringify(paymentData, null, 2)); // Request data'yı yazdır

    const response = await api.post<PaymentResponse>('/orders/complete-shopping', paymentData);
    console.log("Response Data:", response.data); // Response data'yı yazdır

    useToastStore.getState().showToast("Ödeme başarılı bir şekilde tamamlandı", "success");
    return response.data;
  } catch (error: any) {

    const errorMessage = error.response?.data?.reason?.payment_type?.[0] ||
      error.response?.data?.detail ||
      error.response?.data?.message ||
      "Ödeme işlemi sırasında bir hata oluştu";

    useToastStore.getState().showToast(errorMessage, "error");
    throw error;
  }
};

