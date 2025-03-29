import { useToastStore } from "../../../store/toast/ToastStore";
import { PaymentData } from "../../../types/PaymentTypes";
import { createAxiosInstance } from "../axios";

export const handlePaymentSubmit = async (paymentData: PaymentData): Promise<PaymentResponse> => {
  try {
    const api = createAxiosInstance();
    console.log("Request Data:", JSON.stringify(paymentData, null, 2));

    const response = await api.post<PaymentResponse>('/orders/complete-shopping', paymentData);
    console.log("Response Data:", response.data);

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

