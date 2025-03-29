import { useNavigate } from "react-router-dom";
import { City, District, UserAddress } from "./AccountType";

export interface StepIndicatorProps {
    stepNumber: number;
    title: string;
    isActive: boolean;
    isClickable: boolean;
    onClick: () => void;
}
export interface SuccessScreenProps {
    navigate: ReturnType<typeof useNavigate>;
}

export interface ShippingStepProps {
    selectedAddress: UserAddress | null;
}

export interface PaymentStepProps {
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    paymentSuccess: boolean;
    setPaymentSuccess: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAddress: UserAddress | null;
    clearCart: () => void;
    navigate: ReturnType<typeof useNavigate>;
}

export interface PaymentFormProps {
    onSubmit: (cardInfo: {
        cardNumber: string;
        expirationDate: string;
        cvv: string;
        cardHolderName: string;
    }) => void;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    pieces?: number;
    photo_src?: string;
    variant_name?: string;
}

export interface CartSummaryProps {
    cartItems: CartItem[];
    totalAmount: number;
    photoUrl: string;
}

export interface AddressStepProps {
    isLoggedIn: boolean;
    userAddresses: UserAddress[];
    selectedAddress: UserAddress | null;
    setSelectedAddress: (address: UserAddress) => void;
    fetchUserAddresses: () => Promise<void>;
}

export interface AddressFormProps {
    formData: UserAddress;
    setFormData: React.Dispatch<React.SetStateAction<UserAddress>>;
    selectedCity: string;
    setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
    cities: City[];
    districts: District[];
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    onCancel: () => void;
    title: string;
    submitButtonText?: string;
}

export type PaymentType = 'credit_cart';

export interface PaymentData {
    address_id: string;
    payment_type: PaymentType;
    card_digits: string;
    card_expiration_date: string;
    card_security_code: string;
    card_type: string;
}

export interface PaymentResponse {
    status: string;
    data: {
        order_no: string;
    };
}
