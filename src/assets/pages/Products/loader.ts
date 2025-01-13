import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";
import { BASE_URL } from "../../../services/api/products";

export async function allProductLoader(page: LoaderFunctionArgs | number = 1) {
  try {
    const response = await axios.get(BASE_URL + `/products?offset=0&limit=12`);
    return { allProducts: response.data };
  } catch (error) {
    alert("Hata tespit edildi:" + (error as Error).message);
  }
}
