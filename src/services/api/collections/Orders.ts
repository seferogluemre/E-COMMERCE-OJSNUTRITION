import axios from "axios";
import { BASE_URL, getAccessToken } from "./Auth";
import { Order, OrderDetail } from "../../../types/OrderTypes";


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
