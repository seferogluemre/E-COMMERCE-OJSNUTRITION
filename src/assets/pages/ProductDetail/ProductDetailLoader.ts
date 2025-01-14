import axios from "axios";
import { BASE_URL } from "../../../services/api/products";
import { LoaderFunctionArgs } from "react-router-dom";

export async function ProductDetailLoader({ params }: LoaderFunctionArgs) {
  try {
    const response = await axios.get(
      BASE_URL + `/products/${params.productSlug}`
    );
    console.log(response.data.data);
    return { product: response.data.data };
  } catch (error) {
    alert("ürün detay hatası" + error);
  }
}
