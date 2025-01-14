import axios from "axios";
import { BASE_URL } from "../../../../services/api/products";

export async function loader() {
  const bestSellerResponse = await axios.get(
    BASE_URL + "/products/best-sellers"
  );
  console.log(bestSellerResponse.data.data);
  return { products: bestSellerResponse.data.data };
}
