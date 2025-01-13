import { Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/UseFetch";

function ProductDetail() {
    const { productSlug } = useParams();
    const { loading, error, data } = useFetch(String(productSlug));



    return <>
        <Container className="my-5">
            <Row >
                {
                    
                    <div >
                        <div>

                        </div>
                        <div>

                        </div>
                    </div>
                }
            </Row >
        </Container>
    </>
}

export default ProductDetail;