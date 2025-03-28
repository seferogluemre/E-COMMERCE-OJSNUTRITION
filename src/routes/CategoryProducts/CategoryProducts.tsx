import { Container, Row } from "react-bootstrap"
import ProductCard from "../Products/components/ProductCard/ProductCard";
import { BASE_URL, PHOTO_URL } from "../../services/api/collections/Auth";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import "../Products/components/ProductCard/ProductCard.scss"
import { getAllProducts, ProductListProp } from "../../types/ProductTypes";

function CategoryProducts() {
    const { category_products } = useLoaderData();
    const navigate = useNavigate();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<ProductListProp[]>(category_products);

    const params = useParams();
    useEffect(() => {
        const MoreProduct = async () => {
            if (loading) {
                const offset = getAllProducts(page, 12);
                try {
                    const response = await axios.get(
                        BASE_URL + `/products?limit=12&offset=${offset}?main_category=${params.main_category}`
                    );
                    if (response.data && Array.isArray(response.data.data.results)) {
                        setProducts((prevProducts: ProductListProp[]) => [
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
            setPage((prevPage: number) => prevPage + 1);
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
                            className="col-xxl-3 col-lg-4 col-md-6 col-sm-6 mt-3 product_list_card_column"
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

export default CategoryProducts;