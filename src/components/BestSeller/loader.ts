import axios from "axios";
import { BASE_URL } from "../../services/api/collections/Auth";

export async function loader() {
  const bestSellerResponse = await axios.get(
    BASE_URL + "/products/best-sellers"
  );
  return { products: bestSellerResponse.data.data };
}
