import axios from "axios";
import { BASE_URL } from "../../../routes/pages/Products/components/types";
import { getAccessToken } from "./storage";

export const addProductComment = async (productSlug: string, data: {
  stars: number;
  title: string;
  comment: string;
}) => {
  try {
    const token = getAccessToken();
    const response = await axios.post(`${BASE_URL}/products/${productSlug}/comments`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
}; 