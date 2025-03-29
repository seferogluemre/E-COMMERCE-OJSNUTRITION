import axios from "axios";
import { LoaderFunctionArgs } from "react-router-dom";
import { BASE_URL } from "../../services/api/collections/Auth";
import { BestSellerProps, Product } from "../../types/ProductTypes";

export async function ProductDetailLoader({
  params,
}: LoaderFunctionArgs): Promise<{
  product: Product;
  bestSeller: BestSellerProps[];
} | void> {
  try {
    const response = await axios.get(
      BASE_URL + `/products/${params.productSlug}`
    );
    const bestSellerResponse = await axios.get(
      BASE_URL + "/products/best-sellers"
    );
    return {
      product: response.data.data,
      bestSeller: bestSellerResponse.data.data,
    };
  } catch (error) {
    alert("ürün detay hatası" + error);
  }
}
