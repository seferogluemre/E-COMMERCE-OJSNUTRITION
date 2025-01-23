import axios from "axios";
import { BASE_URL } from "../../../routes/pages/Products/components/types";

export interface Order {
  id: string;
  status: string;
  products: string;
  orderDate: string;
  orderNumber: string;
  imageUrl: string;
}

export const getOrders = async (): Promise<Order[]> => {
  const response = await axios.get(`${BASE_URL}/orders`);
  return response.data;
};
