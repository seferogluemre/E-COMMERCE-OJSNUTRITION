import { Container, Row } from "react-bootstrap";
import { useLoaderData } from "react-router-dom";
import BestSellerCard from "./BestSellerCard";


export const base_url = "https://fe1111.projects.academy.onlyjs.com/api/v1";

export async function loader() {
    const bestSellerResponse = await fetch(base_url + "/products/best-sellers");
    const bestSellerData = await bestSellerResponse.json();
    console.log(bestSellerData.data);
    return { products: bestSellerData.data };
}

const BestSeller = () => {

    const { products } = useLoaderData();

    return <>
        <Container>
            <Row>
                {
                    products.data?.map((product: any) => (
                        <div className="col-lg-3 col-md-6 col-xxl-2">
                            <BestSellerCard
                                image={product.photo_src}
                                slug={product.slug}
                                title={product.name}
                            />
                        </div>
                    ))
                }
            </Row>
        </Container>



    </>
}

export default BestSeller;