import axios from "axios";
import { BASE_URL } from "../../services/api/collections/Auth";
import { LoaderFunctionArgs } from "react-router-dom";

export async function CategoryProductsLoaader({ params }: LoaderFunctionArgs) {
    const bestSellerResponse = await axios.get(
        BASE_URL + `/products/?main_category=${params.main_category}`
    );
    return { category_products: bestSellerResponse.data.data };
}
