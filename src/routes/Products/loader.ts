import axios from "axios";
import { BASE_URL } from "./components/types";

export async function allProductLoader() {
  try {
    const response = await axios.get(BASE_URL + `/products/?offset=0&limit=12`);
    return { allProducts: response.data.data.results };
  } catch (error) {
    alert("Hata tespit edildi:" + (error as Error).message);
  }
}
