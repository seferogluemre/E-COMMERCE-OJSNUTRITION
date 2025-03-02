import axios from "axios";
import { getAccessToken } from "./storage";
import { CartItem } from "../../../store/products/Cart";
import { BASE_URL } from "./Auth";

export interface Order {
  order_no: string;
  order_status: string;
  total_price: number;
  cart_detail: CartItem[];
  created_at: string;
}

export interface OrderDetail {
  order_no: string;
  order_status: string;
  shipment_tracking_number: string;
  address: {
    title: string;
    country: string;
    region: string;
    subregion: string;
    full_address: string;
    phone_number: string;
  };
  payment_detail: {
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
  };
  shopping_cart: {
    total_price: number;
    items: {
      product_id: string;
      product_slug: string;
      product_variant_id: string;
      product: string;
      product_variant_detail: {
        size: {
          gram: number;
          pieces: number;
          total_services: number;
        };
        aroma: string;
        photo_src: string;
      };
      pieces: number;
      unit_price: number;
      total_price: number;
    }[];
  };
}


export const getOrders = async (): Promise<Order[]> => {
  try {
    const token = getAccessToken();
    const response = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const getOrderDetail = async (orderNo: string): Promise<OrderDetail> => {
  try {
    const token = getAccessToken();
    const response = await axios.get(`${BASE_URL}/orders/${orderNo}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching order detail:', error);
    throw error;
  }
};
