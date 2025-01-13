import { BASE_URL } from "../../../../services/api/products";

export async function loader() {
  const bestSellerResponse = await fetch(BASE_URL + "/products/best-sellers");
  const bestSellerData = await bestSellerResponse.json();
  return { products: bestSellerData.data };
}
