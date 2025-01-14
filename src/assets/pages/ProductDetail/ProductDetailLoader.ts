import axios from "axios";
import { BASE_URL } from "../../../services/api/products";
import { LoaderFunctionArgs } from "react-router-dom";

export async function ProductDetailLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await axios.get(
      BASE_URL + `/products/${params.productSlug}`
    );
    console.log(response.data.data);
    const bestSellerResponse = await axios.get(
      BASE_URL + "/products/best-sellers"
    );
    console.log(response.data.data);
    return {
      product: response.data.data,
      bestSeller: bestSellerResponse.data.data,
    };
  } catch (error) {
    alert("ürün detay hatası" + error);
  }
}
