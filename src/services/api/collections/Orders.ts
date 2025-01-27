import axios from "axios";
import { BASE_URL } from "../../../routes/pages/Products/components/types";
import { getAccessToken } from "./storage";

export interface Order {
  id: string;
  status: string;
  products: string;
  orderDate: string;
  orderNumber: string;
  photo_src: string;
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

export interface OrderDetail {
  order_no: string;
  order_status: string;
  created_at: string;
  total_price: number;
  cart_detail: {
    variant_id: string;
    name: string;
    photo_src: string;
    pieces: string;
    unit_price: string;
    total_price: string;
    slug: string;
  }[];
  shipping_address?: string;
  payment_method?: string;
  tracking_number?: string;
}

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
