import { Container, Row } from "react-bootstrap";
import { useLoaderData, useNavigate } from "react-router-dom";
import ProductCard from "./components/ProductCard/ProductCard";
import "./components/ProductCard/ProductCard.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, PHOTO_URL } from "../../services/api/collections/Auth";
import { getAllProducts } from "./components/types";

export interface ProductListProp {
  average_star: number;
  comment_count: number;
  id: number;
  name: string;
  photo_src: string;
  price_info: PriceInfo;
  short_explanation: string;
  slug: string;
}
export interface PriceInfo {
  profit?: null;
  total_price: number;
  discounted_price?: number | null;
  price_per_servings?: number;
  discount_percentage?: number | null;
}

function Products() {
  const { allProducts } = useLoaderData();
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductListProp[]>(allProducts);

  useEffect(() => {
    const MoreProduct = async () => {
      if (loading) {
        const offset = getAllProducts(page, 12);
        try {
          const response = await axios.get(
            BASE_URL + `/products?limit=12&offset=${offset}`
          );

          if (response.data && Array.isArray(response.data.data.results)) {
            setProducts((prevProducts) => [
              ...prevProducts,
              ...response.data.data.results,
            ]);
          }
        } catch (error) {
          console.error(
            "API isteği sırasında bir hata oluştu:",
            (error as Error).message
          );
        } finally {
          setLoading(false);
        }
      }
    };
    if (page > 1) {
      MoreProduct();
    }
  }, [page, loading]);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100 && !loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Container className="my-5">
        <div className="text-center">
          <h1 className="fs-2">Tüm Ürünler</h1>
        </div>
        <Row>
          {products?.map((product: ProductListProp) => (
            <div
              className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 my-3 product_list_card_column"
              key={product.id}
              onClick={() => navigate("/products/" + product.slug)}
            >
              <ProductCard
                key={product.id}
                name={product.name}
                average_star={product.average_star}
                photo_src={PHOTO_URL + product.photo_src}
                slug={product.slug}
                price_info={product.price_info}
                comment_count={product.comment_count}
                id={product.id}
                short_explanation={product.short_explanation}
              />
            </div>
          ))}
        </Row>
        <div>
          <div className="text-start">
            <p>{products.length} ürün görüntüleniyor</p>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Products;
