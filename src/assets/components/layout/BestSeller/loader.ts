import { base_url } from "./BestSeller";

export async function loader() {
  const bestSellerResponse = await fetch(base_url + "/products/best-sellers");
  const bestSellerData = await bestSellerResponse.json();
  return { products: bestSellerData.data };
}
